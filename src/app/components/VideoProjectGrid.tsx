import { useLocation, useSearchParams } from 'react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { useGalleryColumns } from '../hooks/useGalleryColumns';
import { getVideoPage } from '../data/galleryNavigation';
import type { ProjectCardEntry } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

export function VideoProjectGrid({ entries, headingLevel = 3, variant = 'default' }: { entries: ProjectCardEntry[]; headingLevel?: 2 | 3 | 4; variant?: 'default' | 'video-list' }) {
  const { language } = useLanguage();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const columns = useGalleryColumns();
  const pageWindow = getVideoPage(entries.length, columns, params.get('videoStart'), params.get('videos'));
  const changePage = (page: number) => {
    const next = new URLSearchParams(params);
    next.set('videoStart', String(Math.max(0, Math.min(pageWindow.pageCount - 1, page)) * pageWindow.size));
    next.delete('videos');
    setParams(next, { replace: true, preventScrollReset: true, state: location.state });
  };
  const buttonClass = 'inline-flex min-h-11 min-w-11 items-center justify-center border border-black/20 cursor-pointer hover:border-black disabled:opacity-30 disabled:cursor-default focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4 motion-safe:transition-colors';

  return (
    <div>
      <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 md:gap-x-8" id="video-project-grid" data-video-start={pageWindow.start}>
        {entries.slice(pageWindow.start, pageWindow.end).map((entry) => (
          <ProjectCard key={entry.id} entry={entry} category="creations-video" headingLevel={headingLevel} variant={variant} />
        ))}
        {Array.from({ length: pageWindow.size - (pageWindow.end - pageWindow.start) }, (_, index) => <div key={`empty-${index}`} aria-hidden="true" />)}
      </div>
      <nav className="mt-8 flex flex-wrap items-center gap-3 md:gap-4" aria-label={t('portfolio.videoPagination', language)}>
        <button type="button" className={buttonClass} disabled={pageWindow.page === 0} onClick={() => changePage(pageWindow.page - 1)} aria-label={t('portfolio.previousPage', language)} aria-controls="video-project-grid">
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <label className="inline-flex min-h-11 items-center gap-2 text-sm">
          <span className="sr-only">{t('portfolio.choosePage', language)}</span>
          <select value={pageWindow.page} onChange={(event) => changePage(Number(event.target.value))} className="min-h-11 border border-black/20 bg-transparent px-3 text-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4">
            {Array.from({ length: pageWindow.pageCount }, (_, page) => <option key={page} value={page}>{page + 1} / {pageWindow.pageCount}</option>)}
          </select>
        </label>
        <button type="button" className={buttonClass} disabled={pageWindow.page === pageWindow.pageCount - 1} onClick={() => changePage(pageWindow.page + 1)} aria-label={t('portfolio.nextPage', language)} aria-controls="video-project-grid">
          <ChevronRight size={20} aria-hidden="true" />
        </button>
        <p className="text-sm text-black/60" role="status" aria-live="polite" aria-atomic="true">
          {entries.length ? pageWindow.start + 1 : 0}–{pageWindow.end} / {entries.length}
        </p>
      </nav>
    </div>
  );
}
