import { Link, useLocation } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  const { language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f2f2f2]/95 backdrop-blur-sm border-b border-black/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-base md:text-lg tracking-tight hover:opacity-60 transition-opacity font-[Silkscreen] text-black">
            ZHONG Yuan
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-12">
            <Link
              to="/"
              className={`text-sm tracking-wide transition-opacity text-black ${
                isActive('/') && location.pathname === '/' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
            >
              {t('nav.home', language)}
            </Link>
            <Link
              to="/work"
              className={`text-sm tracking-wide transition-opacity text-black ${
                isActive('/work') || isActive('/project') || isActive('/video-references')
                  ? 'opacity-100'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              {t('nav.work', language)}
            </Link>
            <Link
              to="/about"
              className={`text-sm tracking-wide transition-opacity text-black ${
                isActive('/about') ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
            >
              {t('nav.about', language)}
            </Link>
            <Link
              to="/contact"
              className={`text-sm tracking-wide transition-opacity text-black ${
                isActive('/contact') ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
            >
              {t('nav.contact', language)}
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-black hover:opacity-60 transition-opacity"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-black/10 pt-4">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm tracking-wide transition-opacity text-black ${
                  isActive('/') && location.pathname === '/' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {t('nav.home', language)}
              </Link>
              <Link
                to="/work"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm tracking-wide transition-opacity text-black ${
                  isActive('/work') || isActive('/project') || isActive('/video-references')
                    ? 'opacity-100'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {t('nav.work', language)}
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm tracking-wide transition-opacity text-black ${
                  isActive('/about') ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {t('nav.about', language)}
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm tracking-wide transition-opacity text-black ${
                  isActive('/contact') ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {t('nav.contact', language)}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
