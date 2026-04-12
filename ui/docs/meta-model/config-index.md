---
updated: 2026-04-10
---

# Config Index — 配置索引

> 回答：哪些配置会改写运行时行为、配置来源和优先级、哪些配置是需求和 Bug 的热点。

## 配置来源优先级（已确认事实）

```
代码常量（constant.ts / actionCode.ts）
  ↓ 覆盖
环境文件（environment.ts / environment.prod.ts）
  ↓ 覆盖
localStorage（主题配置，持久化）
  ↓ 覆盖
sessionStorage（Token、锁屏状态，会话级）
  ↓ 运行时
Signal / BehaviorSubject（内存状态，页面刷新后重置）
```

---

## 代码常量（已确认事实）

path: `src/app/config/constant.ts`

| 常量 | 值 | 用途 | 风险 |
|------|----|------|------|
| `TokenPre` | `'Bearer '` | Token 前缀，注入请求头 | 修改需同步后端 |
| `TokenKey` | `'Authorization'` | sessionStorage key + 请求头 key | 修改需同步拦截器和守卫 |
| `ThemeOptionsKey` | `'ThemeOptionsKey'` | localStorage 主题配置 key | 修改导致旧用户配置丢失 |
| `StyleThemeModelKey` | `'StyleThemeModelKey'` | localStorage 主题风格 key | 同上 |
| `IsFirstLogin` | `'IsFirstLogin'` | 首次登录引导标记 | — |
| `LockedKey` | `'LockedKey'` | 锁屏状态 key | — |
| `salt` | `'EIpWsyfiy@R@X#qn17!...'` | 密码加盐（前端） | 安全敏感，不应提交到公开仓库 |
| `loginTimeOutCode` | `1012` | 登录超时响应码 | 需与后端约定一致 |
| `tokenErrorCode` | `1010` | Token 错误响应码 | 需与后端约定一致 |
| `SideCollapsedMaxWidth` | `700` | 左侧菜单变 over 模式的最大宽度（px） | 修改需同步 Less 变量 `@left-nav-width` |
| `TopCollapsedMaxWidth` | `1247` | 顶部菜单变 over 模式的最大宽度（px） | — |
| `SideNavWidth` | `208` | 左侧菜单宽度（px） | 修改需同步 Less 变量 `@left-nav-width` |
| `CollapsedNavWidth` | `48` | 收缩状态菜单宽度（px） | 修改需同步 Less 变量 `@collapsed-nav-width` |

---

## 权限码配置（已确认事实）

path: `src/app/config/actionCode.ts`

| 常量 | 值 | 用途 |
|------|----|------|
| `ActionCode.TabsDetail` | `'default:feat:tabs:example-detail'` | Tab 演示详情页权限（硬编码，todo 标注） |
| `ActionCode.SearchTableDetail` | `'default:page-demo:search-table:example-detail'` | 查询表格详情权限（硬编码，todo 标注） |
| `ActionCode.AccountAdd/Edit/Del` | `'default:system:account:...'` | 账号管理按钮权限 |
| `ActionCode.RoleManagerAdd/Edit/Del/SetRole` | `'default:system:role-manager:...'` | 角色管理按钮权限 |
| `ActionCode.MenuAdd/Edit/Del/AddLowLevel` | `'default:system:menu:...'` | 菜单管理按钮权限 |
| `ActionCode.DeptAdd/Edit/Del/AddLowLevel` | `'default:system:dept:...'` | 部门管理按钮权限 |

---

## 环境配置（已确认事实）

path: `src/environments/environment.ts`（开发），`src/environments/environment.prod.ts`（生产）

| 配置项 | 开发值 | 生产值 | 用途 |
|--------|--------|--------|------|
| `environment.production` | `false` | `true` | 控制 baseUrl 选择 |
| `environment.mockEnabled` | `true` | `true` | 两个环境均启用 MSW mock |
| `localUrl`（开发） | `http://localhost:3001` | — | 开发时代理目标 |
| `localUrl`（生产） | — | `https://huajian123.github.io/site/api` | 生产 API 地址 |

**注意**：生产环境 `mockEnabled: true`，意味着生产部署也使用 MSW mock，这是演示项目的设计，实际业务项目需改为 `false`。

---

## 路由配置（已确认事实）

path: `src/app/app.config.ts`

| 配置 | 值 | 用途 |
|------|----|------|
| `withHashLocation()` | 启用 | URL 使用 `#` 路由，兼容静态部署 |
| `withComponentInputBinding()` | 启用 | 路由参数直接绑定到 `input()` |
| `withViewTransitions()` | 启用，`skipInitialTransition: true` | 路由切换动画 |
| `withInMemoryScrolling()` | `scrollPositionRestoration: 'top'` | 路由切换后滚动到顶部 |
| `withPreloading(SelectivePreloadingStrategyService)` | 启用 | 按 `data.preload: true` 选择性预加载 |

---

## 主题默认配置（已确认事实）

path: `src/app/core/services/store/common-store/theme.service.ts`

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `theme` | `'dark'` | 默认暗黑模式 |
| `color` | `'#1890FF'` | 默认主题色 |
| `mode` | `'side'` | 默认侧边菜单模式 |
| `isShowTab` | `true` | 默认展示多页签 |
| `fixedHead` | `true` | 固定头部 |
| `fixedTab` | `true` | 固定 Tab |
| `hasTopArea` | `true` | 展示顶部区域 |
| `hasFooterArea` | `true` | 展示底部区域 |
| `hasNavArea` | `true` | 展示菜单 |
| `hasNavHeadArea` | `true` | 菜单头 |

---

## 代理配置（已确认事实）

path: `proxy.conf.json`

```json
"/site/api" → "http://localhost:3001/"
```

开发时 `ng serve` 自动使用，生产构建不生效。

---

## 构建配置（已确认事实）

path: `angular.json`

| 配置 | 值 | 说明 |
|------|----|------|
| `build.baseHref` | `/ng-antd-admin/` | GitHub Pages 部署路径 |
| `serve.port` | `4201` | 开发服务器端口 |
| `budgets.maximumWarning` | — | 构建体积预算（待查） |

---

## 风险配置热点

1. **`salt` 常量**：前端明文存储加盐值，安全风险，不应提交到公开仓库
2. **生产 `mockEnabled: true`**：生产环境仍使用 mock，实际项目需关闭
3. **`SideNavWidth` / `CollapsedNavWidth`**：修改需同步 Less 变量，否则布局错位
4. **`loginTimeOutCode` / `tokenErrorCode`**：需与后端严格约定，不一致会导致错误处理失效
