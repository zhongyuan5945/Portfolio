import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { videoReferences } from '../data/videoReferences';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export function VideoReferences() {
  const { language } = useLanguage();
  const [youtubeTitles, setYoutubeTitles] = useState<Record<string, string>>({});

  const sortedVideoReferences = useMemo(
    () =>
      [...videoReferences].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      ),
    [videoReferences]
  );

  useEffect(() => {
    const youtubeVideos = videoReferences.filter((video) => video.platform === 'YouTube');
    if (youtubeVideos.length === 0) return;

    let active = true;

    const fetchTitles = async () => {
      const results = await Promise.all(
        youtubeVideos.map(async (video) => {
          try {
            const response = await fetch(
              `https://www.youtube.com/oembed?url=${encodeURIComponent(video.url)}&format=json`
            );
            if (!response.ok) return { id: video.id, title: video.title };
            const data = await response.json();
            return { id: video.id, title: data.title ?? video.title };
          } catch {
            return { id: video.id, title: video.title };
          }
        })
      );

      if (active) {
        setYoutubeTitles(results.reduce((acc, result) => ({ ...acc, [result.id]: result.title }), {}));
      }
    };

    fetchTitles();

    return () => {
      active = false;
    };
}, [videoReferences]);

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'TikTok':
        return 'bg-black text-white';
      case 'YouTube':
        return 'bg-red-600 text-white';
      case 'Instagram':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-gray-800 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      {/* Back Button */}
      <section className="pt-32 px-8 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-black/50 hover:text-black transition-colors mb-12"
          >
            <ArrowLeft size={20} />
            <span className="text-sm tracking-wide">{t('work.backToHome', language)}</span>
          </Link>
        </div>
      </section>

      {/* Header */}
      <section className="px-8 md:px-12 pb-16">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-5xl md:text-7xl tracking-tight mb-6">
            {t('videoReferences.title', language)}
          </h1>
          <p className="text-lg md:text-xl text-black/60 tracking-tight max-w-2xl mb-4">
            {t('videoReferences.description', language)}
          </p>
          <p className="text-sm text-black/40 tracking-tight">
            {videoReferences.length} {t('videoReferences.references', language)}
          </p>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="px-8 md:px-12 pb-32">
        <div className="max-w-[1600px] mx-auto">
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1024: 3 }}>
          <Masonry gutter="16px">
            {sortedVideoReferences.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white overflow-hidden"
              >
                <div className="relative">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink size={32} className="text-white" />
                    </div>
                  </div>

                  {/* Platform Badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 ${getPlatformColor(video.platform)} text-xs tracking-wide`}>
                    {video.platform}
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-sm tracking-tight group-hover:opacity-60 transition-opacity">
                    {video.platform === 'YouTube' ? youtubeTitles[video.id] ?? video.title : video.title}
                  </p>
                </div>
              </a>
            ))}
          </Masonry>
          </ResponsiveMasonry>
        </div>
      </section>
    </div>
  );
}
