import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

export function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center px-8">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl tracking-tight mb-8">404</h1>
        <p className="text-2xl text-black/60 tracking-tight mb-12">
          {t('notFound.title', language)}
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-4 border border-black text-black hover:bg-black hover:text-[#f2f2f2] transition-colors"
        >
          <span className="text-sm tracking-wide">{t('notFound.returnHome', language)}</span>
        </Link>
      </div>
    </div>
  );
}
