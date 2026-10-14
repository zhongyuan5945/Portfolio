import { Link, useLocation } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { categoryOrder, getPortfolioGroups, type PortfolioCategory } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import { ExpandableProjectGallery } from './ExpandableProjectGallery';
import { getProjectById } from '../data/projects';
import { getResponsiveGalleryConfig } from '../data/homepageGallery';
import { useGalleryColumns } from '../hooks/useGalleryColumns';
import '../../styles/editorial.css';

export function ProjectSections({ categories = categoryOrder }: { categories?: PortfolioCategory[] }) {
  const { language } = useLanguage();
  const location = useLocation();
  const columns = useGalleryColumns();

  return (
    <div>
      <nav aria-label={t('portfolio.browseCategories', language)} className="editorial-index">
        {categories.map((category, index) => (
          <Link key={category} to={`${location.pathname}${location.search}#${category}`}>
            <span aria-hidden="true" className="editorial-index-number">/{String(index + 1).padStart(2, '0')}</span>
            {t(`categories.${category}.title`, language)}
          </Link>
        ))}
      </nav>
      {categories.map((category, index) => {
        const groups = getPortfolioGroups(category);
        const total = groups.reduce((sum, group) => sum + group.entries.length, 0);
        let numberOffset = 0;
        return (
          <section key={category} id={category} className="editorial-category" aria-labelledby={`${category}-title`}>
            <header className="editorial-category-header">
              <div className="editorial-category-index">
                <span>{t('work.category', language)} / {String(index + 1).padStart(2, '0')}</span>
                <span>{total} {t('portfolio.works', language)}</span>
              </div>
              <h2 id={`${category}-title`} className="editorial-category-title">{t(`categories.${category}.title`, language)}</h2>
            </header>
            {groups.map((group, groupIndex) => {
              const offset = numberOffset;
              numberOffset += group.entries.length;
              const title = group.title ?? (group.titleKey ? t(group.titleKey, language) : t(`categories.${category}.title`, language));
              const count = `${group.entries.length} ${t(group.countLabelKey ?? 'portfolio.works', language)}`;
              const parent = group.overviewTo ? getProjectById(group.id) : undefined;
              const context = parent?.description[language].split('\n\n')[0]
                ?? (category === 'creations-video' ? t('videoReferences.description', language).split('\n\n')[0] : undefined);
              return (
                <div key={group.id} className="editorial-group" aria-labelledby={`${category}-${group.id}-heading`}>
                  <div className="editorial-group-header">
                    <div className="editorial-group-label">
                      <h3 id={`${category}-${group.id}-heading`}>{title}</h3>
                      <span className="editorial-group-count">{count}</span>
                    </div>
                    {group.overviewTo && (
                      <Link to={group.overviewTo} state={{ portfolioReturn: `${location.pathname}${location.search}#${category}` }} className="editorial-overview">
                        {t('portfolio.viewSeries', language)} <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                  <ExpandableProjectGallery entries={group.entries} category={category} numberOffset={offset}
                    groupId={group.id} label={title} config={group.homepageGallery ? getResponsiveGalleryConfig(group.homepageGallery, columns) : undefined}
                    introduction={groupIndex === 0 ? { description: t(`categories.${category}.description`, language), context, count } : undefined}
                  />
                </div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
