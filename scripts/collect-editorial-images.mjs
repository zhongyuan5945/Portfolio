import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { loadSource, projectRoot } from './load-source.mjs';

const data = await loadSource(`
  export * from './src/app/data/portfolio';
  export * from './src/app/data/media';
`);
const entries = data.categoryOrder.flatMap((category) => data.getPortfolioGroups(category).flatMap((group) => group.entries));
const metadataPath = path.join(projectRoot, 'src/app/data/editorialImageMetadata.json');
const titlesOnly = process.argv.includes('--titles-only');
const sources = titlesOnly ? [] : [...new Set(entries.map((entry) => entry.thumbnail))];

function imageSize(buffer) {
  if (buffer.subarray(0, 8).toString('hex') === '89504e470d0a1a0a') return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) { offset += 1; continue; }
      const marker = buffer[offset + 1];
      if (marker === 0xff) { offset += 1; continue; }
      if (marker === 0xd9 || marker === 0xda) break;
      const length = buffer.readUInt16BE(offset + 2);
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
      if (length < 2) break;
      offset += length + 2;
    }
  }
  return undefined;
}

const previousMetadata = JSON.parse(await readFile(metadataPath, 'utf8').catch((error) => {
  if (error.code === 'ENOENT') return '{}';
  throw error;
}));
const metadata = titlesOnly ? previousMetadata : {};
const failures = [];
let cursor = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (cursor < sources.length) {
    const source = sources[cursor++];
    try {
      const response = await fetch(data.getThumbnailUrl(source, 160), { signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const size = imageSize(Buffer.from(await response.arrayBuffer()));
      if (!size?.width || !size?.height) throw new Error('Unreadable image dimensions');
      metadata[source] = { ...previousMetadata[source], ...size };
    } catch (error) { failures.push({ source, error: error.message }); }
  }
}));
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  throw new Error(`Could not measure ${failures.length} thumbnails; existing metadata was not overwritten.`);
}
const videos = entries.filter((entry) => entry.video?.platform === 'YouTube');
let videoCursor = 0;
let titleCount = 0;
const titleFailures = [];
await Promise.all(Array.from({ length: 3 }, async () => {
  while (videoCursor < videos.length) {
    const entry = videos[videoCursor++];
    try {
      const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(entry.video.url)}&format=json`, { signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (metadata[entry.thumbnail] && typeof result.title === 'string' && result.title.trim()) {
        metadata[entry.thumbnail].title = result.title.trim();
        titleCount += 1;
      } else throw new Error('Missing image metadata or YouTube title');
    } catch (error) { titleFailures.push({ id: entry.id, error: error.message }); }
  }
}));
const sorted = Object.fromEntries(Object.entries(metadata).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(metadataPath, JSON.stringify(sorted, null, 2) + '\n');
if (titleFailures.length) console.warn(`Preserved existing title caches for ${titleFailures.length} unsuccessful requests: ${JSON.stringify(titleFailures)}`);
console.log(`Measured ${sources.length} thumbnail compositions; cached ${titleCount} existing YouTube titles. No original project data, artwork files or source URLs changed.`);
