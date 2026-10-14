import { useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import type { PortfolioCategory, PortfolioGroup } from '../data/portfolio';
import { getCarouselStart } from '../data/galleryNavigation';
import { useGalleryColumns } from '../hooks/useGalleryColumns';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

export function ProjectCarousel({ group, category, thumbnailsOnly = false }: { group: PortfolioGroup; category: PortfolioCategory; thumbnailsOnly?: boolean }) {
  const { language } = useLanguage();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const latestParams = useRef(params);
  latestParams.current = params;
  const columns = useGalleryColumns();
  const viewport = useRef<HTMLDivElement>(null);
  const timer = useRef<number>();
  const scrollBehavior = useRef<ScrollBehavior>('auto');
  const key = `gallery_${group.id}`;
  const expanded = !thumbnailsOnly && params.get(`${key}_all`) === '1';
  const legacyValue = params.has('videoStart') ? Number(params.get('videoStart')) : params.has('videos') ? Number(params.get('videos')) - 1 : 0;
  const legacyIndex = Number.isFinite(legacyValue) ? Math.max(0, Math.min(group.entries.length - 1, Math.floor(legacyValue))) : 0;
  const selectedId = params.get(key) ?? (category === 'creations-video' ? params.get('video') ?? group.entries[legacyIndex]?.id : null);
  const start = getCarouselStart(group.entries.map((entry) => entry.id), selectedId, columns);
  const maxStart = Math.max(0, group.entries.length - columns);
  const viewportId = `${category}-${group.id}-gallery`;
  const updateParams = (next: URLSearchParams) => setParams(next, { replace: true, preventScrollReset: true, state: location.state });

  useEffect(() => {
    window.clearTimeout(timer.current);
    if (expanded || !viewport.current) return;
    const items = viewport.current.children;
    const first = items[0] as HTMLElement | undefined;
    const item = items[start] as HTMLElement | undefined;
    if (first && item) viewport.current.scrollTo({ left: item.offsetLeft - first.offsetLeft, behavior: scrollBehavior.current });
    scrollBehavior.current = 'auto';
  }, [start, expanded, columns]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const move = (index: number) => {
    const target = Math.max(0, Math.min(maxStart, index));
    if (!group.entries[target]) return;
    scrollBehavior.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    const next = new URLSearchParams(params);
    next.set(key, group.entries[target].id);
    updateParams(next);
  };
  const onScroll = () => {
    if (expanded) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const element = viewport.current;
      const first = element?.children[0] as HTMLElement | undefined;
      const second = element?.children[1] as HTMLElement | undefined;
      if (!element || !first || !second) return;
      const step = second.offsetLeft - first.offsetLeft;
      if (step <= 0) return;
      const index = Math.max(0, Math.min(maxStart, Math.round(element.scrollLeft / step)));
      const id = group.entries[index]?.id;
      if (id && latestParams.current.get(key) !== id && (index > 0 || latestParams.current.has(key))) {
        const next = new URLSearchParams(latestParams.current);
        next.set(key, id);
        updateParams(next);
      }
    }, 160);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (expanded || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const items = Array.from(viewport.current?.children ?? []);
    const focused = items.findIndex((item) => item.contains(event.target as Node));
    const target = event.key === 'Home' ? 0 : event.key === 'End' ? group.entries.length - 1
      : (focused >= 0 ? focused : start) + (event.key === 'ArrowRight' ? 1 : -1) * (focused >= 0 ? 1 : columns);
    move(target);
    if (focused >= 0) {
      const index = Math.max(0, Math.min(group.entries.length - 1, target));
      items[index]?.querySelector('a')?.focus({ preventScroll: true });
    }
  };
  const buttonClass = 'inline-flex min-h-11 min-w-11 items-center justify-center border border-black/20 cursor-pointer hover:border-black disabled:opacity-30 disabled:cursor-default focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4 motion-safe:transition-colors';

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3 md:gap-4">
        {!expanded && <>
          <button type="button" className={buttonClass} disabled={start === 0} onClick={() => move(start - columns)} aria-label={`${t('portfolio.previousItems', language)} — ${group.title ?? ''}`} aria-controls={viewportId}>
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" className={buttonClass} disabled={start === maxStart} onClick={() => move(start + columns)} aria-label={`${t('portfolio.nextItems', language)} — ${group.title ?? ''}`} aria-controls={viewportId}>
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </>}
        <p className="text-sm text-black/60" role="status" aria-live="polite" aria-atomic="true">
          {expanded ? group.entries.length : group.entries.length ? start + 1 : 0}{!expanded && `–${Math.min(group.entries.length, start + columns)}`} / {group.entries.length}
        </p>
        {!thumbnailsOnly && <button type="button" onClick={() => {
          window.clearTimeout(timer.current);
          const next = new URLSearchParams(params);
          if (expanded) next.delete(`${key}_all`); else next.set(`${key}_all`, '1');
          updateParams(next);
        }} className="ml-auto min-h-11 cursor-pointer text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4" aria-expanded={expanded} aria-controls={viewportId}>
          {t(expanded ? 'portfolio.collapseGallery' : 'portfolio.viewAll', language)}
        </button>}
      </div>
      <div
        ref={viewport} id={viewportId} data-gallery-start={start} role="region" aria-label={group.title ?? t(`categories.${category}.title`, language)} tabIndex={expanded ? undefined : 0}
        onScroll={onScroll} onKeyDown={onKeyDown}
        className={expanded
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8'
          : 'relative grid grid-flow-col auto-cols-[85%] sm:auto-cols-[calc((100%-1.5rem)/2)] md:auto-cols-[calc((100%-2rem)/2)] lg:auto-cols-[calc((100%-6rem)/4)] gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-px-3 p-3 -m-3 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4'}
      >
        {group.entries.map((entry) => (
          <div key={entry.id} className="snap-start min-w-0">
            <ProjectCard entry={entry} category={category} headingLevel={group.title || group.titleKey ? 4 : 3} variant={thumbnailsOnly ? 'video-thumbnail' : 'default'} selected={entry.kind === 'video' && params.get('video') === entry.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
