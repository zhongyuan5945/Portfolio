import { Link, useParams } from 'react-router';
import { getSortedVideoReferences, getVideoEmbedUrl, getVideoReferenceById } from '../data/videoReferences';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import { useVideoTitle } from '../hooks/useVideoTitle';
import { VideoPlayer } from '../components/VideoPlayer';
import { PortfolioReturnLink } from '../components/PortfolioReturnLink';
import { ProjectCard } from '../components/ProjectCard';
import { getVideoEntry } from '../data/portfolio';
import { NotFound } from './NotFound';

export function VideoProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const video = getVideoReferenceById(id ?? '');
  if (!video) return <NotFound />;
  return <VideoDetailContent key={video.id} video={video} />;
}

function VideoDetailContent({ video }: { video: NonNullable<ReturnType<typeof getVideoReferenceById>> }) {
  const { language } = useLanguage();
  const title = useVideoTitle(video) ?? video.title;
  const embedUrl = getVideoEmbedUrl(video);
  const sorted = getSortedVideoReferences();
  const index = sorted.findIndex((item) => item.id === video.id);
  const adjacent = [sorted[index - 1], sorted[index + 1]].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#f2f2f2] px-8 md:px-12 pt-32 pb-32">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-12"><PortfolioReturnLink category="creations-video" /></div>
        <header className="mb-10">
          <p className="text-sm text-black/60 mb-4">{t('categories.creations-video.title', language)} · {video.platform} · {video.publishedAt.slice(0, 10)}</p>
          <h1 className="text-3xl md:text-5xl tracking-tight leading-relaxed [overflow-wrap:anywhere]">{title}</h1>
        </header>
        {embedUrl && (
          <VideoPlayer video={{ kind: 'embed', src: embedUrl, poster: video.thumbnail }} title={title} />
        )}
        {video.description?.[language] && <p className="mt-8 max-w-3xl whitespace-pre-line text-base md:text-lg text-black/85">{video.description[language]}</p>}
        <div className="border-t border-black/10 mt-16 pt-8">
          <PortfolioReturnLink category="creations-video" />
          <div className="grid sm:grid-cols-2 gap-8 mt-8 max-w-3xl">
            {adjacent.map((item) => <ProjectCard key={item.id} entry={getVideoEntry(item)} category="creations-video" headingLevel={2} />)}
          </div>
          <Link to="/video-references" className="inline-flex min-h-11 items-center mt-8 text-sm text-black/60 hover:text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4">
            {t('portfolio.backToVideos', language)}
          </Link>
        </div>
      </div>
    </div>
  );
}
