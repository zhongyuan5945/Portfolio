import { useMemo } from 'react';
import image_Tier2_02__1 from '@/imports/Tier2_02_-1.png'
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { projectImageUrls } from '../data/projectImageData';
import { ProjectSections } from '../components/ProjectSections';

export function Home() {
  const { language } = useLanguage();

  const heroImage = useMemo(() => {
    const debondImages = projectImageUrls['debond'] ?? [];
    return debondImages.length > 0 ? debondImages[0] : image_Tier2_02__1;
  }, []);

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

      {/* Direct project navigation, generated from the existing datasets. */}
      <section className="editorial-work px-6 sm:px-8 md:px-12 py-16 md:py-20">
        <div className="max-w-[1600px] mx-auto">
          <ProjectSections />
        </div>
      </section>
    </div>
  );
}
