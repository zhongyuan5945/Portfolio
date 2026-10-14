import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { loadSource, projectRoot } from './load-source.mjs';

const source = await loadSource(`
  import React from 'react';
  import { renderToStaticMarkup } from 'react-dom/server';
  import { createMemoryRouter, RouterProvider } from 'react-router';
  import { LanguageProvider } from './src/app/contexts/LanguageContext';
  import { Home } from './src/app/pages/Home';
  import { ProjectDetail } from './src/app/pages/ProjectDetail';
  import { VideoProjectDetail } from './src/app/pages/VideoProjectDetail';
  import { VideoReferences } from './src/app/pages/VideoReferences';
  import { CategoryWork } from './src/app/pages/CategoryWork';
  import { PhotoSeries } from './src/app/pages/PhotoSeries';
  import { About } from './src/app/pages/About';
  import { Contact } from './src/app/pages/Contact';
  import { VideoPlayer } from './src/app/components/VideoPlayer';
  import { ExpandableProjectGallery } from './src/app/components/ExpandableProjectGallery';
  import { EditorialProjectGrid } from './src/app/components/EditorialProjectGrid';
  export * from './src/app/data/projects';
  export * from './src/app/data/videoReferences';
  export * from './src/app/data/portfolio';
  export * from './src/app/data/projectImageData';
  export * from './src/app/data/galleryNavigation';
  export * from './src/app/i18n/translations';
  export * from './src/app/data/editorialLayout';
  export * from './src/app/data/homepageGallery';
  export * from './src/app/data/videoTitles';
  export * from './src/app/data/resume';
  export * from './src/app/data/contact';
  export function render(url, state, width) {
    const previousWindow = globalThis.window;
    if (width !== undefined) globalThis.window = { matchMedia: (query) => ({ matches: width >= Number(query.match(/[0-9]+/)[0]) }) };
    const routes = [
      ['/', Home], ['/project/:id', ProjectDetail], ['/video-references/:id', VideoProjectDetail],
      ['/video-references', VideoReferences], ['/work/:category', CategoryWork],
      ['/work/arts-visuels/photo', PhotoSeries], ['/about', About], ['/contact', Contact]
    ].map(([path, Component]) => ({ path, element: <LanguageProvider><Component /></LanguageProvider> }));
    const target = new URL(url, 'https://portfolio.invalid');
    const router = createMemoryRouter(routes, { initialEntries: [{ pathname: target.pathname, search: target.search, hash: target.hash, state }] });
    try { return renderToStaticMarkup(<RouterProvider router={router} />); }
    finally {
      router.dispose();
      if (width !== undefined) {
        if (previousWindow === undefined) delete globalThis.window;
        else globalThis.window = previousWindow;
      }
    }
  }
  export function renderPlayer(video, active) {
    return renderToStaticMarkup(<LanguageProvider><VideoPlayer video={video} title="Test video" active={active} /></LanguageProvider>);
  }
  export function renderGallery(entries, config) {
    const router = createMemoryRouter([{ path: '/', element: <LanguageProvider>
      <ExpandableProjectGallery entries={entries} category="projets-graphiques" groupId="test" label="Test collection" numberOffset={0} config={config} />
    </LanguageProvider> }]);
    try { return renderToStaticMarkup(<RouterProvider router={router} />); }
    finally { router.dispose(); }
  }
  export function renderAddedEntries(entries, animationFrom, layoutVariant) {
    const router = createMemoryRouter([{ path: '/', element: <LanguageProvider>
      <EditorialProjectGrid entries={entries} category="projets-graphiques" animationFrom={animationFrom} layoutVariant={layoutVariant} />
    </LanguageProvider> }]);
    try { return renderToStaticMarkup(<RouterProvider router={router} />); }
    finally { router.dispose(); }
  }
`);

const originalError = console.error;
console.error = (...args) => {
  // This warning is expected when rendering client-side routers in SSR checks.
  if (!String(args[0]).includes('useLayoutEffect does nothing on the server')) originalError(...args);
};
const escaped = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');

