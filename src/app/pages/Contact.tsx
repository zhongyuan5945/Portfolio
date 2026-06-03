import { Mail, Phone, Instagram, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

export function Contact() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center">
      <section className="px-8 md:px-12 py-32">
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="text-5xl md:text-6xl tracking-tight mb-16">
            {t('contact.title', language)}
          </h1>

          <p className="text-xl md:text-2xl text-black/60 tracking-tight mb-20 max-w-2xl mx-auto">
            {t('contact.description', language)}
          </p>

          <div className="space-y-12">
            <div>
              <p className="text-sm text-black/40 tracking-wide mb-4">
                {t('contact.email', language)}
              </p>
              <a
                href="mailto:zhongyuan5945@gmail.com"
                className="inline-flex items-center gap-3 text-2xl md:text-3xl tracking-tight hover:opacity-60 transition-opacity"
              >
                <Mail size={28} />
                zhongyuan5945@gmail.com
              </a>
            </div>

            <div className="border-t border-black/10 pt-12">
              <p className="text-sm text-black/40 tracking-wide mb-4">
                {t('contact.phone', language)}
              </p>
              <a
                href="tel:+33637510836"
                className="inline-flex items-center gap-3 text-xl md:text-2xl tracking-tight hover:opacity-60 transition-opacity"
              >
                <Phone size={24} />
                +33 6 37 51 08 36
              </a>
            </div>

            <div className="border-t border-black/10 pt-12">
              <p className="text-sm text-black/40 tracking-wide mb-6">
                {t('contact.follow', language)}
              </p>
              <div className="flex justify-center gap-8">
                <a
                  href="https://www.instagram.com/zhongyuan5945"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-lg tracking-tight hover:opacity-60 transition-opacity"
                >
                  <Instagram size={22} />
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/in/yuan-zhong-b1a3a7113/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg tracking-tight hover:opacity-60 transition-opacity"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-black/10">
            <p className="text-sm text-black/40 tracking-tight">
              {t('contact.location', language)}
              <br />
              25 bis, rue du Château, 92200 Neuilly-sur-Seine
              <br />
              {t('contact.availability', language)}
            </p>
            <p className="text-xs text-black/30 tracking-tight mt-4">
              SIRET: 903 578 938 00016
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
