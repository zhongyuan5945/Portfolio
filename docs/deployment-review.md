# zhongyuan.fr 部署前检查

检查日期：2026-10-14（Europe/Paris）。本次只检查并整理发布方案，未暂存、提交、推送、触发部署或修改 GitHub Pages／OVH 设置。

## Git 与现有发布方式

- 当前分支：`main`，上游：`origin/main`。
- 远程：`https://github.com/zhongyuan5945/Portfolio.git`。
- 本地 HEAD、已记录的 origin/main 与只读查询得到的远程 main 均为 `9b759ac41e3a1b567a67208a482f4259557ff04c`，当前没有未推送提交或远程领先提交。
- 设计与功能改动仍在工作区，尚未进入任何提交。
- GitHub 的 `Deploy Vite to GitHub Pages` 工作流处于 active 状态，最近成功运行对应上述提交。[成功发布记录](https://github.com/zhongyuan5945/Portfolio/actions/runs/26916756519)中 build 上传 Pages artifact，deploy 成功执行 `actions/deploy-pages@v4`。
- 现有方式为自定义 GitHub Actions 构建并发布 `dist`，应继续复用 `.github/workflows/deploy.yml`。向 `main` 推送会触发它，不需要另建发布分支、提交 dist 或更换平台。
- 工作流仍使用 Node 20、`npm install`、`npm run build`、`upload-pages-artifact@v3`、`deploy-pages@v4`。本地既有改动只增加 `npm run check` 和 `dist/404.html` 存在性检查，没有改变发布来源、权限或部署目标。

GitHub Pages 设置的匿名 REST 请求返回 404，无法直接读取设置里的 `build_type`／`cname` 字段；这不表示网站未启用。已通过成功发布记录、现网响应和域名跳转确认实际托管正常。发布前请在[现有 Pages 设置页](https://github.com/zhongyuan5945/Portfolio/settings/pages)只查看 Source 与 Custom domain，确认仍为 GitHub Actions 与 `zhongyuan.fr`，无需修改或重新保存。

## 域名、base 与 CNAME

| 项目 | 当前检查结果 |
| --- | --- |
| `https://zhongyuan.fr/` | 200，服务器为 GitHub.com |
| `http://zhongyuan.fr/` | 跳转至 HTTPS，最终 200 |
| `https://www.zhongyuan.fr/` | 跳转至 `https://zhongyuan.fr/`，最终 200 |
| `https://zhongyuan5945.github.io/Portfolio/` | 跳转至 `https://zhongyuan.fr/`，最终 200 |
| 域名 NS | `ns109.ovh.net`、`dns109.ovh.net` |
| 根域名 A 记录 | `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153` |
| www CNAME | `zhongyuan5945.github.io` |
| Vite base | `/`，符合自定义域名根目录部署 |

`vite.config.ts` 已是 `base: '/'`，保持它，不改为 `/Portfolio/`。[Vite 的 GitHub Pages 部署说明](https://vite.dev/guide/static-deploy#github-pages)明确区分自定义域名与仓库子路径。

本地根目录、public 和 dist 均没有 CNAME 文件。对于目前使用的自定义 Actions 工作流，域名由 Pages 设置管理；GitHub 官方说明这类发布不会创建 CNAME 文件，已有 CNAME 文件也会被忽略，因此不需要为本次更新补建文件。[GitHub 自定义域名说明](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

OVH DNS 和现有域名绑定保持现状。

## 构建与资源验证

- `npm.cmd run check` 通过：34 个父项目、36 家店铺、43 个视频，112 张可访问主页卡片；图片集、子项目、详情链接、视频初始化、展开状态、简历下载、Contact 链接和 SPA 回退均完成静态验证。
- `npm.cmd run build` 通过；JS／CSS／Hero 图片、单独的视频详情 chunk、404 回退、简历 PDF、Logo 和各尺寸 Favicon 均已打包。
- `npm run check:media` 对 873 项资源重新检查，全部成功：829 个图片／缩略图资源、1 个视频文件、43 项 YouTube 元数据；视频文件仅检查响应头，不下载完整视频。
- 3 个 Google Fonts 样式表与其返回的 8 个字体文件均成功响应；字体是外部 HTTPS 资源，沿用现有来源。
- 已发布的入口 JS 和 CSS 返回 200。本地构建入口使用 `/assets/...`，没有 `/Portfolio/assets/...`、localhost 或 file:// 路径。
- 205 个源码相对导入的文件名大小写与实际文件一致，避免 Linux Actions runner 的路径大小写问题。
- `package-lock.json` 与 package.json 的 dependencies、devDependencies、peerDependencies 一致。本次依赖版本未变化，锁文件没有需要补交的修改。
- `git diff --check` 通过。

本地 Node 为 24.16.0；现有 Actions 使用 Node 20，保持现有版本。本次没有触发远程 CI，真正的 Ubuntu 构建与部署结果只能在获得发布授权后检查。当前没有可用浏览器，触摸、布局、实际视频播放和部署后的详情刷新仍需要浏览器复核。

## 需要提交的文件

建议提交全部已完成且验证过的修改，合计 62 个文件：19 个已跟踪修改、36 个新增代码／资源／维护脚本、7 个文档（含本报告）。不要只提交 Home.tsx：它依赖尚未跟踪的新组件、数据、样式和检查脚本。

### 已跟踪修改：19 个

```text
.github/workflows/deploy.yml
.gitignore
README.md
index.html
package.json
src/app/Root.tsx
src/app/components/figma/ImageWithFallback.tsx
src/app/data/projects.ts
src/app/data/videoReferences.ts
src/app/i18n/translations.ts
src/app/pages/About.tsx
src/app/pages/CategoryWork.tsx
src/app/pages/Contact.tsx
src/app/pages/Home.tsx
src/app/pages/PhotoSeries.tsx
src/app/pages/ProjectDetail.tsx
src/app/pages/VideoReferences.tsx
src/app/routes.tsx
src/styles/index.css
```

### 新增代码、资源与维护脚本：36 个

```text
public/404.html
public/apple-touch-icon.png
public/branding/zo-logo.png
public/cv/cv_yuan_2026.pdf
public/favicon-192x192.png
public/favicon-32x32.png
public/favicon.ico
scripts/check-media.mjs
scripts/check-portfolio.mjs
scripts/collect-editorial-images.mjs
scripts/generate-favicons.ps1
scripts/load-source.mjs
src/app/components/EditorialProjectGrid.tsx
src/app/components/ExpandableProjectGallery.tsx
src/app/components/GalleryMasonry.tsx
src/app/components/PortfolioReturnLink.tsx
src/app/components/ProjectCard.tsx
src/app/components/ProjectCarousel.tsx
src/app/components/ProjectSections.tsx
src/app/components/VideoPlayer.tsx
src/app/components/VideoProjectGrid.tsx
src/app/data/contact.ts
src/app/data/editorialImageMetadata.json
src/app/data/editorialLayout.ts
src/app/data/galleryNavigation.ts
src/app/data/homepageGallery.ts
src/app/data/media.ts
src/app/data/portfolio.ts
src/app/data/resume.ts
src/app/data/videoTitles.ts
src/app/hooks/useGalleryColumns.ts
src/app/hooks/useVideoTitle.ts
src/app/pages/VideoProjectDetail.tsx
src/styles/accessibility.css
src/styles/contact.css
src/styles/editorial.css
```

### 文档：7 个

```text
docs/about-resume.md
docs/contact-editorial.md
docs/deployment-review.md
docs/editorial-homepage.md
docs/favicon.md
docs/portfolio-maintenance.md
docs/restructure-review.md
```

文档不是页面运行依赖，建议一并提交便于日后维护。Logo 原图是生成 Favicon 的来源，public 简历是用户指定公开下载的 PDF，均属于有意加入的资产。

### 不提交

- `dist/`：构建产物由现有 Actions 构建并上传，已被 gitignore 排除。
- `node_modules/`、`.vscode/`：已被排除。
- `reports/`：媒体审计、GitHub API 响应、部署检查清单与此前临时核对数据，已被排除。
- 检查未发现待提交的 `.env`、私钥、日志文件或常见 GitHub／AWS 凭据格式；此项是限定模式扫描，不是完整安全审计。
- 没有必要重新提交未修改的 `vite.config.ts`、`package-lock.json` 或字体文件。

## 获得明确确认后执行的步骤

以下是发布方案，本次没有执行其中的 Git 写操作：

1. 复核上述清单、Pages 设置已有值及本地视觉效果，取得明确的提交与发布确认。
2. 再次只读检查远程 main，确认没有其他新提交；如果远程有变化，先处理分支同步，禁止强制推送覆盖。
3. 按上述清单明确暂存代码、静态资源和文档，检查 staged diff，确认没有 reports／dist／node_modules。
4. 创建本地提交，建议描述：`Improve portfolio homepage, project navigation and site content`。
5. 执行 `git push origin main`。**这一步会触发当前工作流并正式更新网站。**
6. 在现有 Actions 中等待 check、build、404 产物检查、artifact 上传及 deploy 全部成功。
7. 对 zhongyuan.fr 检查主页四分类、手机展开按钮、项目与店铺详情直接刷新、视频详情播放、About／Contact、简历下载、Favicon，以及浏览器前进后退。保持 Pages 自定义域名和 OVH DNS 不变。
8. 如果更新需要回退，使用本次发布提交的 revert 提交，通过同一个工作流重新发布；不使用 force push 或改变域名配置。回退同样需得到授权。

机器检查详情保存在 `reports/media-audit.json`、`reports/deployment-network.json`、`reports/deployment-static.json` 和 `reports/deployment-candidate.json`，这些文件不进入提交。
