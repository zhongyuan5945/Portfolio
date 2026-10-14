import { getAllProjectsByCategory, type Category, type Project } from './projects';
import { getSortedVideoReferences, type VideoReference } from './videoReferences';
import { homepageGalleryPresets, type HomepageGalleryConfig } from './homepageGallery';
import { getCachedVideoTitle } from './videoTitles';

export type PortfolioCategory = Category | 'creations-video';

export const categoryOrder: PortfolioCategory[] = [
  'projets-graphiques', 'arts-visuels', 'univers-ludiques', 'creations-video'
];

export interface ProjectCardEntry {
  id: string;
  kind: 'project' | 'shop' | 'video';
  title: string;
  to: string;
  thumbnail: string;
  type?: string;
  year?: string;
  parentId?: string;
  video?: VideoReference;
}

export interface PortfolioGroup {
  id: string;
  title?: string;
  titleKey?: string;
  countLabelKey?: string;
  overviewTo?: string;
  layout: 'grid' | 'carousel' | 'video-pages' | 'video-thumbnails';
  homepageGallery?: HomepageGalleryConfig;
  entries: ProjectCardEntry[];
}

export function getProjectThumbnail(project: Project): string {
  return project.thumbnailImage
    ?? project.images?.find((url) => !/\.gif(?:\?|$)/i.test(url))
    ?? project.coverImage;
}

export function getVideoEntry(video: VideoReference): ProjectCardEntry {
  return {
    id: video.id, kind: 'video', title: getCachedVideoTitle(video),
    to: `/video-references?video=${encodeURIComponent(video.id)}#video-player`,
    thumbnail: video.thumbnail, type: video.platform,
    year: video.publishedAt.slice(0, 4), video
  };
}

export function getPortfolioGroups(category: PortfolioCategory): PortfolioGroup[] {
  if (category === 'creations-video') {
    return [{ id: category, layout: 'video-thumbnails', homepageGallery: homepageGalleryPresets.video, countLabelKey: 'portfolio.videos', entries: getSortedVideoReferences().map(getVideoEntry) }];
  }

  const projects = getAllProjectsByCategory(category);
  const groups: PortfolioGroup[] = [];
  const appendProjects = (items: Project[], groupTitle?: string) => {
    let current: PortfolioGroup | undefined;
    for (const project of items) {
      if (project.shops?.length) {
        current = undefined;
        groups.push({
          id: project.id, title: project.title, overviewTo: `/project/${project.id}`, layout: 'carousel', countLabelKey: 'portfolio.shops',
          homepageGallery: homepageGalleryPresets.print,
          entries: project.shops.map((shop) => ({
            id: `${project.id}:${shop.id}`, kind: 'shop', parentId: project.id,
            title: shop.name,
            to: `/project/${project.id}?shop=${encodeURIComponent(shop.id)}`,
            thumbnail: shop.thumbnailImage ?? shop.images[0] ?? project.coverImage,
            type: project.type, year: shop.year
          }))
        });
      } else {
        if (!current) {
          const photoGroupCount = groups.filter((group) => group.id.startsWith('photos')).length;
          current = {
            id: groupTitle ? (photoGroupCount ? `photos-${photoGroupCount}` : 'photos') : `${category}-${groups.length}`,
            title: groupTitle, layout: groupTitle ? 'carousel' : 'grid', entries: [],
            homepageGallery: groupTitle ? homepageGalleryPresets.photography : undefined,
            titleKey: groupTitle ? undefined : (category === 'arts-visuels' ? 'portfolio.drawingAndComics' : 'portfolio.independentProjects'),
            countLabelKey: groupTitle ? 'portfolio.series' : 'portfolio.works'
          };
          groups.push(current);
        }
        current.entries.push({
          id: project.id, kind: 'project', title: project.title,
          to: `/project/${project.id}`, thumbnail: getProjectThumbnail(project),
          type: project.type, year: project.year
        });
      }
    }
  };

  appendProjects(projects.filter((project) => project.subcategory === 'photo'), 'Photos');
  appendProjects(projects.filter((project) => project.subcategory !== 'photo'));
  return groups;
}
