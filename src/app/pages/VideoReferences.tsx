import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { videoReferences, getVideoEmbedUrl, getVideoReferenceById, type VideoReference } from '../data/videoReferences';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import { X } from 'lucide-react';
import { ProjectCarousel } from '../components/ProjectCarousel';
import { VideoPlayer } from '../components/VideoPlayer';
import { getPortfolioGroups } from '../data/portfolio';
import { useVideoTitle } from '../hooks/useVideoTitle';
import { PortfolioReturnLink } from '../components/PortfolioReturnLink';

function SelectedVideo({ video, close }: { video: VideoReference; close: () => void }) {
  const { language } = useLanguage();
  const title = useVideoTitle(video) ?? video.title;
  const embedUrl = getVideoEmbedUrl(video);
  return (
    <section id="video-player" className="px-8 md:px-12 pb-12 scroll-mt-32" aria-labelledby="selected-video-title">
      <div className="max-w-[1600px] mx-auto border border-black/15 bg-white p-4 md:p-8">
        <header className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs text-black/55 mb-2">{video.platform} · {video.publishedAt.slice(0, 10)}</p>
            <h2 id="selected-video-title" className="text-xl md:text-3xl tracking-tight [overflow-wrap:anywhere]">{title}</h2>
          </div>
          <button type="button" onClick={close} aria-label={t('portfolio.closeVideo', language)} className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center border border-black/20 hover:border-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4">
            <X size={20} aria-hidden="true" />
          </button>
        </header>
        {embedUrl
          ? <VideoPlayer video={{ kind: 'embed', src: embedUrl, poster: video.thumbnail }} title={title} active />
          : <p className="text-sm text-black/70">{t('portfolio.videoUnavailable', language)}</p>}
        {video.description?.[language] && <p className="mt-6 max-w-3xl text-base text-black/85 whitespace-pre-line">{video.description[language]}</p>}
      </div>
    </section>
  );
}

export function VideoReferences() {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const selectedVideo = getVideoReferenceById(params.get('video') ?? '');
  const group = getPortfolioGroups('creations-video')[0];
  const closeVideo = () => {
    const next = new URLSearchParams(params);
    if (selectedVideo) next.set('gallery_creations-video', selectedVideo.id);
    next.delete('video');
    navigate(`/video-references${next.size ? `?${next}` : ''}#creations-video`, { replace: true, state: location.state });
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      {/* Back Button */}
      <section className="pt-32 px-8 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-12"><PortfolioReturnLink category="creations-video" /></div>
        </div>
      </section>

      {/* Header */}
      <section className="px-8 md:px-12 pb-16">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-5xl md:text-7xl tracking-tight mb-6">
            {t('videoReferences.title', language)}
          </h1>
          <p className="text-lg md:text-xl text-black/60 tracking-tight max-w-2xl mb-4 whitespace-pre-line">
            {t('videoReferences.description', language)}
          </p>
          <p className="text-sm text-black/40 tracking-tight">
            {videoReferences.length} {t('videoReferences.references', language)}
          </p>
        </div>
      </section>

      {selectedVideo && <SelectedVideo key={selectedVideo.id} video={selectedVideo} close={closeVideo} />}

      {/* Only the selected video creates a player; the gallery stays static. */}
      <section id="creations-video" className="px-8 md:px-12 pb-32 scroll-mt-32">
        <div className="max-w-[1600px] mx-auto">
          <div className="border border-black/15 bg-white/60 p-4 md:p-8">
            <ProjectCarousel group={group} category="creations-video" thumbnailsOnly />
          </div>
        </div>
      </section>
    </div>
  );
}
