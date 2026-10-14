# 作品数据维护

主页从现有数据自动生成，不需要手动添加卡片 JSX。四个分类及顺序由 `src/app/data/portfolio.ts` 的 `categoryOrder` 定义；原标题和三语分类说明仍在 `i18n/translations.ts`。当前主页采用白底 Editorial Grid，规则和本次文件清单见 [editorial-homepage.md](editorial-homepage.md)。

## 普通项目与摄影系列

1. 在 `data/projects.ts` 的 `projectsData` 添加项目记录，填写唯一 `id`、原名称、年份、作者、类型、分类和法／英／中文说明。
2. 在 `data/projectImageData.ts` 的 `projectImageUrls` 中，以同一个 `id` 添加完整图片数组。数组顺序就是详情页和灯箱的顺序。
3. 摄影系列使用 `category: 'arts-visuels'` 和 `subcategory: 'photo'`，会自动进入主页 Photos 分组及旧摄影页面。
4. 可选 `thumbnailImage` 指定代表图；默认优先选择第一张静态图片。详情完整保留 GIF。真实图片数量会自动计算。

项目地址始终是 `/project/<id>`。已发布的 ID 应保持稳定；同名项目也应使用不同 ID，例如现有 `dry_bd` 和 `dry`。

## 店铺与父项目

在 `data/impressionShops.ts` 添加独立店铺记录。填写唯一 `id`、名称、`YYYYMM` 日期及按展示顺序排列的 `images`，可补充地址、三语说明和 `thumbnailImage`。

主页自动显示每家店铺，并生成 `/project/impression?shop=<id>`。旧父项目页面、店铺完整画廊及灯箱继续保留。新的店铺集合项目可以通过 `shops` 引用自己的数据数组，不需要修改主页或详情组件。

## 多分组的系列

使用项目的 `galleryGroups: [{ name, images }]` 定义顺序和归属。每个分组可以有任意数量的图片；主页仍只有一张项目卡片。现有 Dessins 引用 `dessinSubcategoryImages`，五个分组的顺序在项目记录中定义。

## 视频

独立视频：在 `data/videoReferences.ts` 添加唯一 `id`、准确标题、平台、来源 `url`、静态 `thumbnail`、ISO 格式 `publishedAt` 和可选三语 `description`。主页和视频页自动按日期排序。主页直接链接既有 `/video-references/<id>` 详情；原 `/video-references?video=<id>#video-player` 页面继续保留原说明与页内播放。

优先直接填写真实标题。主页显示编号、名称、年份和静态封面，不运行标题接口。`videoTitles.ts` 让主页、旧视频页、详情标题和 alt 共用 `editorialImageMetadata.json` 中的 YouTube 来源标题；历史 `Video NN` / `Short NN` 不再显示在作品入口。详情优先使用缓存，无缓存时按需获取，最多同时请求三条；失败不覆盖已知标题。

已测量封面的标题可以运行 `node scripts/collect-editorial-images.mjs --titles-only` 刷新；新增或更换视频封面后运行完整的 `node scripts/collect-editorial-images.mjs`，同时写入封面尺寸和真实标题。抓取针对全部 YouTube 链接，失败保留旧缓存并报告记录。原视频 ID、详情地址、来源 URL、日期和说明不改变。

普通项目附带视频：可继续使用原 `videoUrl`，或使用 `videos` 数组，例如：

```ts
videos: [
  { kind: 'file', src: '原视频地址', poster: '静态封面地址', placement: 'before-gallery' },
  { kind: 'embed', src: '原嵌入地址', poster: '静态封面地址', title: '原视频标题' }
]
```

`placement` 默认在画廊后方。普通项目附带视频点击后才创建播放器；原视频页仅为 `video` 参数指定的作品创建一个播放器，切换或关闭会卸载此前的播放器。视频文件和 iframe 都不会自动播放。独立视频支持自动转换 YouTube 普通链接和 Shorts 链接；来源 URL 保留在数据中，播放入口使用页面内嵌入。新增其他平台需在 `getVideoEmbedUrl` 增加对应适配。

## 主页网格与其他页面画廊

原图路径和完整画廊数据不改变。ImageKit 缩略图仅在展示时添加尺寸与质量参数；更新策略集中在 `data/media.ts`。

主页使用可配置的画廊展示。`homepageGallery.ts` 集中管理桌面的印刷 8/8/compact-grid、摄影 4/4/featured-gallery、视频 8/8/cinematic-grid 以及 `responsiveCounts`。三组在小于 640px 时默认／追加 2/2，640–1023px 时默认／追加 4/4，1024px 以上使用桌面原值；`ProjectSections` 复用 `useGalleryColumns` 与现有网格断点同步。

`portfolio.ts` 为对应的真实分组指定 `homepageGallery` 预设。共用 `ExpandableProjectGallery` 负责独立展开、收起、按钮、键盘焦点和滚动补偿。新增作品自动进入后续批次，不需要修改 JSX。

印刷与视频在桌面使用四列紧凑网格，视频画布为 16:9；摄影每四个独立系列组成精选大图与档案组合，位置集中在 `editorialLayout.ts`。其他平面项目、插画、漫画和游戏保持八件一组的 Editorial Grid，不增加展开按钮。店铺和系列的层级与所有详情内容保留。

展开状态保存在各自的主页查询参数中，如 `visible_impression`、`visible_photos`、`visible_creations-video`，进入详情后返回可恢复；已展开数量跨屏幕断点保留，不按新批次取整。收起恢复当前屏幕默认值，并仅删除该组的数量参数。隐藏项目不渲染缩略图，展开时只追加新卡片，既有卡片按稳定 ID 保留。

主页图片尺寸在 `editorialImageMetadata.json` 中缓存，读取原素材小尺寸响应测量，不替换原素材。新增或更换封面后，可运行 `node scripts/collect-editorial-images.mjs` 更新尺寸与原来源标题；没有记录的新作品使用有界的默认比例，保持完整构图。

原视频列表页仍保留横向缩略图、`gallery_creations-video`、`videoStart`、`videos` 参数和单个选中播放器。其他页面的既有画廊与视觉保持；主页新样式只作用于 `.editorial-work`。

主页四个分类采用白底、大标题、编号、细线分隔与网格内说明，取消大色块和卡片外框。分组名称和数量单位仍由 `PortfolioGroup` 的 `title`／`titleKey`、`countLabelKey` 配置。

## 检查与部署

运行 `npm run check` 检查默认／逐批／收起数量、各组独立状态、最后一批与不足数量的按钮、未展开缩略图、动画范围、所有数据入口、详情渲染、店铺定位、系列图片、Editorial 网格重叠、原名称／原图、单个页内播放器、原视频说明、无效 ID 和 GitHub Pages URL 回退；运行 `npm run build` 构建。Windows PowerShell 如拦截 npm 脚本，使用 `npm.cmd run check` 和 `npm.cmd run build`。

现有配置使用 `base: '/'`，对应域名根目录部署。`public/404.html` 和 `index.html` 的脚本共同恢复 GitHub Pages 深链接，保留查询参数和锚点。若将来改为仓库子目录部署，应一起调整 Vite base 和回退脚本。

自动检查不代替浏览器中的触摸、键盘、前进后退、图片加载和视频播放检查。提交或推送仍由你确认后执行。

`npm run check:media` 是可选的联网检查：读取图片响应、缩略图、视频文件头信息与 YouTube 标题接口，不下载完整视频。最多同时检查六条资源，结果写入 `reports/media-audit.json`。远程平台返回错误可能来自访问限制，需要结合实际播放检查。
