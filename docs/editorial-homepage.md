# Editorial / Swiss × Cinematic 主页作品区

作品区采用白底 Editorial / Swiss × Cinematic 排版。印刷、摄影和视频支持分批展开，并按屏幕宽度减少默认数量。视频显示从 YouTube 链接抓取的真实标题。Hero、主标题、顶部导航、字体文件、原项目数据、媒体路径、详情页面代码和路由保持不变。

## 排版规则

- 作品区使用白底，分类之间采用细线与留白，分类标题保留现有字体；未调整的项目组继续使用网格内介绍，摄影和视频介绍放在画廊上方。
- 印刷和视频在桌面 1024px 以上使用四列紧凑网格；摄影使用四列精选大图与档案组合。其他项目仍在 1024–1279px 使用三列、1280px 以上使用四列。平板 640–1023px 使用两列，手机使用一列。
- 未调整的项目继续每八件组成 Editorial 画廊：第一组左上放介绍，第四件跨两列、两行；后续组第一件跨两列、两行，最后一件跨两列。摄影每四个系列组成一组，左侧一张精选大图，右侧两张小图与一张横向图。
- 小屏取消明确行列坐标，按原数据顺序排布；平板保留大图跨两列，手机全部单列，不使用随机 Masonry 或 dense 自动回填。
- 图片按实测比例预留空间，极端长幅使用有界画布和 `object-fit: contain`，完整构图保留。大图使用更大的响应式图片候选，所有作品缩略图延迟加载。
- 项目编号在分类内顺序生成；原名称、类型、年份与箭头在图片上方保持可见。图片和文字属于同一链接。悬停缩放 1.025、过渡 250–300ms，减少动态效果时关闭变换。
- 印刷按店铺展示，保留 Impression 父项目总览；摄影按独立系列展示；绘画、漫画和插画不拆散原图片集。
- 主页视频使用静态封面，直接进入既有 `/video-references/:id` 详情地址。原 `/video-references?video=<id>` 页面及页内播放继续兼容，详情视觉未修改。

## 分批展开与收起

| 分组 | 桌面默认／追加 | 双列默认／追加 | 窄屏默认／追加 | 当前总数 |
| --- | --- | --- | --- | --- |
| Impression / Print | 8 / 8 | 4 / 4 | 2 / 2 | 36 家店铺 |
| Photos / Photography | 4 / 4 | 4 / 4 | 2 / 2 | 9 个独立系列 |
| Video / Motion | 8 / 8 | 4 / 4 | 2 / 2 | 43 个视频 |

断点沿用现有网格：窄屏小于 640px；双列为 640–1023px；桌面为 1024px 及以上。数量和每次追加均由 `homepageGallery.ts` 的 `responsiveCounts.mobile`／`tablet` 配置，`ProjectSections` 复用 `useGalleryColumns` 监听屏幕变化。

其他平面项目、插画、漫画和游戏维持原展示方式。主页默认渲染窄屏 30 张、双列 36 张、桌面 44 张卡片，全部展开为 112 张；完整详情和图库不受展开数量影响。印刷保持 4:3 代表图，视频保持 16:9 静态画布，摄影保留精选大图与档案组合。

共用 `ExpandableProjectGallery` 根据 `PortfolioGroup.homepageGallery` 控制数量和布局，预设集中在 `data/homepageGallery.ts`。数量超过默认值时提供 Show Less；到最后一批隐藏 Show More；总数不超过默认值时没有按钮。按钮沿用法／英／中文翻译，细线上方留白、透明背景、48px 触摸高度、250ms 箭头过渡。

每个分组使用自己的主页查询参数（例如 `visible_impression=16`），更新时保留其他参数，不新增历史记录或重置滚动。进入详情再返回会恢复展开数量。显式展开的数量按绝对值保存，横竖屏切换或跨断点时不重新按批次取整、不减少已经展示的项目；默认状态则随屏幕更新。Show Less 恢复当前屏幕的默认数量。收起以仍保留的底部操作栏作为滚动锚点，补偿被删除内容的高度；已由浏览器保持位置时不重复移动。收起后焦点保留在 Show More，键盘展开后焦点进入第一张新增卡片。

