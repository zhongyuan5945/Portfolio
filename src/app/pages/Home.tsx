import { useMemo } from 'react';
import image_Tier2_02__1 from '@/imports/Tier2_02_-1.png'
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { getProjectsByCategory, getPhotoSeries, type Category, type Project } from '../data/projects';
import { projectImageUrls, dessinSubcategoryImages } from '../data/projectImageData';
import { impressionShops } from '../data/impressionShops';
import { videoReferences } from '../data/videoReferences';

function getProjectPreviewImages(project: Project): string[] {
  if (project.id === 'bonprint-cxdesign-identity') {
    return [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Logo/qcg_logo_1.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Logo/qcg%20cup1.png'
    ];
  }

  return [
    ...(projectImageUrls[project.id] ?? []),
    ...(project.shops?.flatMap((shop) => shop.images) ?? [])
  ];
}

export function Home() {
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
      coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Dry/1test.gif'
    },
    {
      id: 'creations-video',
      path: '/video-references',
      coverImage: image_Tier2_02__1
    }
  ];

  const UNIVERS_LUDIQUES_COVER = 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Dry/1test.gif';

  const categoryPreviewImages = useMemo(() => {
    return categories.reduce<Record<string, string>>((acc, category) => {
      if (category.id === 'creations-video') {
        return acc;
      }

      if (category.id === 'univers-ludiques') {
        acc[category.id] = UNIVERS_LUDIQUES_COVER;
        return acc;
      }

      let previewImages: string[] = [];
      if (category.id === 'projets-graphiques') {
        previewImages = impressionShops.flatMap((shop) => shop.images).filter(Boolean);
      } else if (category.id === 'arts-visuels') {
        const projectsPreview = getProjectsByCategory(category.id as Category).flatMap(getProjectPreviewImages);
        const photoPreview = getPhotoSeries()
          .filter((series) => series.id !== 'photo-cone-traffic')
          .flatMap(getProjectPreviewImages);
        const dessinPreview = Object.values(dessinSubcategoryImages).flat().filter(Boolean);
        previewImages = [...projectsPreview, ...photoPreview, ...dessinPreview].filter(Boolean);
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

  const heroImage = useMemo(() => {
    const debondImages = projectImageUrls['debond'] ?? [];
    return debondImages.length > 0 ? debondImages[0] : image_Tier2_02__1;
  }, []);

  const videoThumbnails = videoReferences.slice(0, 9);

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      {/* Full-screen Hero Section with Side Text */}
      <section className="relative min-h-screen pt-24 overflow-hidden">
        {/* Image Collage - Full Screen */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Main large centered image */}
          <div className="relative w-full h-full">
            <ImageWithFallback
              src={heroImage}
              alt="Editorial design work"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Layered compositions - scattered around */}
          


        </div>

        {/* Text Content - Positioned to the Left Side */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="w-full max-w-[1800px] mx-auto px-8 md:px-12">
            <div className="max-w-md md:max-w-lg">
              <div className="border-2 border-white/90 bg-white/10 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.35)] px-8 md:px-12 py-12 md:py-16">
                <h1 className="tracking-tight mb-6 text-white font-[Silkscreen] text-[56px] font-normal">
                  {t('home.title', language)}
                </h1>

                <p className="text-base md:text-lg text-white/90 tracking-tight mb-4">
                  {t('home.subtitle', language)}
                </p>

                <p className="text-sm md:text-base text-white/80 tracking-tight italic font-[Coda]">
                  {t('home.description', language)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Blocks */}
      <section className="px-8 md:px-12 py-32">
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
                  <h2 className="text-3xl tracking-tight group-hover:opacity-60 transition-opacity font-[Silkscreen]">
                    {t(`categories.${category.id}.title`, language)}
                  </h2>
                  <p className="text-sm text-black/50 tracking-tight">
                    {t(`categories.${category.id}.description`, language)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
