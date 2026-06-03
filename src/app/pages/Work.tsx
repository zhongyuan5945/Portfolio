import { useMemo } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { getProjectsByCategory, getPhotoSeries, type Category, type Project } from '../data/projects';
import { projectImageUrls } from '../data/projectImageData';
import { videoReferences } from '../data/videoReferences';
import image_Tier2_02__1 from '@/imports/Tier2_02_-1.png';

function getProjectPreviewImages(project: Project): string[] {
  return [
    ...(projectImageUrls[project.id] ?? []),
    ...(project.shops?.flatMap((shop) => shop.images) ?? [])
  ];
}

export function Work() {
  const { language } = useLanguage();

  const categories = [
    {
      id: 'projets-graphiques',
      path: '/work/projets-graphiques',
      coverImage: image_Tier2_02__1
    },
    {
      id: 'arts-visuels',
      path: '/work/arts-visuels',
      coverImage: image_Tier2_02__1
    },
    {
      id: 'univers-ludiques',
      path: '/work/univers-ludiques',
      coverImage: image_Tier2_02__1
    },
    {
      id: 'creations-video',
      path: '/video-references',
      coverImage: image_Tier2_02__1
    }
  ];

  const categoryPreviewImages = useMemo(() => {
    return categories.reduce<Record<string, string>>((acc, category) => {
      if (category.id === 'creations-video') {
        return acc;
      }

      let previewImages: string[] = [];
      if (category.id === 'arts-visuels') {
        previewImages = getPhotoSeries()
          .flatMap((series) => [
            ...(projectImageUrls[series.id] ?? []),
            ...(series.shops?.flatMap((shop) => shop.images) ?? [])
          ])
          .filter(Boolean);
      } else {
        previewImages = getProjectsByCategory(category.id as Category)
          .flatMap(getProjectPreviewImages)
          .filter(Boolean);
      }

      if (previewImages.length > 0) {
        acc[category.id] = previewImages[Math.floor(Math.random() * previewImages.length)];
      }

      return acc;
    }, {});
  }, []);

  const videoThumbnails = videoReferences.slice(0, 9);

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <section className="pt-40 pb-20 px-8 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-5xl md:text-7xl tracking-tight mb-6">
            {t('work.title', language)}
          </h1>
          <p className="text-lg text-black/50 tracking-tight">
            {t('work.organizedBy', language)}
          </p>
        </div>
      </section>

      <section className="px-8 md:px-12 pb-32">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={category.path}
                className="group block"
              >
                <div className="relative aspect-[4/3] bg-white overflow-hidden mb-6">
                  {category.id === 'creations-video' ? (
                    <div className="absolute inset-0 grid grid-cols-3 gap-1">
                      {videoThumbnails.map((video, index) => (
                        <div key={index} className="overflow-hidden">
                          <ImageWithFallback
                            src={video.thumbnail}
                            alt={`${t(`categories.${category.id}.title`, language)} thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ImageWithFallback
                      src={categoryPreviewImages[category.id] || category.coverImage}
                      alt={t(`categories.${category.id}.title`, language)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl tracking-tight group-hover:opacity-60 transition-opacity">
                    {t(`categories.${category.id}.title`, language)}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