只对可见数据切片进行渲染，隐藏项目没有图片元素或播放器；数据在本地一次读取。稳定的项目 ID 和画廊组 key 保留已有卡片，新批次才播放 250ms 淡入和 8px 上移。启用 `prefers-reduced-motion` 时关闭新增动画与箭头位移，不使用固定高度或 max-height 动画。

## 数据与维护

`portfolio.ts` 仍负责从原数据派生项目及分组，并为店铺、摄影和视频组指定 `homepageGallery` 预设。`homepageGallery.ts` 定义 `initialVisibleCount`、`loadMoreCount`、`responsiveCounts`、`layoutVariant` 及数量转换；`editorialLayout.ts` 定义主页视图、确定的网格位置和图片比例，不修改原项目记录。新增作品只需补充原项目数据，顺序、计数、按钮及后续批次自动更新。

`editorialImageMetadata.json` 保存实际缩略图宽高及 YouTube oEmbed 标题接口返回的标题。当前 43 个视频标题均已从原链接刷新。`videoTitles.ts` 集中读取缓存，主页卡片、图片 alt、旧视频列表和详情首帧使用相同的真实标题；`useVideoTitle` 不再把缓存标题覆盖为 `Video NN`／`Short NN`。

主页不为标题批量发起网络请求，也不初始化播放器。有缓存的视频详情直接复用缓存；只有没有缓存的旧编号视频在需要显示时才通过 oEmbed 获取标题，最多同时三条请求。明确填写的真实项目标题继续优先使用。新增作品若暂未同步缓存，显示平台名称而非编号占位标题；刷新失败保留已有缓存。

新增项目后，主页自动生成入口和编号。可运行：

```text
node scripts/collect-editorial-images.mjs
```

该命令只读取小尺寸缩略图与标题元数据，刷新尺寸缓存，不下载视频或替换作品。没有缓存的新图片仍有默认比例并使用 contain 显示，不需要修改主页 JSX。只更新已测量封面的 YouTube 标题可运行 `node scripts/collect-editorial-images.mjs --titles-only`；新增或替换封面后运行完整命令，同步新封面的尺寸及真实标题。标题刷新失败会保留原有缓存并报告失败记录。

## 本次文件

| 文件 | 改动 |
| --- | --- |
| `src/app/components/ProjectSections.tsx` | 接入网格断点与响应式数量 |
| `src/app/data/homepageGallery.ts` | 窄屏 2/2、双列 4/4；保留已展开的绝对数量 |
| `src/app/components/ProjectCard.tsx` | Editorial 入口使用视图中的真实标题 |
| `src/app/data/videoTitles.ts` | 共用 YouTube 缓存标题读取与编号识别 |
| `src/app/data/portfolio.ts`、`src/app/data/editorialLayout.ts` | 视频入口使用共用真实标题 |
| `src/app/hooks/useVideoTitle.ts` | 首次显示使用缓存，避免编号覆盖和重复标题请求 |
| `src/app/data/editorialImageMetadata.json` | 从 43 个 YouTube 链接刷新标题缓存 |
| `scripts/collect-editorial-images.mjs` | 抓取全部 YouTube 标题，刷新失败保留原缓存 |
| `scripts/check-portfolio.mjs` | 手机／双列／桌面批次、跨断点数量和卡片／详情真实标题检查 |
| `docs/portfolio-maintenance.md`、本文件 | 记录最新主页维护规则 |

## 人工视觉复核

当前环境没有可用浏览器，本次没有重复尝试浏览器自动化。构建和组件静态渲染不能代替以下检查：

- 320／390／640／800／1024／1440px 的单列／两列／四列、摄影大小图与真实视频长标题换行。
- 平板跨列与手机单列的真实图片清晰度、框内对齐和滚动节奏。
- 连续展开与收起后的实际滚动位置、操作栏锚点、键盘焦点和手机触摸区域。
- 新增项目淡入和减少动态效果设置；进入详情再返回的展开数量与滚动位置、横竖屏切换后的已展开内容。
- 实际视频播放以及网络面板中未展开缩略图没有下载、主页没有播放器。

未提交、推送或部署。
