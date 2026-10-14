import { useState } from 'react';
import { Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import type { ProjectVideo } from '../data/projects';

export function VideoPlayer({ video, title, active: controlledActive, onActivate }: { video: ProjectVideo; title: string; active?: boolean; onActivate?: () => void }) {
  const { language } = useLanguage();
  const [localActive, setLocalActive] = useState(false);
  const active = controlledActive ?? localActive;
  const playerTitle = video.title ?? title;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] bg-black">
      {active ? video.kind === 'file' ? (
        <video controls playsInline preload="metadata" poster={video.poster} src={video.src} aria-label={playerTitle} className="h-full w-full" />
      ) : (
        <iframe
          src={video.src}
          title={playerTitle}
          className="h-full w-full"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => { if (onActivate) onActivate(); else setLocalActive(true); }}
          aria-label={`${t('portfolio.playVideo', language)} — ${playerTitle}`}
          className="group relative h-full w-full cursor-pointer text-white focus-visible:outline-4 focus-visible:outline-white focus-visible:-outline-offset-8"
        >
          {video.poster && <ImageWithFallback src={video.poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain" />}
          <span className="absolute inset-0 bg-black/35 group-hover:bg-black/45 motion-safe:transition-colors" />
          <span className="relative flex h-full flex-col items-center justify-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/80 bg-black/50"><Play size={26} aria-hidden="true" /></span>
            <span className="bg-black/60 px-4 py-2 text-sm">{t('portfolio.playVideo', language)}</span>
          </span>
        </button>
      )}
    </div>
  );
}
