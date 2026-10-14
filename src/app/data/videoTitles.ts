import imageMetadata from './editorialImageMetadata.json';
import type { VideoReference } from './videoReferences';

const metadata = imageMetadata as Record<string, { title?: string }>;

export function isNumberedVideoTitle(title: string): boolean {
  return /^(Video|Short) \d+$/.test(title);
}

// Share the fetched YouTube titles across homepage cards, list cards, alt text
// and detail headings, including the initial render before any effects run.
export function getCachedVideoTitle(video: VideoReference): string {
  if (video.platform !== 'YouTube' || !isNumberedVideoTitle(video.title)) return video.title;
  return metadata[video.thumbnail]?.title?.trim() || video.platform;
}
