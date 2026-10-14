// Display-only variants: source URLs and full-size gallery assets stay intact.
export function getThumbnailUrl(source: string, width = 640): string {
  try {
    const url = new URL(source);
    if (url.hostname === 'ik.imagekit.io') {
      url.searchParams.set('tr', `w-${width},q-70`);
      return url.toString();
    }
    return source;
  } catch {
    return source;
  }
}
