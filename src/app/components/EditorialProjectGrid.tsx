import type { CSSProperties } from 'react';
import { ProjectCard } from './ProjectCard';
import { getEditorialAspectRatios, getEditorialEntry, getEditorialImageSize, getEditorialPlacement, getFeaturedGalleryPlacement } from '../data/editorialLayout';
import type { PortfolioCategory, ProjectCardEntry } from '../data/portfolio';
import type { HomepageGalleryLayout } from '../data/homepageGallery';

export interface GridIntroduction {
  description: string;
  context?: string;
  count: string;
}

export function EditorialProjectGrid({ entries, category, numberOffset = 0, introduction, layoutVariant = 'editorial', animationFrom }: {
  entries: ProjectCardEntry[];
  category: PortfolioCategory;
  numberOffset?: number;
  introduction?: GridIntroduction;
  layoutVariant?: HomepageGalleryLayout;
  animationFrom?: number;
}) {
  const isEditorial = layoutVariant === 'editorial';
  const isCompact = layoutVariant === 'compact-grid' || layoutVariant === 'cinematic-grid';
  const spreadSize = isCompact ? Math.max(entries.length, 1) : isEditorial ? 8 : 4;
  const spreads = Array.from({ length: Math.max(introduction ? 1 : 0, Math.ceil(entries.length / spreadSize)) }, (_, index) => entries.slice(index * spreadSize, index * spreadSize + spreadSize));
  const renderIntroduction = () => introduction && (
    <aside className="editorial-info">
      <p className="editorial-info-description">{introduction.description}</p>
      {introduction.context && <p className="editorial-info-context">{introduction.context}</p>}
      <p className="editorial-info-count">{introduction.count}</p>
    </aside>
  );
  return (
    <div className={`editorial-gallery editorial-gallery-${layoutVariant}`}>
      {!isEditorial && introduction && <div className="editorial-gallery-introduction">{renderIntroduction()}</div>}
      {spreads.map((spread, spreadIndex) => {
        const hasIntroduction = isEditorial && spreadIndex === 0 && Boolean(introduction);
        return (
          <div key={spreadIndex} className="editorial-spread" data-editorial-spread={hasIntroduction ? 'introduction' : 'continuation'}>
            {hasIntroduction && renderIntroduction()}
            {spread.map((entry, index) => {
              const placement = isCompact ? { column: 1, row: 1, columns: 1, rows: 1 }
                : isEditorial ? getEditorialPlacement(index, hasIntroduction) : getFeaturedGalleryPlacement(index);
              const ratios = getEditorialAspectRatios(entry);
              const size = getEditorialImageSize(entry);
              const featured = !isCompact && placement.columns > 1;
              const entryIndex = spreadIndex * spreadSize + index;
              const style = {
                '--editorial-column': placement.column,
                '--editorial-row': placement.row,
                '--editorial-columns': placement.columns,
                '--editorial-rows': placement.rows,
                '--editorial-aspect': ratios.natural,
                '--editorial-feature-aspect': ratios.featured
              } as CSSProperties;
              return (
                <div key={entry.id} style={style} className={`editorial-cell${featured ? ' editorial-cell-feature' : ''}${animationFrom !== undefined && entryIndex >= animationFrom ? ' editorial-cell-enter' : ''}`} data-project-id={entry.id}>
                  <ProjectCard
                    entry={getEditorialEntry(entry)} category={category} variant="editorial" headingLevel={4}
                    number={numberOffset + entryIndex + 1}
                    imageWidth={size.width} imageHeight={size.height}
                    imageSizes={featured
                      ? layoutVariant === 'featured-gallery'
                        ? '(min-width: 1700px) 760px, (min-width: 1024px) 46vw, (min-width: 640px) 90vw, 100vw'
                        : '(min-width: 1280px) 740px, (min-width: 1024px) 60vw, (min-width: 640px) 90vw, 100vw'
                      : !isEditorial ? '(min-width: 1700px) 380px, (min-width: 1024px) 23vw, (min-width: 640px) 45vw, 100vw'
                      : '(min-width: 1280px) 360px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw'}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
