---
updated: 2026-04-10
---

# Runtime Boundaries — 运行时边界

> 回答：请求入口有哪些、异步入口有哪些、外部系统边界有哪些。

## 请求入口（已确认事实）

### HTTP 请求入口

所有 HTTP 请求统一经过 `BaseHttpService`，再由 `httpInterceptorService` 注入 Token。

| 入口类型 | 路径 | 说明 |
|----------|------|------|
| 开发环境代理 | `/site/api → http://localhost:3001/` | `proxy.conf.json` 配置，`ng serve` 时生效 |
| 生产环境 | `https://huajian123.github.io/site/api` | `environment.prod.ts` 中 `localUrl` |
| MSW 拦截 | `public/mockServiceWorker.js` | 两个环境均启用（`mockEnabled: true`），Service Worker 拦截所有 `/site/api` 请求 |

path: `src/environments/environment.ts`, `src/environments/environment.prod.ts`, `proxy.conf.json`

### 用户交互入口

| 入口 | 触发方式 | 落点 |
|------|----------|------|
| 路由导航 | URL 变化 / 菜单点击 / Tab 切换 | `app.routes.ts` → 各页面组件 |
| 登录表单提交 | 用户输入 | `pages/login/login-form/` → `LoginService.login()` |
| 登出按钮 | 用户点击 | `LoginInOutService.loginOut()` |
| 锁屏 | 用户操作 / 超时 | `SubLockedStatusService` → `LockWidgetService` |
| 主题切换 | SettingDrawer 操作 | `ThemeService` → `ThemeSkinService` |
| 全局路由搜索 | 快捷键 / 按钮 | `widget/common-widget/search-route/` |

---

## 异步入口（已确认事实）

| 入口 | 机制 | 落点 |
|------|------|------|
| 应用初始化 | `provideAppInitializer` 链式执行 | `app.config.ts` APPINIT_PROVIDES |
| 路由预加载 | `SelectivePreloadingStrategyService` | `data.preload: true` 的路由模块 |
| 窗口 resize | `SubWindowWithService` 监听 `window.resize` | `ThemeService.$isOverModeTheme`、`$isCollapsed` |
| SessionStorage 变化 | `SubLockedStatusService` 监听 storage 事件 | 锁屏状态同步 |
| WebSocket | `feat/websocket` 演示页 | 原生 WebSocket，非全局 |
| View Transitions | `withViewTransitions()` 路由切换回调 | `ViewTransitionService.currentTransition` signal |

---

## 外部系统边界（已确认事实）

| 外部系统 | 接入方式 | 落点 |
|----------|----------|------|
| 后端 API（mock） | MSW Service Worker 拦截 | `src/mocks/handlers.ts` |
| 阿里图标 CDN | 动态插入 `<script>` | `LoadAliIconCdnService` |
| 主题 CSS 文件 | 动态插入/替换 `<link>` | `ThemeSkinService.loadTheme()` |
| 高德地图 | `@amap/amap-jsapi-loader` | `pages/feat/charts/gaode-map/` |
| 百度地图 | 外部 JS SDK | `pages/feat/charts/baidu-map/` |
| TinyMCE 富文本 | `@tinymce/tinymce-angular` | `pages/feat/rich-text/` |
| LuckySheet | 外部 CDN（非 npm） | `pages/comp/luckysheet/` |
| ECharts | `ngx-echarts` + 动态 import | `pages/feat/charts/echarts/` |
| AntV G2Plot | `@antv/g2plot` | `pages/dashboard/analysis/` |
| AntV X6 | `@antv/x6` + `@antv/x6-plugin-dnd` | `pages/page-demo/flow/` |

---

## 浏览器存储边界（已确认事实）

| 存储 | Key | 读写方 | 生命周期 |
|------|-----|--------|----------|
| sessionStorage | `Authorization` | `WindowService`, `httpInterceptorService` | 会话级，关闭标签页清除 |
| sessionStorage | `LockedKey` | `SubLockedStatusService` | 会话级 |
| localStorage | `ThemeOptionsKey` | `InitThemeService`, `ThemeService` | 持久化 |
| localStorage | `StyleThemeModelKey` | `ThemeSkinService` | 持久化 |
| localStorage | `IsFirstLogin` | 首次登录引导 | 持久化 |

path: `src/app/config/constant.ts`, `src/app/core/services/common/window.service.ts`
