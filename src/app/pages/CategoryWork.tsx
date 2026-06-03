import { useParams, Link } from 'react-router';
import { useMemo } from 'react';
import { projects, Category, getProjectsByCategory, getPhotoSeries } from '../data/projects';
import { projectImageUrls, dessinSubcategoryImages } from '../data/projectImageData';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowLeft } from 'lucide-react';

export function CategoryWork() {
  const { category } = useParams<{ category: string }>();
  const { language } = useLanguage();
  const categoryKey = category as Category;
  const categoryProjects = getProjectsByCategory(categoryKey);
  const photoSeries = getPhotoSeries();
  const photoTileImage = useMemo(() => {
    const imgs = photoSeries.flatMap((s) => [
      ...(projectImageUrls[s.id] ?? []),
      ...(s.shops?.flatMap((shop) => shop.images) ?? [])
    ]).filter(Boolean);
    if (imgs.length === 0) return undefined;
    return imgs[Math.floor(Math.random() * imgs.length)];
  }, [photoSeries]);
  
  const dessinTileImage = useMemo(() => {
    const dessinImages = Object.values(dessinSubcategoryImages).flat().filter(Boolean);
    if (dessinImages.length === 0) return undefined;
    return dessinImages[Math.floor(Math.random() * dessinImages.length)];
  }, []);
  
  const hasPhotoSubcategory = categoryKey === 'arts-visuels';

  if (!categoryKey || !['projets-graphiques', 'arts-visuels', 'univers-ludiques'].includes(categoryKey)) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-8">{t('notFound.title', language)}</p>
          <Link to="/" className="text-black/60 hover:text-black transition-colors">
            {t('work.backToHome', language)}
          </Link>
        </div>
      </div>
    );
  }

  // Different grid layouts based on category
  const getGridClass = () => {
    if (categoryKey === 'univers-ludiques') {
      return 'grid md:grid-cols-4 gap-4 md:gap-6';
    }
    if (categoryKey === 'arts-visuels') {
      return 'grid md:grid-cols-2 gap-8 md:gap-12';
    }
    return 'grid md:grid-cols-3 gap-6 md:gap-10';
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

      {/* Category Header */}
      <section className="px-8 md:px-12 pb-20">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-5xl md:text-7xl tracking-tight mb-6">
            {t(`categories.${categoryKey}.title`, language)}
          </h1>
          <p className="text-lg md:text-xl text-black/60 tracking-tight max-w-2xl">
            {t(`categories.${categoryKey}.description`, language)}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-8 md:px-12 pb-32">
        <div className="max-w-[1600px] mx-auto">
          <div className={getGridClass()}>
            {/* Photo subcategory for Arts visuels */}
            {hasPhotoSubcategory && (
              <Link
                to="/work/arts-visuels/photo"
                className="group block"
              >
                <div className="relative bg-white overflow-hidden mb-4 aspect-[4/3]">
                  <ImageWithFallback
                    src={photoTileImage || undefined}
                    alt="Photos"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl tracking-tight group-hover:opacity-60 transition-opacity">
                    Photos
                  </h3>
                  <p className="text-xs md:text-sm text-black/50 tracking-tight">
                    {photoSeries.length} {language === 'fr' ? 'séries' : language === 'en' ? 'series' : '系列'}
                  </p>
                </div>
              </Link>
            )}

            {categoryProjects.map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="group block"
              >
                <div
                  className={`relative bg-white overflow-hidden mb-4 ${
                    categoryKey === 'univers-ludiques' ? 'aspect-square' : 'aspect-[4/3]'
                  }`}
                >
                  <ImageWithFallback
                    src={project.id === 'dessin' ? (dessinTileImage || project.coverImage) : project.coverImage}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      categoryKey === 'univers-ludiques'
                        ? 'group-hover:scale-150'
                        : 'group-hover:scale-105'
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <h3 className={`tracking-tight group-hover:opacity-60 transition-opacity ${
                    categoryKey === 'univers-ludiques' ? 'text-base' : 'text-xl md:text-2xl'
                  }`}>
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm text-black/50 tracking-tight">
                    {project.type ?? ''}
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
