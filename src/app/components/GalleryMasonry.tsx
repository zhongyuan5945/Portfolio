import type { ReactNode } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export function GalleryMasonry({ columnsCount, gutter, children }: { columnsCount: number; gutter: string; children: ReactNode }) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 640: 2, 1024: Math.min(3, columnsCount), 1280: columnsCount }}>
      <Masonry gutter={gutter}>{children}</Masonry>
    </ResponsiveMasonry>
  );
}