try {
  const unique = (items, label) => assert.equal(new Set(items).size, items.length, `${label}: duplicate ID`);
  unique(source.projects.map((project) => project.id), 'Projects');
  unique(source.videoReferences.map((video) => video.id), 'Videos');
  const allEntries = source.categoryOrder.flatMap((category) => source.getPortfolioGroups(category).flatMap((group) => group.entries));
  const allGroups = source.categoryOrder.flatMap((category) => source.getPortfolioGroups(category));
  const defaultEntriesForColumns = (columns) => allGroups.flatMap((group) => group.entries.slice(0,
    group.homepageGallery ? source.getResponsiveGalleryConfig(group.homepageGallery, columns).initialVisibleCount : group.entries.length));
  const defaultEntries = defaultEntriesForColumns(4);
  const fullyExpandedParams = new URLSearchParams();
  for (const group of allGroups.filter((group) => group.homepageGallery)) fullyExpandedParams.set(source.getGalleryCountKey(group.id), String(group.entries.length));
  const fullyExpandedUrl = `/?${fullyExpandedParams}`;
  unique(allEntries.map((entry) => entry.id), 'Homepage entries');

  for (const project of source.projects) {
    for (const language of ['fr', 'en', 'zh']) assert.equal(typeof project.description[language], 'string', `${project.id}: missing ${language}`);
    assert.equal(project.imageCount, project.images.length, `${project.id}: stale image count`);
    const html = source.render(`/project/${project.id}`);
    assert.ok(!html.includes('Page non trouvée'), `${project.id}: missing detail`);
    assert.ok(!/<iframe|<video\b/.test(html), `${project.id}: player loaded without a click`);
    if (project.shops?.length) {
      unique(project.shops.map((shop) => shop.id), `${project.id} shops`);
      assert.ok(source.getPortfolioGroups(project.category).some((group) => group.overviewTo === `/project/${project.id}`), `${project.id}: missing parent overview`);
      for (const shop of project.shops) {
        assert.ok(shop.images.length > 0, `${shop.id}: empty gallery`);
        const entry = allEntries.find((entry) => entry.id === `${project.id}:${shop.id}`);
        assert.ok(entry, `${shop.id}: missing homepage entry`);
        assert.equal(new URL(entry.to, 'https://portfolio.invalid').searchParams.get('shop'), shop.id);
        const shopHtml = source.render(entry.to);
        assert.ok(shopHtml.includes('aria-expanded="true"'), `${shop.id}: deep link did not open the shop`);
        for (const image of shop.images) assert.ok(shopHtml.includes(escaped(image)), `${shop.id}: gallery image missing`);
      }
    } else {
      assert.ok(allEntries.some((entry) => entry.to === `/project/${project.id}`), `${project.id}: missing homepage entry`);
      for (const image of project.images) assert.ok(html.includes(escaped(image)), `${project.id}: gallery image missing`);
    }
  }
  for (const entry of allEntries) {
    assert.ok(entry.title && entry.thumbnail, `${entry.id}: missing card content`);
    assert.ok(!/\.gif(?:\?|$)/i.test(entry.thumbnail), `${entry.id}: animated homepage thumbnail`);
    if (entry.kind === 'project') assert.ok(source.getProjectById(decodeURIComponent(entry.to.split('/').pop())), `${entry.id}: broken project link`);
    if (entry.kind === 'video') {
      const target = new URL(entry.to, 'https://portfolio.invalid');
      assert.equal(target.pathname, '/video-references', `${entry.id}: video did not use the original page`);
      assert.equal(target.searchParams.get('video'), entry.id);
      assert.equal(target.hash, '#video-player');
    }
  }
  for (const video of source.videoReferences) {
    assert.ok(source.getVideoEmbedUrl(video), `${video.id}: unsupported embed URL`);
    const html = source.render(`/video-references/${video.id}`);
    const sourceTitle = source.getCachedVideoTitle(video);
    assert.ok(!source.isNumberedVideoTitle(sourceTitle), `${video.id}: title still uses a numbered placeholder`);
    assert.equal(sourceTitle, source.getEditorialImageSize(source.getVideoEntry(video)).title, `${video.id}: display title differs from fetched YouTube title`);
    assert.ok(html.includes(escaped(sourceTitle)), `${video.id}: initial detail heading is missing the cached source title`);
    assert.ok(!/href="https?:\/\//.test(html), `${video.id}: external playback link remains`);
    assert.ok(!/<iframe|<video\b/.test(html), `${video.id}: player initialized before interaction`);
    const inlineHtml = source.render(`/video-references?video=${video.id}#video-player`);
    assert.ok(inlineHtml.includes(escaped(sourceTitle)), `${video.id}: initial inline heading is missing the cached source title`);
    assert.equal((inlineHtml.match(/<iframe/g) ?? []).length, 1, `${video.id}: selected video must create exactly one inline player`);
    assert.ok(inlineHtml.includes(escaped(source.getVideoEmbedUrl(video))), `${video.id}: wrong embedded video`);
    assert.ok(inlineHtml.includes(escaped(source.translations.videoReferences.description.fr)), `${video.id}: original page description lost`);
    assert.ok(!/href="https?:\/\//.test(inlineHtml), `${video.id}: original page links to external playback`);
    assert.ok(!inlineHtml.includes('autoplay'), `${video.id}: video starts automatically`);
  }
  const videos = source.getSortedVideoReferences();
  assert.deepEqual(source.getPortfolioGroups('creations-video')[0].entries.map((entry) => entry.id), videos.map((video) => video.id));

  const videoIdsFromHtml = (html) => [...html.matchAll(/href="(\/video-references\?[^\"]+)"/g)].map((match) => new URL(match[1].replaceAll('&amp;', '&'), 'https://portfolio.invalid').searchParams.get('video'));
  const editorialVideoIds = (html) => [...html.matchAll(/href="\/video-references\/([^"?#]+)"/g)].map((match) => decodeURIComponent(match[1]));
  const homepageIds = (html) => [...html.matchAll(/data-project-id="([^"]+)"/g)].map((match) => match[1]);
  for (const [width, columns, videoCount, totalCount] of [
    [320, 1, 2, 30], [390, 1, 2, 30], [639, 1, 2, 30],
    [640, 2, 4, 36], [800, 2, 4, 36], [1023, 2, 4, 36],
    [1024, 4, 8, 44], [1100, 4, 8, 44], [1440, 4, 8, 44]
  ]) {
    const html = source.render('/', undefined, width);
    assert.deepEqual(editorialVideoIds(html), videos.slice(0, videoCount).map((video) => video.id), `Video default count at ${width}px is wrong`);
    assert.deepEqual(homepageIds(html), defaultEntriesForColumns(columns).map((entry) => escaped(entry.id)), `Default groups/order at ${width}px are wrong`);
    assert.equal(homepageIds(html).length, totalCount, `Total default count at ${width}px is wrong`);
    assert.equal((html.match(/<img\b/g) ?? []).length, totalCount + 1, `Hidden thumbnails initialized at ${width}px`);
    assert.deepEqual(homepageIds(source.render(fullyExpandedUrl, undefined, width)), allEntries.map((entry) => escaped(entry.id)), `Expanded gallery at ${width}px lost/repeated projects`);
    const videoSection = html.slice(html.indexOf('id="creations-video"'));
    assert.ok(videoSection.includes('editorial-project-title') && videoSection.includes('editorial-project-number'), 'Video title/number is missing');
    assert.ok(videoSection.includes('editorial-gallery-cinematic-grid') && !videoSection.includes('editorial-cell-feature'), 'Videos must use a compact thumbnail grid');
    assert.ok(!/<iframe|<video\b/.test(html), 'Homepage initialized a video player');
  }
  for (const query of ['', 'videoStart=8', 'videoStart=invalid', 'videoStart=-2', 'videoStart=999999', 'videos=24', 'gallery_creations-video_all=1']) {
    const html = source.render(query ? `/?${query}` : '/');
    assert.deepEqual(editorialVideoIds(html), videos.slice(0, 8).map((video) => video.id));
    assert.ok(!/<iframe|<video\b/.test(html), 'Homepage initialized a video player');
  }
  const originalVideoPage = source.render('/video-references');
  assert.deepEqual(videoIdsFromHtml(originalVideoPage), videos.map((video) => video.id));
  assert.ok(!/<iframe/.test(originalVideoPage), 'Unselected video page initialized players');
  assert.ok(!/<iframe/.test(source.render('/video-references?video=unknown')), 'Unknown video initialized a player');
  const shops = source.getProjectById('impression').shops;
  const shopIds = shops.map((shop) => `impression:${shop.id}`);
  for (const columns of [1, 2, 4]) {
    assert.equal(source.getCarouselStart(shopIds, shopIds.at(-1), columns), Math.max(0, shopIds.length - columns));
    assert.equal(source.getCarouselStart(shopIds, 'not-an-item', columns), 0);
  }
  const initialHome = source.render('/');
  let previousCategory = -1;
  for (const category of source.categoryOrder) {
    const position = initialHome.indexOf(`id="${category}"`);
    assert.ok(position > previousCategory, `${category}: category order or frame missing`);
    assert.ok(initialHome.includes(`aria-labelledby="${category}-title"`), `${category}: category heading relationship missing`);
    previousCategory = position;
  }
  assert.ok(initialHome.includes('editorial-work') && initialHome.includes('editorial-info'), 'Editorial layout or integrated introduction is missing');
  assert.ok(initialHome.includes('id="projets-graphiques-impression-heading"') && initialHome.includes('id="arts-visuels-photos-heading"'), 'Print/photo hierarchy missing');
  assert.equal((initialHome.match(/data-project-id=/g) ?? []).length, defaultEntries.length, 'Homepage default count is wrong');
  assert.equal((initialHome.match(/<img\b/g) ?? []).length, defaultEntries.length + 1, 'Hidden homepage thumbnails were initialized');
  assert.equal((initialHome.match(/loading="lazy"/g) ?? []).length, defaultEntries.length, 'Visible project thumbnails should load lazily');
  assert.ok(!initialHome.includes('editorial-cell-enter'), 'Initial render should not animate all projects');
  const expandedHome = source.render(fullyExpandedUrl);
  assert.equal((expandedHome.match(/data-project-id=/g) ?? []).length, allEntries.length, 'Expanded homepage lost a project');
  for (const category of source.categoryOrder) {
    assert.ok(initialHome.includes(escaped(source.translations.categories[category].description.fr)), `${category}: original introduction is missing`);
  }
  for (const entry of allEntries) {
    const editorialEntry = source.getEditorialEntry(entry);
    assert.ok(expandedHome.includes(escaped(editorialEntry.to)), `${entry.id}: missing direct editorial link`);
    const size = source.getEditorialImageSize(entry);
    assert.ok(size.width > 0 && size.height > 0, `${entry.id}: missing image space reservation`);
    assert.equal(editorialEntry.thumbnail, entry.thumbnail, `${entry.id}: changed original artwork`);
    assert.equal(editorialEntry.title, entry.kind === 'video' && /^(Video|Short) \d+$/.test(entry.title)
      ? size.title ?? entry.title : entry.title, `${entry.id}: changed original title/source title`);
    if (entry.kind === 'video') {
      assert.ok(expandedHome.includes(`class="editorial-project-title">${escaped(size.title)}</h4>`), `${entry.id}: card hook overwrote the cached YouTube title`);
      assert.ok(expandedHome.includes(`alt="${escaped(size.title)}"`), `${entry.id}: image alt text uses a placeholder title`);
    }
  }
  for (const hasIntro of [false, true]) {
    const occupied = new Set(hasIntro ? ['1:1'] : []);
    for (let index = 0; index < 8; index++) {
      const placement = source.getEditorialPlacement(index, hasIntro);
      assert.ok(placement.column > 0 && placement.column + placement.columns <= 5);
      assert.ok(placement.row > 0 && placement.row + placement.rows <= 4);
      for (let row = placement.row; row < placement.row + placement.rows; row++) {
        for (let column = placement.column; column < placement.column + placement.columns; column++) {
          const key = `${column}:${row}`;
          assert.ok(!occupied.has(key), `Editorial spread overlaps at ${key}`);
          occupied.add(key);
        }
      }
    }
  }
  // Exercise the same count/URL transitions used by the buttons, then render
  // every state. This does not require a browser or download hidden images.
  const batchCases = [
    { width: 390, columns: 1, counts: {
      impression: Array.from({ length: 18 }, (_, index) => (index + 1) * 2),
      photos: [2, 4, 6, 8, 9], 'creations-video': [...Array.from({ length: 21 }, (_, index) => (index + 1) * 2), 43]
    } },
    { width: 800, columns: 2, counts: {
      impression: [4, 8, 12, 16, 20, 24, 28, 32, 36], photos: [4, 8, 9], 'creations-video': [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 43]
    } },
    { width: 1440, columns: 4, counts: {
      impression: [8, 16, 24, 32, 36], photos: [4, 8, 9], 'creations-video': [8, 16, 24, 32, 40, 43]
    } }
  ];
  for (const { width, columns, counts } of batchCases) for (const [groupId, expectedCounts] of Object.entries(counts)) {
    const group = allGroups.find((group) => group.id === groupId);
    assert.ok(group?.homepageGallery, `${groupId}: missing reveal configuration`);
    const config = source.getResponsiveGalleryConfig(group.homepageGallery, columns);
    let params = new URLSearchParams('preserved=value');
    let visible = source.getGalleryVisibleCount(group.entries.length, config, null);
    for (const expected of expectedCounts) {
      assert.equal(visible, expected, `${groupId}: wrong increment`);
      params = source.getGallerySearchParams(params, groupId, visible, config);
      assert.equal(params.get('preserved'), 'value', 'Reveal removed unrelated query parameters');
      assert.equal(source.getGalleryVisibleCount(group.entries.length, config, params.get(source.getGalleryCountKey(groupId))), expected);
      const html = source.render(`/?${params}`, undefined, width);
      const visibleEntries = allGroups.flatMap((item) => item.entries.slice(0, item.id === groupId ? visible
        : item.homepageGallery ? source.getResponsiveGalleryConfig(item.homepageGallery, columns).initialVisibleCount : item.entries.length));
      assert.deepEqual(homepageIds(html), visibleEntries.map((entry) => escaped(entry.id)), `${groupId}: reveal changed order/other groups`);
      assert.ok(html.includes(`data-gallery-id="${groupId}" data-visible-count="${visible}"`));
      const groupStart = html.indexOf(`data-gallery-id="${groupId}"`);
      const groupEnd = html.indexOf('data-gallery-id=', groupStart + 1);
      const groupHtml = html.slice(groupStart, groupEnd < 0 ? undefined : groupEnd);
      assert.equal(groupHtml.includes(`aria-label="${escaped(source.t('portfolio.showMore', 'fr'))} — `), visible < group.entries.length, `${groupId}: Show More final-batch state is wrong`);
      assert.equal(groupHtml.includes(`aria-label="${escaped(source.t('portfolio.showLess', 'fr'))} — `), visible > config.initialVisibleCount, `${groupId}: Show Less state is wrong`);
      for (const hidden of group.entries.slice(visible)) assert.ok(!html.includes(`data-project-id="${escaped(hidden.id)}"`), `${hidden.id}: hidden thumbnail was rendered`);
      assert.ok(!/<iframe|<video\b/.test(html), 'Expanded homepage initialized video players');
      visible = source.getNextGalleryVisibleCount(visible, group.entries.length, config);
    }
    params = source.getGallerySearchParams(params, groupId, config.initialVisibleCount, config);
    assert.equal(params.has(source.getGalleryCountKey(groupId)), false, 'Show Less must restore the default URL/count');
    assert.deepEqual(homepageIds(source.render(`/?${params}`, undefined, width)), defaultEntriesForColumns(columns).map((entry) => escaped(entry.id)), `${groupId}: collapse did not restore default projects at ${width}px`);
    for (const invalid of [null, 'invalid', '-8', '1.5', '8x', '9007199254740992']) assert.equal(source.getGalleryVisibleCount(group.entries.length, config, invalid), config.initialVisibleCount);
    assert.equal(source.getGalleryVisibleCount(group.entries.length, config, String(config.initialVisibleCount + 1)), config.initialVisibleCount + 1, 'Resized views must keep the exact previously expanded count');
    for (const total of [0, config.initialVisibleCount - 1, config.initialVisibleCount]) {
      const html = source.renderGallery(group.entries.slice(0, total), config);
      assert.ok(!html.includes('editorial-gallery-controls'), `${groupId}: unnecessary buttons for ${total} projects`);
      assert.equal(homepageIds(html).length, total);
    }
    const firstExpandedCount = Math.min(group.entries.length, config.initialVisibleCount + config.loadMoreCount);
    const animated = source.renderAddedEntries(group.entries.slice(0, firstExpandedCount), config.initialVisibleCount, config.layoutVariant);
    const animatedIds = [...animated.matchAll(/class="[^"]*editorial-cell-enter[^"]*" data-project-id="([^"]+)"/g)].map((match) => match[1]);
    assert.deepEqual(animatedIds, group.entries.slice(config.initialVisibleCount, firstExpandedCount).map((entry) => escaped(entry.id)), 'Existing projects replay their entry animation');
  }
  for (const width of [390, 800, 1440, 390]) {
    const html = source.render('/?visible_impression=10&visible_photos=6&visible_creations-video=10', undefined, width);
    for (const [groupId, count] of [['impression', 10], ['photos', 6], ['creations-video', 10]]) {
      assert.ok(html.includes(`data-gallery-id="${groupId}" data-visible-count="${count}"`), `${groupId}: resize to ${width}px removed expanded projects`);
    }
  }
  const missingTitle = { ...videos[0], thumbnail: 'https://example.invalid/new-video.jpg' };
  assert.equal(source.getCachedVideoTitle(missingTitle), 'YouTube', 'Uncached title should not display a numbered placeholder');
  assert.equal(source.getCachedVideoTitle({ ...missingTitle, title: 'An explicit project title' }), 'An explicit project title', 'Explicit source titles must remain supported');
  let independentParams = new URLSearchParams(fullyExpandedParams);
  const printConfig = allGroups.find((group) => group.id === 'impression').homepageGallery;
  independentParams = source.getGallerySearchParams(independentParams, 'impression', printConfig.initialVisibleCount, printConfig);
  const independentHtml = source.render(`/?${independentParams}`);
  assert.deepEqual(editorialVideoIds(independentHtml), videos.map((video) => video.id), 'Collapsing Print changed Video state');
  assert.ok(independentHtml.includes('data-gallery-id="photos" data-visible-count="9"'), 'Collapsing Print changed Photography state');
  assert.equal(source.getCollapseScrollTop(3000, 600, -1400, 5000), 1000, 'Collapse did not retain the control viewport position');
  assert.equal(source.getCollapseScrollTop(1000, 600, 600, 5000), 1000, 'Already anchored viewport should stay put');
  assert.equal(source.getCollapseScrollTop(100, 600, -1400, 5000), 0, 'Collapse scroll must not be negative');
  assert.equal(source.getCollapseScrollTop(4900, 0, 300, 5000), 5000, 'Collapse scroll must respect the document bottom');
  for (const language of ['fr', 'en', 'zh']) {
    assert.ok(source.t('portfolio.showMore', language) !== 'portfolio.showMore');
    assert.ok(source.t('portfolio.showLess', language) !== 'portfolio.showLess');
  }
  const photoCells = new Set();
  for (let index = 0; index < 4; index++) {
    const placement = source.getFeaturedGalleryPlacement(index);
    assert.ok(placement.column > 0 && placement.column + placement.columns <= 5);
    assert.ok(placement.row > 0 && placement.row + placement.rows <= 3);
    for (let row = placement.row; row < placement.row + placement.rows; row++) for (let column = placement.column; column < placement.column + placement.columns; column++) {
      const cell = `${column}:${row}`;
      assert.ok(!photoCells.has(cell), 'Featured photographic archive overlaps');
      photoCells.add(cell);
    }
  }
  const returnUrl = '/?visible_impression=16&visible_photos=8&visible_creations-video=24#arts-visuels';
  assert.ok(source.render('/project/photo-cube-pixel', { portfolioReturn: returnUrl }).includes(`href="${escaped(returnUrl)}"`), 'Return URL lost gallery/video position');
  const videoReturnUrl = '/?visible_creations-video=24#creations-video';
  assert.ok(source.render('/video-references?video=ref-19', { portfolioReturn: videoReturnUrl }).includes(`href="${videoReturnUrl}"`), 'Original video page lost homepage carousel return position');
  for (const url of ['/project/not-a-project', '/video-references/not-a-video', '/work/not-a-category']) {
    assert.ok(source.render(url).includes('Page non trouvée'), `${url}: invalid route did not render 404`);
  }
  for (const category of source.categoryOrder.filter((id) => id !== 'creations-video')) source.render(`/work/${category}`);
  source.render('/work/arts-visuels/photo');
  const iframe = source.renderPlayer({ kind: 'embed', src: source.getVideoEmbedUrl(videos[0]) }, true);
  assert.equal((iframe.match(/<iframe/g) ?? []).length, 1);
  assert.ok(iframe.includes('loading="lazy"') && !iframe.includes('autoplay'));
  const localPlayer = source.renderPlayer({ kind: 'file', src: 'https://example.invalid/video.m4v' }, true);
  assert.ok(localPlayer.includes('controls=""') && localPlayer.includes('preload="metadata"'));

  const aboutHtml = source.render('/about');
  const experiences = source.resumeExperienceGroups.flatMap((group) => group.entries);
  unique(experiences.map((experience) => experience.id), 'Professional experience');
  assert.deepEqual(source.resumeExperienceGroups.map((group) => [group.id, group.entries.length]), [
    ['freelance', 5], ['internships', 4], ['volunteering', 2]
  ], 'About page lost the CV experience grouping');
  assert.deepEqual([...aboutHtml.matchAll(/data-experience-id="([^"]+)"/g)].map((match) => match[1]), experiences.map((experience) => experience.id), 'About experience order or content is missing');
  assert.equal(experiences.find((experience) => experience.id === 'picture-box-2026').period, '07/2026');
  assert.equal(experiences.find((experience) => experience.id === 'bonprint-2024').period, '11/2024 – 05/2026');
  for (const group of source.resumeExperienceGroups) {
    assert.ok(aboutHtml.includes(`aria-labelledby="experience-${group.id}"`));
    for (const language of ['fr', 'en', 'zh']) assert.notEqual(source.t(group.titleKey, language), group.titleKey, 'Experience heading is missing a translation');
  }
  for (const experience of experiences) {
    for (const language of ['fr', 'en', 'zh']) for (const field of ['role', 'company', 'location']) assert.ok(experience[field][language].trim(), `${experience.id}: missing ${field}/${language}`);
    for (const text of [experience.role.fr, experience.company.fr, experience.location.fr, experience.period]) assert.ok(aboutHtml.includes(escaped(text)), `${experience.id}: career information is missing`);
  }
  assert.ok(aboutHtml.includes('Toon Boom Harmony'), 'About page is missing the animation tool listed in the CV');
  assert.ok(aboutHtml.includes('Clip Studio Paint'), 'About page is missing the added illustration tool');
  assert.equal((aboutHtml.match(/Diplôme Supérieur des Arts Appliqués/g) ?? []).length, 2, 'DSAA must use its full name in the biography and education');
  for (const [language, fullName] of [
    ['fr', 'Diplôme Supérieur des Arts Appliqués'],
    ['en', 'Higher Diploma in Applied Arts'],
    ['zh', '应用艺术高级文凭']
  ]) assert.ok(source.t('about.bio3', language).includes(fullName), `DSAA biography is incomplete in ${language}`);
  assert.ok(aboutHtml.includes(`href="${source.resumeDownload.path}" download="${source.resumeDownload.filename}" type="application/pdf"`), 'CV button does not download the original PDF directly');
  for (const language of ['fr', 'en', 'zh']) for (const key of ['about.downloadCv', 'about.cvFormat']) assert.notEqual(source.t(key, language), key, 'CV download is missing a translation');
  const pdf = await readFile(path.join(projectRoot, 'public', source.resumeDownload.path));
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-', 'CV download file is missing or is not a PDF');
  assert.ok(pdf.subarray(-1024).toString().includes('%%EOF'), 'CV download file is truncated');

  const contactHtml = source.render('/contact');
  const preservedContactLinks = [
    'mailto:zhongyuan5945@gmail.com', 'tel:+33637510836',
    'https://www.instagram.com/zhongyuan5945', 'https://www.linkedin.com/in/yuan-zhong-b1a3a7113/'
  ];
  assert.deepEqual([...contactHtml.matchAll(/<a[^>]+href="([^"]+)"/g)].map((match) => match[1]), preservedContactLinks, 'Contact destinations were lost or changed');
  for (const text of [source.contactDetails.phoneDisplay, source.contactDetails.address, source.contactDetails.siret,
    source.t('contact.description', 'fr'), source.t('contact.location', 'fr'), source.t('contact.availability', 'fr')]) {
    assert.ok(contactHtml.includes(escaped(text)), `Contact page lost ${text}`);
  }
  for (const social of source.contactDetails.socialLinks) assert.ok(contactHtml.includes(`href="${social.href}" target="_blank" rel="noopener noreferrer"`), `${social.label}: external navigation behavior changed`);
  for (const section of ['email', 'phone', 'social', 'location']) assert.ok(contactHtml.includes(`aria-labelledby="contact-${section}-heading"`), `${section}: contact heading relationship missing`);
  for (const language of ['fr', 'en', 'zh']) for (const key of ['contact.locationLabel', 'contact.opensInNewTab']) assert.notEqual(source.t(key, language), key, 'Contact labels are missing a translation');

  const fallback = await readFile(path.join(projectRoot, 'public/404.html'), 'utf8');
  const index = await readFile(path.join(projectRoot, 'index.html'), 'utf8');
  const original = '/project/impression?shop=Aux-D%C3%A9lices-de-Lili#gallery';
  let redirected;
  vm.runInNewContext(fallback.match(/<script>([\s\S]*?)<\/script>/)[1], {
    location: { pathname: '/project/impression', search: '?shop=Aux-D%C3%A9lices-de-Lili', hash: '#gallery', replace: (value) => { redirected = value; } }, encodeURIComponent
  });
  let restored;
  vm.runInNewContext(index.match(/<script>([\s\S]*?)<\/script>/)[1], {
    location: { search: new URL(redirected, 'https://portfolio.invalid').search, origin: 'https://portfolio.invalid' },
    history: { replaceState: (_state, _unused, value) => { restored = value; } }, URL, URLSearchParams
  });
  assert.equal(restored, original, 'GitHub Pages fallback lost URL/query/hash');
  console.log(`Portfolio checks passed: ${source.projects.length} projects, ${source.projects.flatMap((project) => project.shops ?? []).length} shops, ${source.videoReferences.length} videos, ${defaultEntries.length} initial / ${allEntries.length} total homepage cards.`);
  console.log('Checked mobile/tablet/desktop reveal batches, resize persistence, fetched YouTube titles in initial cards/details, hidden thumbnails, independent collapse states, all content/direct links and video initialization.');
  console.log(`Checked ${experiences.length} CV experiences, multilingual career data, animation skill and the native PDF download link/file.`);
  console.log('Checked full DSAA naming, Clip Studio Paint, all preserved contact information/links and semantic contact sections.');
} finally {
  console.error = originalError;
}
