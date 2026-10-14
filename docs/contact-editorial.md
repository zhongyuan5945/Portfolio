# Contact 页面 Editorial 排版

联系方式沿用现有页面：邮箱、法国电话、Instagram、LinkedIn、Neuilly-sur-Seine 地址、自由职业可合作说明与 SIRET 信息。

## 排版与交互

- 白色背景和黑灰文字，使用网站已有字体、1600px 内容宽度、编号、细线、留白和相同的网格间距。
- 顶部使用 18px 的邮件图标；邮箱、电话、社交和地址的分区编号继续保留。
- 页首显示 Contact 大标题与原合作介绍；邮箱作为主要入口。
- 桌面从 1024px 起使用四列基础网格，邮箱占三列、电话占一列，社交和地址各占两列。
- 640–1023px 使用两列基础网格，邮箱和电话分别占满一行；社交和地址并列。
- 小于 640px 时四个信息区按邮箱、电话、社交、地址依次堆叠。邮箱字号随屏幕变化，并允许长地址换行。
- 邮箱和电话使用原 `mailto:`／`tel:` 地址；社交链接维持新标签页和 `noopener noreferrer`。
- 箭头始终可见，悬停显示下划线和 250ms 的轻微箭头移动；键盘焦点清晰，链接最小触摸高度为 48px。
- 启用减少动态效果时禁用箭头位移。样式全部限定在 `.contact-page`，主页画廊和全局字体继续使用原样式。

## 数据与维护

`src/app/data/contact.ts` 集中保存邮箱、电话号码、地址、SIRET 和社交链接。更新联系方式时修改数据，不需要调整 JSX 布局。标题、说明、所在地与辅助标签使用现有法／英／中文翻译机制。

关于页面补全 DSAA 的名称：法语 Diplôme Supérieur des Arts Appliqués、英语 Higher Diploma in Applied Arts、中文“应用艺术高级文凭”，同时保留缩写。工具列表包含 Clip Studio Paint，三种语言同时更新。

## 修改文件

| 文件 | 内容 |
| --- | --- |
| `src/app/pages/Contact.tsx` | Editorial 信息层级、语义分区与链接 |
| `src/app/data/contact.ts` | 原联系方式集中管理 |
| `src/styles/contact.css` | 页面作用域、响应式网格与链接交互 |
| `src/app/pages/About.tsx` | DSAA 全称和 Clip Studio Paint |
| `src/app/i18n/translations.ts` | 三语学历介绍与 Contact 辅助标签 |
| `scripts/check-portfolio.mjs` | 学历、工具、原联系信息、链接及标题结构检查 |
| 本文件、`docs/about-resume.md` | 布局和维护说明 |

运行 `npm run check` 与 `npm run build`；Windows 下可使用 `npm.cmd`。当前环境没有可用浏览器，构建与静态渲染不代替 320／390／800／1024／1440px 下的实际换行、间距和交互复核；邮箱／电话应用唤起和社交页打开需要本地浏览器确认。

未提交、推送或部署。
