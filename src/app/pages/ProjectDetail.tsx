import { useParams, Link } from 'react-router';
import { getProjectById, getProjectImagePlaceholders, getProjectImages, getProjectsByCategory, getPhotoSeries } from '../data/projects';
import { dessinSubcategoryImages } from '../data/projectImageData';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import Masonry from 'react-responsive-masonry';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const project = getProjectById(id || '');
  // Debug: log loaded project to verify fields come from projects.ts
  // Remove this after debugging
  // eslint-disable-next-line no-console
  console.log('[debug] ProjectDetail loaded project:', project);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!project) {
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

  const images = getProjectImages(project);
  const placeholderImages = getProjectImagePlaceholders(project);
  const imageCount = project.imageCount;
  const categoryName = t(`categories.${project.category}.title`, language);
  const heroPlaceholder = placeholderImages[0];

  // Map project fields to local variables with safe defaults
  const projectTitle = project.title ?? '';
  const projectAuthor = project.author ?? project.client ?? '';
  const projectYear = project.year ?? '';
  const projectType = project.type ?? '';
  const projectSize = project.size ?? '';
  const projectDescription = project.description ?? { fr: '', en: '', zh: '' };

  // Determine layout type based on image count
  const isEditorial = imageCount <= 8; // Small projects
  const isMasonry = imageCount > 8 && imageCount <= 25; // Medium projects
  const isDense = imageCount > 25 && imageCount <= 50; // Large projects
  const isMuseum = imageCount > 50; // Very large projects
  const isDessin = project.id === 'dessin';

  const hasShops = !!project.shops && project.shops.length > 0;
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const selectedShop = hasShops
    ? project.shops!.find((s) => s.id === selectedShopId) ?? null
    : null;
  const panelRef = useRef<HTMLDivElement | null>(null);

  // When a shop is opened, scroll its detail panel into view so the user
  // doesn't have to hunt for the expansion.
  useEffect(() => {
    if (selectedShopId && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedShopId]);

  // Pick one random thumbnail per shop. Re-randomizes when the project changes.
  const shopThumbnails = useMemo(() => {
    if (!project.shops) return [];
    return project.shops.map((shop) =>
      shop.images.length > 0
        ? shop.images[Math.floor(Math.random() * shop.images.length)]
        : null
    );
  }, [project.shops]);

  const dessinSubcategoryNames = [
    'Bonne Année',
    'Paysages',
    'Personnages',
    'Flou artistique',
    'Peinture et calligraphie chinoises'
  ];

  const dessinSubcategories = useMemo(() => {
    if (!isDessin) return [];
    return dessinSubcategoryNames.map((name) => ({
      name,
      images: dessinSubcategoryImages[name] || []
    }));
  }, [isDessin]);

  // For Dessin project, randomly select cover and hero images from subcategories
  const dessinAllImages = useMemo(() => {
    if (!isDessin) return [];
    return dessinSubcategoryNames.flatMap((name) => dessinSubcategoryImages[name] || []);
  }, [isDessin]);

  const randomDessinImage = useMemo(() => {
    if (!isDessin || dessinAllImages.length === 0) return null;
    return dessinAllImages[Math.floor(Math.random() * dessinAllImages.length)];
  }, [isDessin, dessinAllImages]);

  const randomDessinCoverImage = useMemo(() => {
    if (!isDessin || dessinAllImages.length === 0) return null;
    return dessinAllImages[Math.floor(Math.random() * dessinAllImages.length)];
  }, [isDessin, dessinAllImages]);

  const galleryGutter = project.id === 'fragment' ? '1rem' : '0.75rem';
  const gallerySectionSpacing = project.id === 'fragment' ? 'space-y-8' : 'space-y-20';

  // Use random images for Dessin, or default to project images
  const heroImage = randomDessinImage ?? (images[0] ?? project.coverImage);
  const projectCoverImage = randomDessinCoverImage ?? (project.coverImage ?? '');

  // Lightbox slides: when a shop is selected, scope to that shop only;
  // otherwise fall back to the standard project images.
  const slides = isDessin
    ? dessinSubcategories.flatMap((group, groupIndex) =>
        group.images.map((url, imageIndex) => ({
          src: url,
          alt: `${projectTitle} - ${group.name} ${imageIndex + 1}`
        }))
      )
    : selectedShop
    ? selectedShop.images.map((url, i) => ({
        src: url,
        alt: `${selectedShop.name} - ${i + 1}`
      }))
    : images.map((url, index) => ({
        src: url,
        alt: `${projectTitle} - ${index + 1}`
      }));

  // Determine back path
  const isPhotoSeries = project.subcategory === 'photo';
  const backPath = isPhotoSeries ? '/work/arts-visuels/photo' : `/work/${project.category}`;
  const backLabel = isPhotoSeries ? 'Photo' : categoryName;

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      {/* Back Button */}
      <section className="pt-32 px-8 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <Link
            to={backPath}
            className="inline-flex items-center gap-2 text-black/50 hover:text-black transition-colors mb-12"
          >
            <ArrowLeft size={20} />
            <span className="text-sm tracking-wide">
              {t('work.backToCategory', language)} {backLabel}
            </span>
          </Link>
        </div>
      </section>

      {/* Project Hero */}
      <section className="px-8 md:px-12 pb-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] h-[460px] sm:h-[520px] md:h-[620px] bg-black/10">
            <ImageWithFallback
              src={heroImage}
              placeholderSrc={heroPlaceholder}
              alt={`${projectTitle} hero image`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-end">
              <div className="w-full p-8 md:p-12 lg:p-16">
                <div className="max-w-3xl text-white">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight mb-8">
                    {projectTitle}
                  </h1>

                  <div className="grid md:grid-cols-4 gap-8 mb-12 text-sm text-white/75">
                    <div>
                      <p className="uppercase tracking-[0.25em] mb-2 text-xs text-white/60">
                        {language === 'fr' ? 'Auteur' : language === 'en' ? 'Author' : '作者'}
                      </p>
                      <p className="text-base tracking-tight">
                        {projectAuthor}
                      </p>
                    </div>
                    <div>
                      <p className="uppercase tracking-[0.25em] mb-2 text-xs text-white/60">
                        {language === 'fr' ? 'Année' : language === 'en' ? 'Year' : '年份'}
                      </p>
                      <p className="text-base tracking-tight">{projectYear}</p>
                    </div>
                    <div>
                      <p className="uppercase tracking-[0.25em] mb-2 text-xs text-white/60">
                        {language === 'fr' ? 'Type' : language === 'en' ? 'Type' : '类型'}
                      </p>
                      <p className="text-base tracking-tight">{projectType}</p>
                    </div>
                    <div>
                      <p className="uppercase tracking-[0.25em] mb-2 text-xs text-white/60">
                        {language === 'fr' ? 'Taille' : language === 'en' ? 'Size' : '尺寸'}
                      </p>
                      <p className="text-base tracking-tight">{projectSize}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Description (moved below hero) */}
      <section className="px-8 md:px-12 pb-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="max-w-3xl border-l-2 border-black/20 pl-6 md:pl-8">
            <p className="text-base sm:text-lg md:text-xl leading-8 md:leading-9 tracking-wide font-light whitespace-pre-line text-black/85">
              {projectDescription[language]}
            </p>
          </div>
        </div>
      </section>

      {/* Ephemere project videos */}
      {project.id === 'ephemere' && (
        <section className="px-8 md:px-12 pb-20">
          <div className="max-w-[1600px] mx-auto">
            <video
              controls
              playsInline
              preload="metadata"
              poster="https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Ephemere/50457_ephemeris_l_un_des8prototypesderealitevirtuelleetaugmenteepresen_original.jpg"
              src="https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Ephemere/Ephemeris_Lighter.m4v"
              className="w-full h-auto rounded-[1.5rem] bg-black"
            />
          </div>
        </section>
      )}

      {/* Shops grid — square thumbnail per shop; clicked shop inlines its detail panel below its row */}
      {hasShops && (
        <section className="px-8 md:px-12 pb-32">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {project.shops!.map((shop, shopIndex) => {
                const thumb = shopThumbnails[shopIndex];
                const isSelected = selectedShopId === shop.id;
                return (
                  <Fragment key={shop.id}>
                    <button
                      onClick={() => setSelectedShopId(isSelected ? null : shop.id)}
                      className={`relative aspect-square w-full overflow-hidden rounded-md bg-black/5 group focus:outline-none focus:ring-2 focus:ring-black/40 ${
                        isSelected ? 'ring-2 ring-black' : ''
                      }`}
                      aria-label={shop.name}
                      aria-expanded={isSelected}
                    >
                      {thumb ? (
                        <ImageWithFallback
                          src={thumb}
                          alt={shop.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-black/40 px-2 text-center">
                          {shop.name}
                        </div>
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                      <div className={`absolute inset-x-0 bottom-0 p-3 transition-opacity duration-300 text-left ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        <p className="text-white text-sm tracking-wide leading-tight">
                          {shop.name}
                        </p>
                        {shop.address && (
                          <p className="text-white/70 text-xs mt-1 leading-tight line-clamp-1">
                            {shop.address}
                          </p>
                        )}
                      </div>
                    </button>

                    {isSelected && (
                      <div
                        ref={panelRef}
                        className="col-span-full bg-black/[0.03] rounded-lg p-6 md:p-10 mt-2 mb-4"
                      >
                        <article className="space-y-8">
                          <header className="max-w-3xl flex items-start justify-between gap-6">
                            <div>
                              <h2 className="text-2xl md:text-3xl tracking-tight mb-3">
                                {shop.name}
                              </h2>
                              {(shop.address || shop.year) && (
                                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-black/50 mb-4">
                                  {shop.address && <span>{shop.address}</span>}
                                  {shop.year && <span>{shop.year}</span>}
                                </div>
                              )}
                              {shop.description?.[language] && (
                                <p className="text-base md:text-lg leading-relaxed text-black/75 whitespace-pre-line">
                                  {shop.description[language]}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => setSelectedShopId(null)}
                              className="shrink-0 text-sm text-black/50 hover:text-black transition-colors"
                              aria-label={language === 'fr' ? 'Fermer' : language === 'en' ? 'Close' : '关闭'}
                            >
                              {language === 'fr' ? 'Fermer ✕' : language === 'en' ? 'Close ✕' : '关闭 ✕'}
                            </button>
                          </header>

                          {shop.images.length > 0 ? (
                            <Masonry columnsCount={3} gutter={galleryGutter}>
                              {shop.images.map((url, imgIndex) => (
                                <button
                                  key={imgIndex}
                                  onClick={() => {
                                    setLightboxIndex(imgIndex);
                                    setLightboxOpen(true);
                                  }}
                                  className="block w-full cursor-pointer group overflow-hidden"
                                >
                                  <ImageWithFallback
                                    src={url}
                                    alt={`${shop.name} - ${imgIndex + 1}`}
                                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                  />
                                </button>
                              ))}
                            </Masonry>
                          ) : (
                            <div className="aspect-[4/3] bg-black/5 flex items-center justify-center text-sm text-black/30 rounded-lg">
                              {language === 'fr' ? 'Images à venir' : language === 'en' ? 'Images coming soon' : '图片即将上线'}
                            </div>
                          )}
                        </article>
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Dessin Subcategory Gallery */}
      {isDessin && (
        <section className="px-8 md:px-12 pb-32">
          <div className="max-w-[1600px] mx-auto space-y-20">
            {dessinSubcategories.map((group, groupIndex) => {
              const offset = dessinSubcategories
                .slice(0, groupIndex)
                .reduce((sum, current) => sum + current.images.length, 0);

              return (
                <div key={group.name} className="space-y-8">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-3xl tracking-tight">{group.name}</h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {group.images.map((url, index) => (
                      <button
                        key={`${group.name}-${index}`}
                        onClick={() => {
                          setLightboxIndex(offset + index);
                          setLightboxOpen(true);
                        }}
                        className="block w-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1"
                      >
                        <ImageWithFallback
                          src={url}
                          alt={`${group.name} - ${index + 1}`}
                          className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {!hasShops && !isDessin && (
      <section className="px-8 md:px-12 pb-32">
        <div className="max-w-[1600px] mx-auto">
          {/* Editorial Layout (1-8 images) */}
          {isEditorial && (
            <div className="space-y-20">
              {images.map((url, index) => (
                <div key={index}>
                  <button
                    onClick={() => {
                      setLightboxIndex(index);
                      setLightboxOpen(true);
                    }}
                    className="block w-full cursor-pointer group"
                  >
                      <ImageWithFallback
                        src={url}
                        placeholderSrc={placeholderImages[index]}
                        alt={`${projectTitle} - ${index + 1}`}
                        className="w-full h-auto transition-opacity duration-300 group-hover:opacity-80"
                      />
                  </button>
                  {project.id === 'ephemere' && index === 2 && (
                    <p className="mt-8 text-xs tracking-wide text-black/50 text-center">
                      Photos © Fondation Louis Vuitton, Martin Argyroglo
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Masonry Layout (9-25 images) */}
          {isMasonry && (
            <Masonry columnsCount={3} gutter={galleryGutter}>
              {images.map((url, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                  className="block w-full cursor-pointer group overflow-hidden"
                >
                    <ImageWithFallback
                      src={url}
                      placeholderSrc={placeholderImages[index]}
                      alt={`${projectTitle} - ${index + 1}`}
                      className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                    />
                </button>
              ))}
            </Masonry>
          )}

          {/* Dense Archive (26-50 images) */}
          {isDense && (
            <Masonry columnsCount={4} gutter={galleryGutter}>
              {images.map((url, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                  className="block w-full cursor-pointer group overflow-hidden"
                >
                    <ImageWithFallback
                      src={url}
                      placeholderSrc={placeholderImages[index]}
                      alt={`${projectTitle} - ${index + 1}`}
                      className="w-full h-auto transition-opacity duration-300 group-hover:opacity-80"
                      loading="lazy"
                    />
                </button>
              ))}
            </Masonry>
          )}

          {/* Museum Mode (50+ images) */}
          {isMuseum && (
            <div className={gallerySectionSpacing}>
              {Array.from({ length: Math.ceil(imageCount / 20) }).map((_, sectionIndex) => {
                const sectionImages = images.slice(sectionIndex * 20, (sectionIndex + 1) * 20);
                return (
                  <div key={sectionIndex}>
                    <Masonry columnsCount={5} gutter={galleryGutter}>
                      {sectionImages.map((url, index) => {
                        const globalIndex = sectionIndex * 20 + index;
                        return (
                          <button
                            key={globalIndex}
                            onClick={() => {
                              setLightboxIndex(globalIndex);
                              setLightboxOpen(true);
                            }}
                            className="block w-full cursor-pointer group overflow-hidden"
                          >
                            <ImageWithFallback
                              src={url}
                              placeholderSrc={placeholderImages[globalIndex]}
                              alt={`${projectTitle} - ${globalIndex + 1}`}
                              className="w-full h-auto transition-opacity duration-300 group-hover:opacity-80"
                              loading="lazy"
                            />
                          </button>
                        );
                      })}
                    </Masonry>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      )}

      {project.videoUrl && project.id !== 'ephemere' && (
        <section className="px-8 md:px-12 pb-32">
          <div className="max-w-[1600px] mx-auto">
            <div className="relative w-full overflow-hidden rounded-[1.5rem] bg-black" style={{ paddingTop: '56.25%' }}>
              <iframe
                src={project.videoUrl}
                title={`${projectTitle} video`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Ephemere YouTube video (after gallery) */}
      {project.id === 'ephemere' && (
        <section className="px-8 md:px-12 pb-32">
          <div className="max-w-[1600px] mx-auto">
            <div className="relative w-full overflow-hidden rounded-[1.5rem] bg-black" style={{ paddingTop: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/jVO16C3Nyf4"
                title="Éphémère — Fondation Louis Vuitton"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="px-8 md:px-12 pb-32">
        <div className="max-w-[1600px] mx-auto">
          {/* Back to Category */}
          <div className="border-t border-black/10 pt-12 pb-8">
            <Link
              to={backPath}
              className="inline-flex items-center gap-2 text-black/50 hover:text-black transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm tracking-wide">
                {t('work.backToCategory', language)} {backLabel}
              </span>
            </Link>
          </div>

          {/* Previous/Next Projects */}
          {(() => {
            // Get all projects in the same category/subcategory, sorted newest→oldest
            const allProjects = isPhotoSeries
              ? getPhotoSeries()
              : getProjectsByCategory(project.category);

            const currentIndex = allProjects.findIndex((p) => p.id === project.id);
            const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
            const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

            return (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Previous Project */}
                <div>
                  {prevProject ? (
                    <Link to={`/project/${prevProject.id}`} className="group block">
                      <p className="text-sm text-black/40 tracking-wide mb-4">
                        ← {language === 'fr' ? 'Projet précédent' : language === 'en' ? 'Previous project' : '上一个项目'}
                      </p>
                      <div className="relative aspect-[4/3] bg-white overflow-hidden mb-4">
                        <ImageWithFallback
                          src={prevProject.coverImage}
                          alt={prevProject.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="text-xl md:text-2xl tracking-tight group-hover:opacity-60 transition-opacity">
                        {prevProject.title}
                      </h3>
                    </Link>
                  ) : (
                    <div className="opacity-30">
                      <p className="text-sm text-black/40 tracking-wide mb-4">
                        ← {language === 'fr' ? 'Projet précédent' : language === 'en' ? 'Previous project' : '上一个项目'}
                      </p>
                      <div className="aspect-[4/3] bg-black/5 mb-4" />
                      <p className="text-black/30">{language === 'fr' ? 'Aucun' : language === 'en' ? 'None' : '无'}</p>
                    </div>
                  )}
                </div>

                {/* Next Project */}
                <div>
                  {nextProject ? (
                    <Link to={`/project/${nextProject.id}`} className="group block">
                      <p className="text-sm text-black/40 tracking-wide mb-4 text-right">
                        {language === 'fr' ? 'Projet suivant' : language === 'en' ? 'Next project' : '下一个项目'} →
                      </p>
                      <div className="relative aspect-[4/3] bg-white overflow-hidden mb-4">
                        <ImageWithFallback
                          src={nextProject.coverImage}
                          alt={nextProject.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="text-xl md:text-2xl tracking-tight group-hover:opacity-60 transition-opacity text-right">
                        {nextProject.title}
                      </h3>
                    </Link>
                  ) : (
                    <div className="opacity-30">
                      <p className="text-sm text-black/40 tracking-wide mb-4 text-right">
                        {language === 'fr' ? 'Projet suivant' : language === 'en' ? 'Next project' : '下一个项目'} →
                      </p>
                      <div className="aspect-[4/3] bg-black/5 mb-4" />
                      <p className="text-black/30 text-right">{language === 'fr' ? 'Aucun' : language === 'en' ? 'None' : '无'}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
      />
    </div>
  );
}
