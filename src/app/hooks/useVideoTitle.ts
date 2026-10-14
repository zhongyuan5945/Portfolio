import { useEffect, useState } from 'react';
import type { VideoReference } from '../data/videoReferences';
import { getCachedVideoTitle, isNumberedVideoTitle } from '../data/videoTitles';

const titles = new Map<string, string>();
const pending = new Map<string, Promise<string>>();
const queue: Array<() => void> = [];
let running = 0;

function startQueuedRequests() {
  while (running < 3 && queue.length > 0) queue.shift()!();
}

function loadTitle(video: VideoReference): Promise<string> {
  // Explicit titles are authoritative. Only legacy numbered titles need oEmbed.
  if (video.platform !== 'YouTube' || !isNumberedVideoTitle(video.title)) {
    return Promise.resolve(video.title);
  }
  const fallback = getCachedVideoTitle(video);
  if (fallback !== video.platform) return Promise.resolve(fallback);
  if (titles.has(video.url)) return Promise.resolve(titles.get(video.url)!);
  if (pending.has(video.url)) return pending.get(video.url)!;

  const request = new Promise<string>((resolve) => {
    queue.push(() => {
      running += 1;
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 8000);
      fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(video.url)}&format=json`, {
        signal: controller.signal
      })
        .then(async (response) => {
          if (!response.ok) return fallback;
          const data = await response.json();
          return typeof data.title === 'string' && data.title.trim() ? data.title.trim() : fallback;
        })
        .catch(() => fallback)
        .then((title) => { if (title !== fallback) titles.set(video.url, title); resolve(title); })
        .finally(() => {
          window.clearTimeout(timeout);
          pending.delete(video.url);
          running -= 1;
          startQueuedRequests();
        });
    });
  });
  pending.set(video.url, request);
  startQueuedRequests();
  return request;
}

export function useVideoTitle(video: VideoReference | undefined, enabled = true): string | undefined {
  const [result, setResult] = useState<{ url: string; title: string }>();
  useEffect(() => {
    if (!video || !enabled) return;
    let active = true;
    loadTitle(video).then((title) => {
      if (active) setResult({ url: video.url, title });
    });
    return () => { active = false; };
  }, [video, enabled]);
  return video && result?.url === video.url ? result.title : video ? getCachedVideoTitle(video) : undefined;
}
