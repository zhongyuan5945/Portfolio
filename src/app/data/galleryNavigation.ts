export const VIDEO_ROWS = 2;

// Keep an absolute item anchor in the URL: changing the viewport size should
// keep the same video within the visible page instead of switching its index.
export function getVideoPage(total: number, columns: number, startValue: string | null, legacyCount?: string | null) {
  const size = Math.max(1, columns) * VIDEO_ROWS;
  const legacy = Number(legacyCount);
  const requested = startValue === null && Number.isFinite(legacy) && legacy > 0
    ? legacy - 1
    : Number(startValue);
  const anchor = Number.isFinite(requested) ? Math.max(0, Math.floor(requested)) : 0;
  const pageCount = Math.max(1, Math.ceil(total / size));
  const page = Math.min(pageCount - 1, Math.floor(anchor / size));
  const start = page * size;
  return { size, page, pageCount, start, end: Math.min(total, start + size) };
}

export function getCarouselStart(ids: string[], selectedId: string | null, columns: number): number {
  const index = selectedId ? ids.indexOf(selectedId) : 0;
  return Math.max(0, Math.min(index, ids.length - columns));
}
