import { Link, useLocation } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import { categoryOrder, type PortfolioCategory } from '../data/portfolio';

export function PortfolioReturnLink({ category }: { category: PortfolioCategory }) {
  const { language } = useLanguage();
  const location = useLocation();
  const candidate = location.state?.portfolioReturn;
  // Accept only homepage/video-list URLs and known section anchors.
  let to = `/#${category}`;
  if (typeof candidate === 'string') {
    try {
      const url = new URL(candidate, 'https://portfolio.invalid');
      if (candidate.startsWith('/') && url.origin === 'https://portfolio.invalid'
        && ['/', '/video-references'].includes(url.pathname)
        && categoryOrder.includes(url.hash.slice(1) as PortfolioCategory)) {
        to = `${url.pathname}${url.search}${url.hash}`;
      }
    } catch { /* Fall back to this project's homepage section. */ }
  }
  return (
    <Link to={to} className="inline-flex min-h-11 items-center gap-2 text-sm text-black/60 hover:text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4">
      <ArrowLeft size={20} aria-hidden="true" />
      {t(to.startsWith('/video-references') ? 'portfolio.backToVideos' : 'work.backToHome', language)}
    </Link>
  );
}
