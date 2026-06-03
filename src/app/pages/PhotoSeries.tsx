import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { getPhotoSeries, getProjectImages, getProjectImagePlaceholders } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowLeft, X } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

function getThumbnailUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname;

    if (domain.includes('imagekit.io')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}tr=w-300,q-70`;
    }

    if (domain.includes('images.unsplash.com') || domain.includes('images.pexels.com')) {
      const params = parsedUrl.searchParams;
      const width = Number(params.get('w')) || 0;
      if (width > 2000) {
        params.set('w', `${Math.max(300, Math.round(width * 0.2))}`);
      } else {
        params.set('w', '300');
      }
      if (!params.has('auto')) params.set('auto', 'format');
      return parsedUrl.toString();
    }

    if (parsedUrl.searchParams.has('w')) {
      const width = Number(parsedUrl.searchParams.get('w'));
      if (!Number.isNaN(width) && width > 2000) {
        parsedUrl.searchParams.set('w', `${Math.max(300, Math.round(width * 0.2))}`);
        return parsedUrl.toString();
      }
    }

    return url;
  } catch {
    return url;
  }
}

export function PhotoSeries() {
  const { language } = useLanguage();
  const photoSeries = getPhotoSeries();
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(null);

  const selectedSeries = useMemo(
    () => photoSeries.find((series) => series.id === selectedSeriesId) ?? null,
    [photoSeries, selectedSeriesId]
  );

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const selectedImages = useMemo(
    () => (selectedSeries ? getProjectImages(selectedSeries) : []),
    [selectedSeries]
  );

  const selectedPlaceholders = useMemo(
    () => (selectedSeries ? getProjectImagePlaceholders(selectedSeries) : []),
    [selectedSeries]
  );

  const thumbnailUrls = useMemo(
    () => selectedImages.map(getThumbnailUrl),
    [selectedImages]
  );

  const galleryColumnsClass = useMemo(() => {
    const count = selectedImages.length;
    if (count <= 4) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
    if (count <= 10) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10';
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10';
  }, [selectedImages.length]);

  const lightboxSlides = useMemo(
    () => selectedImages.map((url, index) => ({ src: url, alt: `${selectedSeries?.title ?? 'Photo'} - ${index + 1}` })),
    [selectedImages, selectedSeries]
  );

  const photoDescription =
    language === 'fr'
      ? 'Une sélection de séries photographiques explorant la texture, la lumière et les formes du quotidien.'
      : language === 'en'
      ? 'A selection of photographic series exploring texture, light, and everyday form.'
      : '一组探索质感、光线和日常形态的摄影系列。';

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      {/* Back Button */}
      <section className="pt-32 px-8 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <Link
            to="/work/arts-visuels"
            className="inline-flex items-center gap-2 text-black/50 hover:text-black transition-colors mb-12"
          >
            <ArrowLeft size={20} />
            <span className="text-sm tracking-wide">
              {t('work.backToCategory', language)} {language === 'fr' ? 'Arts visuels' : language === 'en' ? 'Visual Arts' : '视觉艺术'}
            </span>
          </Link>
        </div>
      </section>

      {/* Category Header */}
      <section className="px-8 md:px-12 pb-20">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-5xl md:text-7xl tracking-tight mb-6">Photos</h1>
          <p className="text-lg md:text-xl text-black/60 tracking-tight max-w-2xl">
            {photoSeries.length} {language === 'fr' ? 'séries photographiques' : language === 'en' ? 'photographic series' : '摄影系列'}
          </p>
        </div>
      </section>

      {/* Photo Thumbnails */}
      <section className="px-8 md:px-12 pb-32">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {photoSeries.flatMap((series) => {
              const isSelected = series.id === selectedSeriesId;
              return [
                <button
                  key={series.id}
                  type="button"
                  onClick={() => setSelectedSeriesId(isSelected ? null : series.id)}
                  className={`group block w-full text-left rounded-3xl overflow-hidden border transition-shadow duration-300 ${
                    isSelected ? 'shadow-[0_30px_80px_rgba(0,0,0,0.15)] border-black/10' : 'border-black/5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]'
                  }`}
                >
                  <div className="relative aspect-square bg-white overflow-hidden">
                    <ImageWithFallback
                      src={series.coverImage}
                      alt={series.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <p className="text-sm uppercase tracking-[0.2em] text-white/80 mb-2">
                        {series.type ?? 'Photo'}
                      </p>
                      <h2 className="text-xl md:text-2xl tracking-tight leading-tight">
                        {series.title}
                      </h2>
                    </div>
                  </div>
                </button>,
                isSelected ? (
                  <div key={`${series.id}-detail`} className="col-span-full space-y-8 rounded-[2rem] border border-black/10 bg-white p-6 md:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.06)]">
                            <div className="relative overflow-hidden rounded-[1.5rem] h-[320px] bg-black/10">
                      <ImageWithFallback
                        src={series.coverImage}
                        alt={`${series.title} hero image`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setSelectedSeriesId(null)}
                        className="absolute top-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black"
                        aria-label={language === 'fr' ? 'Fermer' : language === 'en' ? 'Close' : '关闭'}
                      >
                        <X size={18} />
                      </button>
                      <div className="absolute inset-0 bg-black/25" />
                      <div className="absolute inset-0 flex items-end">
                        <div className="w-full p-6 text-white">
                          <h3 className="text-3xl tracking-tight mb-4">{series.title}</h3>
                          <div className="grid grid-cols-2 gap-4 text-xs text-white/80">
                            <div>
                              <p className="uppercase tracking-[0.2em] mb-2">{language === 'fr' ? 'Année' : language === 'en' ? 'Year' : '年份'}</p>
                              <p>{series.year}</p>
                            </div>
                            <div>
                              <p className="uppercase tracking-[0.2em] mb-2">{language === 'fr' ? 'Type' : language === 'en' ? 'Type' : '类型'}</p>
                              <p>{series.type ?? 'Photo'}</p>
                            </div>
                            <div className="col-span-full md:col-span-2">
                              <p className="uppercase tracking-[0.2em] mb-2">{language === 'fr' ? 'Auteur' : language === 'en' ? 'Author' : '作者'}</p>
                              <p>{series.author ?? series.client ?? '—'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm md:text-base text-black/70 whitespace-pre-line">
                        {series.description[language] || photoDescription}
                      </p>
                    </div>

                    <div className={`grid gap-4 ${galleryColumnsClass}`}>
                      {selectedImages.map((url, index) => (
                        <button
                          key={url + index}
                          type="button"
                          onClick={() => {
                            setLightboxIndex(index);
                            setLightboxOpen(true);
                          }}
                          className="rounded-3xl overflow-hidden bg-black/5 block"
                        >
                          <div className="aspect-square w-full overflow-hidden">
                            <ImageWithFallback
                              src={thumbnailUrls[index]}
                              placeholderSrc={selectedPlaceholders[index]}
                              alt={`${series.title} - ${index + 1}`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                    {series.videoUrl ? (
                      <div className="space-y-4 rounded-[1.5rem] border border-black/10 bg-white p-4 md:p-6">
                        <p className="text-sm font-medium text-black/70">
                          {language === 'fr'
                            ? 'Vidéo du projet'
                            : language === 'en'
                            ? 'Project video'
                            : '项目视频'}
                        </p>
                        <div className="aspect-video w-full overflow-hidden rounded-3xl bg-black">
                          <iframe
                            src={series.videoUrl}
                            title="Cube Pixel video"
                            className="h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null
              ];
            })}
          </div>
        </div>
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
      />
    </div>
  );
}
