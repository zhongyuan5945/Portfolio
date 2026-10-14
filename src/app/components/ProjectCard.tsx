import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ArrowUpRight, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import { useVideoTitle } from '../hooks/useVideoTitle';
import type { PortfolioCategory, ProjectCardEntry } from '../data/portfolio';
import { getThumbnailUrl } from '../data/media';

export function ProjectCard({ entry, category, headingLevel = 3, variant = 'default', selected = false, number, imageWidth, imageHeight, imageSizes }: { entry: ProjectCardEntry; category: PortfolioCategory; headingLevel?: 2 | 3 | 4; variant?: 'default' | 'video-list' | 'video-thumbnail' | 'editorial'; selected?: boolean; number?: number; imageWidth?: number; imageHeight?: number; imageSizes?: string }) {
  const { language } = useLanguage();
  const location = useLocation();
  const ref = useRef<HTMLAnchorElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const isVideoThumbnail = variant === 'video-thumbnail';
  const isEditorial = variant === 'editorial';
  const videoTitle = useVideoTitle(entry.video, nearViewport && !isVideoThumbnail && !isEditorial);
  const title = isEditorial ? entry.title : videoTitle ?? entry.title;
  const isVideoList = variant === 'video-list';
  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4';
  const portfolioReturn = location.state?.portfolioReturn
    ?? (['/', '/video-references'].includes(location.pathname)
      ? `${location.pathname}${location.search}#${category}`
      : `/#${category}`);

  useEffect(() => {
    if (!entry.video || !ref.current || isVideoThumbnail || isEditorial) return;
    if (!('IntersectionObserver' in window)) { setNearViewport(true); return; }
    const observer = new IntersectionObserver(([item]) => {
      if (item.isIntersecting) { setNearViewport(true); observer.disconnect(); }
    }, { rootMargin: '200px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [entry.video, isVideoThumbnail, isEditorial]);

  const year = entry.kind === 'shop' && /^\d{6}$/.test(entry.year ?? '')
    ? `${entry.year!.slice(0, 4)} · ${entry.year!.slice(4)}`
    : entry.year;

  if (isEditorial) return (
    <Link ref={ref} to={entry.to} state={{ portfolioReturn }} className="editorial-project-link">
      <div className="editorial-project-caption">
        <span aria-hidden="true" className="editorial-project-number">{String(number ?? 1).padStart(2, '0')}</span>
        <div className="editorial-project-label">
          <Heading className="editorial-project-title">{title}</Heading>
          {(entry.type || year) && <p className="editorial-project-meta">{[entry.type, year].filter(Boolean).join(' · ')}</p>}
        </div>
        <ArrowUpRight size={17} aria-hidden="true" className="editorial-project-arrow" />
      </div>
      <div className="editorial-project-image">
        <ImageWithFallback
          src={getThumbnailUrl(entry.thumbnail, 640)}
          srcSet={[320, 640, 960, 1440].map((width) => `${getThumbnailUrl(entry.thumbnail, width)} ${width}w`).join(', ')}
          sizes={imageSizes ?? '(min-width: 1280px) 360px, (min-width: 640px) 45vw, 100vw'}
          width={imageWidth} height={imageHeight}
          alt={title} loading="lazy" decoding="async"
          className="editorial-project-photo"
        />
      </div>
    </Link>
  );

  return (
    <Link
      ref={ref}
      to={entry.to}
      state={{ portfolioReturn }}
      aria-label={isVideoThumbnail ? `${t('portfolio.viewProject', language)} — ${title}` : undefined}
      aria-current={selected ? 'true' : undefined}
      className={`group block min-w-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-8 ${isVideoList ? 'bg-white' : ''} ${selected ? 'ring-2 ring-black ring-offset-2' : ''}`}
    >
      <div className={`relative overflow-hidden ${isVideoThumbnail ? 'aspect-video bg-black' : `aspect-[4/3] bg-white ${isVideoList ? '' : 'mb-4'}`}`}>
        <ImageWithFallback
          src={getThumbnailUrl(entry.thumbnail, 640)}
          srcSet={[320, 640, 960].map((width) => `${getThumbnailUrl(entry.thumbnail, width)} ${width}w`).join(', ')}
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025] motion-safe:group-focus-visible:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 group-focus-visible:bg-black/5 motion-safe:transition-colors motion-safe:duration-300" />
        {entry.kind === 'video' && !isVideoThumbnail && (
          <span aria-hidden="true" className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center bg-black/70 text-white">
            <Play size={16} />
          </span>
        )}
        {isVideoList && entry.video && (
          <span className={`absolute top-3 left-3 px-3 py-1 text-white text-xs tracking-wide ${entry.video.platform === 'YouTube' ? 'bg-red-600' : entry.video.platform === 'Instagram' ? 'bg-purple-600' : 'bg-black'}`}>
            {entry.video.platform}
          </span>
        )}
        {!isVideoThumbnail && <span aria-hidden="true" className="absolute bottom-3 right-3 bg-[#f2f2f2] px-3 py-2 text-xs text-black opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:transition-opacity motion-safe:duration-300">
          {t('portfolio.viewProject', language)}
        </span>}
      </div>
      {!isVideoThumbnail && <div className={isVideoList ? 'p-4' : undefined}>
        <div className="flex items-start justify-between gap-3">
          <Heading className={`${isVideoList ? 'text-sm' : 'text-base md:text-lg'} leading-relaxed tracking-tight group-hover:underline group-focus-visible:underline underline-offset-4 [overflow-wrap:anywhere]`}>
            {title}
          </Heading>
          <ArrowUpRight size={20} aria-hidden="true" className="shrink-0 mt-1" />
        </div>
        {!isVideoList && (entry.type || year) && (
          <p className="text-xs md:text-sm text-black/60 tracking-tight mt-1">
            {[entry.type, year].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>}
    </Link>
  );
}
