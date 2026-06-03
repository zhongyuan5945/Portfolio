/// <reference types="vite/client" />

declare module 'react-responsive-masonry' {
  import * as React from 'react';

  export interface MasonryProps extends React.HTMLAttributes<HTMLDivElement> {
    columnsCount?: number | ((width: number) => number);
    gutter?: string | number;
    children?: React.ReactNode;
  }

  export interface ResponsiveMasonryProps extends React.HTMLAttributes<HTMLDivElement> {
    columnsCountBreakPoints?: Record<number, number>;
    children?: React.ReactNode;
  }

  export const ResponsiveMasonry: React.FC<ResponsiveMasonryProps>;
  const Masonry: React.FC<MasonryProps>;
  export default Masonry;
}

declare module 'yet-another-react-lightbox/styles.css';
