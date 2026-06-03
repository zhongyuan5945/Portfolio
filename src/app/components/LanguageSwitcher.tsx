import { useLanguage, Language } from '../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'zh', label: '中文' }
  ];

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang, index) => (
        <span key={lang.code} className="flex items-center">
          <button
            onClick={() => setLanguage(lang.code)}
            className={`text-xs tracking-wide transition-opacity text-black ${
              language === lang.code ? 'opacity-100 font-medium' : 'opacity-50 hover:opacity-100'
            }`}
          >
            {lang.label}
          </button>
          {index < languages.length - 1 && (
            <span className="mx-1.5 text-xs text-black/30">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
