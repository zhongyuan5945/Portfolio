export type HomepageGalleryLayout = 'editorial' | 'compact-grid' | 'featured-gallery' | 'cinematic-grid';

interface GalleryCounts {
  initialVisibleCount: number;
  loadMoreCount: number;
}

export interface HomepageGalleryConfig extends GalleryCounts {
  layoutVariant: HomepageGalleryLayout;
  responsiveCounts?: { mobile: GalleryCounts; tablet: GalleryCounts };
}

const responsiveCounts = {
  mobile: { initialVisibleCount: 2, loadMoreCount: 2 },
  tablet: { initialVisibleCount: 4, loadMoreCount: 4 }
};

export const homepageGalleryPresets = {
  print: { initialVisibleCount: 8, loadMoreCount: 8, layoutVariant: 'compact-grid', responsiveCounts },
  photography: { initialVisibleCount: 4, loadMoreCount: 4, layoutVariant: 'featured-gallery', responsiveCounts },
  video: { initialVisibleCount: 8, loadMoreCount: 8, layoutVariant: 'cinematic-grid', responsiveCounts }
} satisfies Record<string, HomepageGalleryConfig>;

export function getResponsiveGalleryConfig(config: HomepageGalleryConfig, columns: number): HomepageGalleryConfig {
  const counts = columns === 1 ? config.responsiveCounts?.mobile : columns === 2 ? config.responsiveCounts?.tablet : undefined;
  return counts ? { ...config, ...counts } : config;
}

export const getGalleryCountKey = (groupId: string) => `visible_${groupId}`;

export function getGalleryVisibleCount(total: number, config: HomepageGalleryConfig, requested: string | null): number {
  const initial = Math.min(total, config.initialVisibleCount);
  if (!requested || !/^\d+$/.test(requested)) return initial;
  const count = Number(requested);
  if (!Number.isSafeInteger(count) || count <= initial) return initial;
  if (count >= total) return total;
  // Counts are absolute, so rotating/resizing a screen never removes projects
  // that the visitor already expanded with a smaller batch size.
  return count;
}

export function getNextGalleryVisibleCount(visible: number, total: number, config: HomepageGalleryConfig): number {
  return Math.min(total, visible + config.loadMoreCount);
}

export function getGallerySearchParams(params: URLSearchParams, groupId: string, count: number, config: HomepageGalleryConfig): URLSearchParams {
  const next = new URLSearchParams(params);
  const key = getGalleryCountKey(groupId);
  if (count <= config.initialVisibleCount) next.delete(key);
  else next.set(key, String(count));
  return next;
}

// Keep the surviving controls at their previous viewport position after a
// collapse, accounting for any adjustment already made by browser anchoring.
export function getCollapseScrollTop(scrollY: number, beforeTop: number, afterTop: number, maxScroll: number): number {
  return Math.max(0, Math.min(maxScroll, scrollY + afterTop - beforeTop));
}
