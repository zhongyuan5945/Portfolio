import imageMetadata from './editorialImageMetadata.json';
import type { ProjectCardEntry } from './portfolio';
import { getCachedVideoTitle } from './videoTitles';

interface ImageSize { width: number; height: number; title?: string }
const dimensions = imageMetadata as Record<string, ImageSize>;

export interface EditorialPlacement {
  column: number;
  row: number;
  columns: number;
  rows: number;
}

// Eight works per spread, in reading/keyboard order. The introductory spread
// reserves the first cell for existing category copy; later spreads move the
// large image to the first cell and the final two-column image to the bottom.
const introduction: EditorialPlacement[] = [
  { column: 2, row: 1, columns: 1, rows: 1 },
  { column: 3, row: 1, columns: 1, rows: 1 },
  { column: 4, row: 1, columns: 1, rows: 1 },
  { column: 1, row: 2, columns: 2, rows: 2 },
  { column: 3, row: 2, columns: 1, rows: 1 },
  { column: 4, row: 2, columns: 1, rows: 1 },
  { column: 3, row: 3, columns: 1, rows: 1 },
  { column: 4, row: 3, columns: 1, rows: 1 }
];
const continuation: EditorialPlacement[] = [
  { column: 1, row: 1, columns: 2, rows: 2 },
  { column: 3, row: 1, columns: 1, rows: 1 },
  { column: 4, row: 1, columns: 1, rows: 1 },
  { column: 3, row: 2, columns: 1, rows: 1 },
  { column: 4, row: 2, columns: 1, rows: 1 },
  { column: 1, row: 3, columns: 1, rows: 1 },
  { column: 2, row: 3, columns: 1, rows: 1 },
  { column: 3, row: 3, columns: 2, rows: 1 }
];

export function getEditorialPlacement(index: number, hasIntroduction: boolean): EditorialPlacement {
  return (hasIntroduction ? introduction : continuation)[index % 8];
}

// Four photographic series per batch: one large image on the left, two
// archive images above a wider image on the right. DOM/data order is unchanged.
const photographicArchive: EditorialPlacement[] = [
  { column: 1, row: 1, columns: 2, rows: 2 },
  { column: 3, row: 1, columns: 1, rows: 1 },
  { column: 4, row: 1, columns: 1, rows: 1 },
  { column: 3, row: 2, columns: 2, rows: 1 }
];

export function getFeaturedGalleryPlacement(index: number): EditorialPlacement {
  return photographicArchive[index % 4];
}

export function getEditorialImageSize(entry: ProjectCardEntry): ImageSize {
  return dimensions[entry.thumbnail] ?? { width: 4, height: 3 };
}

export function getEditorialAspectRatios(entry: ProjectCardEntry) {
  const size = getEditorialImageSize(entry);
  const ratio = size.width / size.height;
  return {
    // Extreme formats retain their full composition within a bounded canvas.
    natural: Math.min(2, Math.max(0.65, ratio)),
    featured: Math.min(1.8, Math.max(1.05, ratio))
  };
}

export function getEditorialEntry(entry: ProjectCardEntry): ProjectCardEntry {
  // Homepage videos go straight to the existing individual detail route.
  // The original video-list links and selected inline player remain intact.
  return entry.kind === 'video'
    ? {
        ...entry,
        title: entry.video ? getCachedVideoTitle(entry.video) : entry.title,
        to: `/video-references/${encodeURIComponent(entry.id)}`
      }
    : entry;
}
