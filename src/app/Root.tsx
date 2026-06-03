import { Outlet, useLocation } from 'react-router';
import { Navigation } from './components/Navigation';
import { useLanguage } from './contexts/LanguageContext';
import { useEffect } from 'react';

export function Root() {
  const location = useLocation();
  const { language } = useLanguage();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const footerText = {
    rights: {
      fr: 'Tous droits réservés',
      en: 'All rights reserved',
      zh: '版权所有'
    },
    location: {
      fr: 'Neuilly-sur-Seine, France',
      en: 'Neuilly-sur-Seine, France',
      zh: '法国塞纳河畔讷伊'
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2]" lang={language}>
      <Navigation />
      <Outlet />

      {/* Footer */}
      <footer className="border-t border-black/10 py-12 px-8 md:px-12">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-sm text-black/40 tracking-tight">
            © 2026 ZHONG Yuan. {footerText.rights[language]}.
          </p>
          <p className="text-sm text-black/40 tracking-tight">
            {footerText.location[language]}
          </p>
        </div>
      </footer>
    </div>
  );
}
