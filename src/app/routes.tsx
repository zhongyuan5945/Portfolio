import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { CategoryWork } from './pages/CategoryWork';
import { PhotoSeries } from './pages/PhotoSeries';
import { ProjectDetail } from './pages/ProjectDetail';
import { VideoReferences } from './pages/VideoReferences';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'work', Component: Work },
      { path: 'work/:category', Component: CategoryWork },
      { path: 'work/arts-visuels/photo', Component: PhotoSeries },
      { path: 'project/:id', Component: ProjectDetail },
      { path: 'video-references', Component: VideoReferences },
      { path: 'about', Component: About },
      { path: 'contact', Component: Contact },
      { path: '*', Component: NotFound },
    ],
  },
]);
