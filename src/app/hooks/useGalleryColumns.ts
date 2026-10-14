import { useEffect, useState } from 'react';

function readColumns(): number {
  if (typeof window === 'undefined') return 4;
  if (window.matchMedia('(min-width: 1024px)').matches) return 4;
  return window.matchMedia('(min-width: 640px)').matches ? 2 : 1;
}

export function useGalleryColumns(): number {
  const [columns, setColumns] = useState(readColumns);
  useEffect(() => {
    const queries = ['(min-width: 640px)', '(min-width: 1024px)'].map((query) => window.matchMedia(query));
    const update = () => setColumns(readColumns());
    queries.forEach((query) => query.addEventListener('change', update));
    update();
    return () => queries.forEach((query) => query.removeEventListener('change', update));
  }, []);
  return columns;
}
