import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { loadSource, projectRoot } from './load-source.mjs';

const data = await loadSource(`
  export * from './src/app/data/projects';
  export * from './src/app/data/videoReferences';
  export * from './src/app/data/portfolio';
  export * from './src/app/data/media';
`);
const resources = new Map();
function add(url, kind, owner) {
  if (!resources.has(url)) resources.set(url, { url, kind, owners: [] });
  resources.get(url).owners.push(owner);
}
for (const project of data.projects) {
  for (const url of project.images) add(url, 'image', project.id);
  for (const video of data.getProjectVideos(project)) {
    if (video.kind === 'file') add(video.src, 'video-file', project.id);
  }
}
for (const category of data.categoryOrder) {
  for (const entry of data.getPortfolioGroups(category).flatMap((group) => group.entries)) {
    add(data.getThumbnailUrl(entry.thumbnail, 640), 'image', `${entry.id}:thumbnail`);
  }
}
for (const video of data.videoReferences) {
  add(video.thumbnail, 'image', video.id);
  if (video.platform === 'YouTube') {
    add(`https://www.youtube.com/oembed?url=${encodeURIComponent(video.url)}&format=json`, 'video-metadata', video.id);
  }
}

const reportDirectory = path.join(projectRoot, 'reports');
const reportPath = path.join(reportDirectory, 'media-audit.json');
const previous = process.argv.includes('--retry-failed')
  ? JSON.parse(await readFile(reportPath, 'utf8'))
  : undefined;
const previousPassed = new Map((previous?.resources ?? []).filter((item) => item.ok).map((item) => [item.url, item]));
const results = [...resources.values()].filter((item) => previousPassed.has(item.url)).map((item) => ({ ...previousPassed.get(item.url), owners: item.owners }));
const queue = [...resources.values()].filter((item) => !previousPassed.has(item.url));
const expectedContentType = (kind, type) => kind === 'image' ? type.startsWith('image/')
  : kind === 'video-file' ? type.startsWith('video/') || type.startsWith('application/octet-stream')
  : true;
let cursor = 0;
async function check(resource) {
  try {
    let method = resource.kind === 'video-metadata' ? 'GET' : 'HEAD';
    let response = await fetch(resource.url, {
      method,
      signal: AbortSignal.timeout(15000)
    });
    let type = response.headers.get('content-type') ?? '';
    // Some CDN GIFs return incorrect HEAD headers. A tiny range request checks
    // the actual GET response without downloading the complete media file.
    if (resource.kind !== 'video-metadata' && (!expectedContentType(resource.kind, type) || response.status === 405)) {
      method = 'GET-range';
      response = await fetch(resource.url, { headers: { Range: 'bytes=0-127' }, signal: AbortSignal.timeout(15000) });
      type = response.headers.get('content-type') ?? '';
      await response.body?.cancel();
    }
    const expectedType = expectedContentType(resource.kind, type);
    const metadata = resource.kind === 'video-metadata' && response.ok ? await response.json() : undefined;
    return {
      ...resource, status: response.status, ok: response.ok && expectedType, method,
      contentType: type, bytes: Number(response.headers.get('content-range')?.split('/').pop() ?? response.headers.get('content-length')) || undefined,
      title: metadata?.title
    };
  } catch (error) {
    return { ...resource, ok: false, error: error.message };
  }
}
await Promise.all(Array.from({ length: 6 }, async () => {
  while (cursor < queue.length) {
    const resource = queue[cursor++];
    results.push(await check(resource));
    if (results.length % 100 === 0) console.log(`Checked ${results.length}/${resources.size} resources`);
  }
}));

results.sort((a, b) => a.url.localeCompare(b.url));
const failed = results.filter((item) => !item.ok);
const report = { checkedAt: new Date().toISOString(), total: results.length, passed: results.length - failed.length, failed: failed.length, failures: failed, resources: results };
await mkdir(reportDirectory, { recursive: true });
await writeFile(reportPath, JSON.stringify(report, null, 2));
console.log(`Media audit: ${report.passed}/${report.total} checks passed; ${report.failed} resources need review. Report: reports/media-audit.json`);
if (failed.length) process.exitCode = 1;
