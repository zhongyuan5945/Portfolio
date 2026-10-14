# 主页结构调整交付记录

## 已完成

首页保留原 Hero、名称、三语介绍、四个分类及其说明。大型分类封面替换为数据生成的项目入口：36 家印刷店铺、9 个摄影系列和其他完整项目。店铺和摄影使用单行横向画廊；视频仅展示静态缩略图并横向滚动。全部入口共 112 个，Impression 父项目另保留总览链接。

旧 `/work`、分类、摄影列表和项目详情 URL 保留。店铺通过 `?shop=<id>` 定位，视频缩略图进入原 `/video-references?video=<id>#video-player` 页面，保留该页原说明，在页面内打开一个选中的播放器。此前的 `/video-references/<id>` 仍保持兼容。返回链接恢复主页对应分类及画廊位置，浏览器历史采用 React Router 滚动恢复。

主页四个分类分别使用编号、灰阶标题栏和外框，分类内用白底与左侧线框区分店铺集合、摄影系列、绘画／漫画及独立项目，并提供分类锚点导航。

## 修改文件

| 文件 | 用途 |
| --- | --- |
| `src/app/pages/Home.tsx` | 主页直接展示项目，原 Hero 保留 |
| `src/app/components/ProjectSections.tsx` | 分类导航、灰阶标题栏、外框和分组层级 |
| `src/app/components/ProjectCard.tsx` | 统一链接、代表图、标题、箭头、键盘状态 |
| `src/app/components/ProjectCarousel.tsx` | 印刷／摄影／视频横向画廊、键盘与滑动；视频仅缩略图 |
| `src/app/hooks/useGalleryColumns.ts`、`src/app/data/galleryNavigation.ts` | 响应式列数、分页和位置恢复逻辑 |
| `src/app/data/portfolio.ts` | 根据原项目、店铺、系列和视频派生入口 |
| `src/app/data/media.ts` | 仅在展示层派生 ImageKit 缩略图 |
| `src/app/data/projects.ts` | 分组与多视频类型、真实图片数量、稳定封面 |
| `src/app/data/videoReferences.ts` | 日期排序、详情查询、YouTube 嵌入地址 |
| `src/app/pages/ProjectDetail.tsx` | 修复 Hooks 顺序、店铺参数、分组及延迟视频 |
| `src/app/pages/VideoProjectDetail.tsx` | 保留单条详情兼容地址与页内播放 |
| `src/app/pages/VideoReferences.tsx` | 保留原说明、选中视频页内播放、横向缩略图及关闭控制 |
| `src/app/pages/PhotoSeries.tsx` | 保留旧展开式画廊，复用缩略图与延迟播放器 |
| `src/app/pages/CategoryWork.tsx` | 使用真实、静态的项目代表图 |
| `src/app/components/VideoPlayer.tsx` | 按点击创建 iframe 或文件播放器 |
| `src/app/components/GalleryMasonry.tsx` | 原详情瀑布画廊的响应式列数 |
| `src/app/components/PortfolioReturnLink.tsx` | 返回所属分类，保留视频展开参数 |
| `src/app/hooks/useVideoTitle.ts` | 视口附近按需获取标题，限制并发并缓存 |
| `src/app/components/figma/ImageWithFallback.tsx` | 修正换图与失败回退、保留 alt |
| `src/app/Root.tsx`、`src/app/routes.tsx` | 滚动恢复、语义 main、新视频路由按需导入 |
| `src/app/i18n/translations.ts` | 补充交互文案，原翻译保持 |
| `src/styles/accessibility.css`、`src/styles/index.css` | 键盘焦点和减少动态效果 |
| `public/404.html`、`index.html` | GitHub Pages 恢复完整路径、查询参数和锚点 |
| `scripts/load-source.mjs`、`scripts/check-portfolio.mjs` | 在内存编译并检查数据、路由及详情输出 |
| `scripts/check-media.mjs` | 联网媒体检查及报告生成 |
| `package.json` | 增加检查脚本，无新增依赖 |
| `.github/workflows/deploy.yml` | 发布前自动检查及回退文件检查 |
| `.gitignore` | 排除生成的媒体报告 |
| `README.md`、`docs/portfolio-maintenance.md` | 更新检查命令与作品维护说明 |

## 验证结果

- `npm.cmd run check` 和 `npm.cmd run build` 通过。
- 34 个站内项目、36 个店铺、43 个视频入口全部经过组件渲染和地址检查；无效项目 ID 返回 404。
- 与修改前数据逐项比较，原项目元数据、三语文字、图片数组、店铺内容和视频来源完全保留；717 张独立画廊图片无遗漏。
- 873 项媒体／来源接口检查通过，包括原图、缩略图、视频文件头及 YouTube 元数据。四张 GIF 的 HEAD 响应不准确，通过小范围 GET 复核，未下载完整动图或视频。
- 本地十个代表性页面地址／模块均返回 HTTP 200；生产包包含响应式网格、焦点、减少动态效果及 404 回退。
- 旧视频详情按需加载；首页不创建 iframe 或 video，视频页未选中时也不创建播放器。
- Git 差异格式检查通过。未提交、推送或部署。

当前浏览器工具没有可用实例，因此实际屏幕布局、触摸滑动、Tab 体验、浏览器历史滚动恢复和视频播放仍需人工复核。正式 GitHub Pages 上的直接刷新要在部署后验证；目前已验证本地访问及回退脚本逻辑。

## 紧凑展示

| 内容 | 当前表现 | 浏览方式 |
| --- | --- | --- |
| 印刷与摄影 | 桌面一行 4 张、平板 2 张、手机一张并露出下一张；显示范围和总数 | 按钮、滑动、方向键、Home／End；可主页内展开全部 |
| 视频 | 仅静态缩略图：桌面一行 4 张、平板 2 张、手机一张并露出下一张 | 横向滚动、按钮、键盘；点击进入原视频页并播放所选作品 |

印刷店铺与摄影系列保留标题和箭头，整卡直达详情；视频仅显示缩略图，保留 alt 和语义链接，点击进入原视频页并在页内播放。画廊手动切换，支持触摸、键盘方向键、Home／End 与减少动态效果。详情中的图片集、原说明和视频来源数据保持。

布局规则在 `portfolio.ts` 中配置，复用 `ProjectCarousel` 和 `ProjectCard`。新增作品只需更新对应数据；分组标题、数量单位及展示方式集中配置。印刷和摄影可在主页展开全部，视频位置保存于查询参数中，返回后恢复。旧分页参数继续兼容。
