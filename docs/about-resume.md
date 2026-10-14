# À propos 与简历下载

依据用户提供的 `cv_yuan_2026.pdf` 补充关于页面，沿用已有字体、背景和布局。原教育、语言、介绍和技能继续保留。

## 补充内容

- 新增 Sylvain Chomet’s Picture Box（巴黎）的动画助理经历，时间为 07/2026。
- Bonprint (CX Design) 的结束时间统一为 05/2026，三种语言共用同一日期。
- 根据简历分为 Freelance、Stages、Volontariat，共 5 项自由职业、4 项实习、2 项志愿经历；原有 10 项经历全部保留。
- 技能增加 Toon Boom Harmony。
- 工具列表增加 Clip Studio Paint，并在三种语言中显示相同的软件名称。
- 教育与个人介绍中的 DSAA 全称按语言显示：法语 Diplôme Supérieur des Arts Appliqués，英语 Higher Diploma in Applied Arts，中文“应用艺术高级文凭”。保留 DSAA 缩写、平面设计和多媒体叙事的专业说明。
- 页面标题旁提供 Télécharger le CV / Download CV / 下载简历，明确标注为法语 PDF。按钮使用同域链接和原生 `download` 属性，支持键盘焦点和移动端触摸。

经历仅包含原简历的职位、单位、地点与时间，没有补写未经提供的职责或成果。已有的杭州余杭地点信息继续保留。

## 维护

`src/app/data/resume.ts` 集中管理职业经历、分组、法／英／中文内容及下载文件路径。修改或增加经历时更新该数据文件；分组和下载按钮翻译位于 `src/app/i18n/translations.ts`。

原 PDF 逐字节复制到 `public/cv/cv_yuan_2026.pdf`，没有重新生成、压缩或修改。Vite 构建会将它原样复制到 `dist/cv/cv_yuan_2026.pdf`，网站地址为 `/cv/cv_yuan_2026.pdf`。更新简历时替换该文件，继续使用稳定文件名；如果更换文件名，同时更新 `resumeDownload` 的路径和下载文件名。当前站点部署在域名根目录，与现有 `base: '/'` 配置一致。

## 修改文件

| 文件 | 改动 |
| --- | --- |
| `src/app/pages/About.tsx` | 下载按钮、经历分组、动画技能 |
| `src/app/data/resume.ts` | 共用日期、三语经历和下载配置 |
| `src/app/i18n/translations.ts` | 经历分组与下载按钮翻译 |
| `public/cv/cv_yuan_2026.pdf` | 用户提供的原版简历 |
| `scripts/check-portfolio.mjs` | 经历完整性、日期、翻译和 PDF 下载检查 |
| 本文件 | 更新与验证说明 |

运行 `npm run check` 和 `npm run build`；Windows 下可使用 `npm.cmd`。核对原文件、public 文件和构建输出的 SHA-256，确认下载内容完全一致。当前没有可用浏览器，页面实际排版、语言切换、手机触摸和浏览器下载保存对话框需要人工复核。

未提交、推送或部署。
