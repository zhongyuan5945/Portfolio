# 网站图标

使用用户提供的 `zo logo_画板 1.png`。原图为 4267 × 4267，保存在 `public/branding/zo-logo.png`；图标只进行等比例缩放，保留灰色图形、白色背景和原有留白。

| 文件 | 尺寸 | 用途 |
| --- | --- | --- |
| `public/favicon.ico` | 16、32、48 | 浏览器图标及常用 ICO 入口 |
| `public/favicon-32x32.png` | 32 × 32 | 标签页 PNG 图标 |
| `public/favicon-192x192.png` | 192 × 192 | 高分辨率图标 |
| `public/apple-touch-icon.png` | 180 × 180 | Apple 主屏幕图标 |

`index.html` 为整个 React 网站声明图标，路径使用 Vite 的 `%BASE_URL%`，详情页刷新也使用相同资源。浏览器无需下载原始大图。未增加网站运行依赖。

图标由 Windows 自带的 System.Drawing 生成。更换 Logo 后，可在仓库根目录运行：

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/generate-favicons.ps1 -SourcePath "新 Logo 的完整路径.png"
```

该命令更新存档原图和四个图标文件；不改变图形配色或重新绘制 Logo。省略 `-SourcePath` 时使用存档原图重新生成。执行策略参数只作用于本次子进程，不修改系统设置。

运行现有 `npm run check` 和 `npm run build`。核对输出图标的尺寸、ICO 目录和构建文件，并人工检查浏览器标签页及移动端主屏幕图标；浏览器可能需要刷新图标缓存。
