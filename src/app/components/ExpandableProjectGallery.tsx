import { useLayoutEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import type { PortfolioCategory, ProjectCardEntry } from '../data/portfolio';
import {
  getCollapseScrollTop, getGalleryCountKey, getGallerySearchParams,
  getGalleryVisibleCount, getNextGalleryVisibleCount, type HomepageGalleryConfig
} from '../data/homepageGallery';
import { EditorialProjectGrid, type GridIntroduction } from './EditorialProjectGrid';

export function ExpandableProjectGallery({ entries, category, groupId, label, numberOffset, introduction, config }: {
  entries: ProjectCardEntry[];
  category: PortfolioCategory;
  groupId: string;
  label: string;
  numberOffset: number;
  introduction?: GridIntroduction;
  config?: HomepageGalleryConfig;
}) {
  const { language } = useLanguage();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const controls = useRef<HTMLDivElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const moreButton = useRef<HTMLButtonElement>(null);
  const lessButton = useRef<HTMLButtonElement>(null);
  const animationFrom = useRef<number>();
  const collapseAnchor = useRef<{ top: number; restoreFocus: boolean }>();
  const focusLastBatch = useRef(false);
  const focusAddedEntry = useRef<number>();
  const total = entries.length;
  const initialCount = config ? Math.min(total, config.initialVisibleCount) : total;
  const visibleCount = config ? getGalleryVisibleCount(total, config, params.get(getGalleryCountKey(groupId))) : total;
  const expanded = visibleCount > initialCount;
  const galleryId = `${category}-${groupId}-gallery`;

  useLayoutEffect(() => {
    if (focusAddedEntry.current !== undefined && visibleCount > focusAddedEntry.current) {
      const entry = gallery.current?.querySelectorAll<HTMLElement>('[data-project-id]')[focusAddedEntry.current];
      focusAddedEntry.current = undefined;
      entry?.querySelector('a')?.focus({ preventScroll: true });
    }
    const anchor = collapseAnchor.current;
    if (anchor && visibleCount === initialCount && controls.current) {
      collapseAnchor.current = undefined;
      const top = getCollapseScrollTop(
        window.scrollY, anchor.top, controls.current.getBoundingClientRect().top,
        Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      );
      if (Math.abs(top - window.scrollY) > 1) window.scrollTo({ top, behavior: 'instant' });
      if (anchor.restoreFocus) moreButton.current?.focus({ preventScroll: true });
    }
    if (focusLastBatch.current && visibleCount === total) {
      focusLastBatch.current = false;
      lessButton.current?.focus({ preventScroll: true });
    }
  }, [visibleCount, initialCount, total]);

  const updateCount = (count: number) => {
    if (!config) return;
    setParams(getGallerySearchParams(params, groupId, count, config), {
      replace: true, preventScrollReset: true, state: location.state
    });
  };
  const showMore = (event: MouseEvent<HTMLButtonElement>) => {
    if (!config) return;
    const next = getNextGalleryVisibleCount(visibleCount, total, config);
    animationFrom.current = visibleCount;
    if (event.detail === 0) focusAddedEntry.current = visibleCount;
    focusLastBatch.current = event.detail !== 0 && next === total && document.activeElement === moreButton.current;
    updateCount(next);
  };
  const showLess = () => {
    if (controls.current) collapseAnchor.current = {
      top: controls.current.getBoundingClientRect().top,
      restoreFocus: controls.current.contains(document.activeElement)
    };
    animationFrom.current = undefined;
    updateCount(initialCount);
  };

  return (
    <div className="editorial-expandable-gallery" data-gallery-id={groupId} data-visible-count={visibleCount}>
      <div ref={gallery} id={galleryId}>
        <EditorialProjectGrid
          entries={entries.slice(0, visibleCount)} category={category} numberOffset={numberOffset}
          introduction={introduction} layoutVariant={config?.layoutVariant}
          animationFrom={animationFrom.current}
        />
      </div>
      {total > initialCount && (
        <div ref={controls} className="editorial-gallery-controls">
          {visibleCount < total && (
            <button ref={moreButton} type="button" className="editorial-gallery-button" onClick={showMore}
              aria-controls={galleryId} aria-expanded={expanded} aria-label={`${t('portfolio.showMore', language)} — ${label}`}>
              <span>{t('portfolio.showMore', language)}</span><span className="editorial-gallery-button-arrow" aria-hidden="true">↓</span>
            </button>
          )}
          <p className="editorial-gallery-status" role="status" aria-live="polite" aria-atomic="true">
            <span className="sr-only">{label}: </span>{visibleCount} / {total}
          </p>
          {expanded && (
            <button ref={lessButton} type="button" className="editorial-gallery-button editorial-gallery-less" onClick={showLess}
              aria-controls={galleryId} aria-expanded={expanded} aria-label={`${t('portfolio.showLess', language)} — ${label}`}>
              <span>{t('portfolio.showLess', language)}</span><span className="editorial-gallery-button-arrow" aria-hidden="true">↑</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
