---
updated: 2026-04-10
---

# Project Overview

## 基本信息（已确认事实）

| 项 | 值 |
|----|----|
| 项目名 | ng-antd-admin |
| Angular 版本 | 21.2.x |
| UI 库 | ng-zorro-antd 21.2.0 |
| 语言 | TypeScript ~5.9.2 |
| 样式 | Less 4.x |
| 构建工具 | @angular/build 21.2.x（esbuild） |
| 包管理 | npm |
| 测试框架 | Karma + Jasmine |
| Mock 方案 | MSW 2.x（Service Worker） |
| 部署目标 | GitHub Pages（`ng deploy`，base-href=/ng-antd-admin/） |

## 架构类型

**模块化单体 SPA**，无真实后端，所有接口由 MSW 在浏览器端拦截并返回 mock 数据。

## 关键技术决策（已确认事实）

- **Zoneless**：`provideZonelessChangeDetection()`，不依赖 Zone.js
- **Standalone Components**：全项目无 NgModule（除少数第三方兼容层）
- **Hash 路由**：`withHashLocation()`，URL 形如 `/#/default/dashboard`
- **路由复用**：`SimpleReuseStrategy`，配合 Tab 多页签实现页面缓存
- **View Transitions**：`withViewTransitions()`，路由切换动画（Angular 17+）
- **组件输入绑定**：`withComponentInputBinding()`，路由参数直接绑定到 `input()`
- **预加载策略**：`SelectivePreloadingStrategyService`，按 `data.preload: true` 选择性预加载

## 启动流程（已确认事实）

```
浏览器加载
  → app.config.ts APPINIT_PROVIDES 依次执行
    1. StartupService.load()        — 读 SessionStorage Token，有则调 loginIn()
    2. LoadAliIconCdnService.load() — 加载阿里图标 CDN
    3. SubLockedStatusService       — 初始化锁屏监听
    4. InitThemeService             — 初始化主题（读 localStorage）
    5. SubWindowWithService         — 监听窗口宽度变化
    6. ThemeSkinService.loadTheme() — 加载主题 CSS（dark/default/aliyun/compact）
  → 路由激活 → DefaultComponent（布局壳）
```

path: `src/app/app.config.ts`, `src/app/core/startup/startup.service.ts`

## 目录结构（已确认事实）

```
src/app/
├── app.config.ts          — 全局 providers，启动配置
├── app.routes.ts          — 顶层路由（4条）
├── app.ts                 — 根组件
├── config/                — 常量（TokenKey、ThemeOptionsKey 等）
├── core/
│   ├── services/
│   │   ├── common/        — 通用服务（guard、tab、reuse-strategy、主题、锁屏等）
│   │   ├── http/          — HTTP 服务（BaseHttpService + 业务 service）
│   │   ├── interceptors/  — HTTP 拦截器（注入 Token、错误处理）
│   │   ├── store/
│   │   │   ├── common-store/     — 全局 signal/BehaviorSubject store
│   │   │   └── biz-store-service/ — 业务 store（待扫描）
│   │   └── types.ts       — 通用接口（Menu、PageInfo、SearchCommonVO 等）
│   └── startup/           — StartupService
├── layout/
│   ├── blank/             — 空白布局（登录页用）
│   └── default/           — 主布局壳（NavBar、SideNav、Tab、SettingDrawer、ToolBar）
├── pages/                 — 业务页面（见 module-index.md）
├── shared/
│   ├── biz-components/    — 业务共享组件（待扫描）
│   ├── components/        — 通用 UI 组件（AntTable、PageHeader、LockScreen 等）
│   ├── directives/        — 指令（auth、debounceClick、keepAlive 等）
│   └── pipes/             — 管道（html、map、numberLoop 等）
├── tpl/                   — 模板（待扫描）
├── utils/                 — 工具函数
└── widget/                — 小部件（待扫描）
```

## 环境配置（已确认事实）

- 开发：`ng serve --port 4201`，代理到 `/site/api`（`proxy.conf.json`）
- 生产：`environment.production = true`，使用 `localUrl`
- Mock：MSW Service Worker，`public/mockServiceWorker.js`

## 主题系统（已确认事实）

4 套皮肤：`default` / `dark` / `aliyun` / `compact`

- 运行时动态切换，通过 `ThemeSkinService` 动态插入/替换 `<link>` 标签
- 组件样式用 Less，禁止直接用 CSS 变量或 Less 变量，需要主题感知时用 `.themeMixin({})`
- 主题配置持久化到 `localStorage`（key: `ThemeOptionsKey`、`StyleThemeModelKey`）

path: `src/app/core/services/common/theme-skin.service.ts`, `src/app/core/services/store/common-store/theme.service.ts`
