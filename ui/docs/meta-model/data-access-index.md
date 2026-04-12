---
updated: 2026-04-10
---

# Data Access Index — 数据访问索引

> 回答：数据存储有哪些、哪些模块拥有它们、读写边界在哪里。

## 数据存储总览（已确认事实）

| 存储类型 | 用途 | 归属服务 |
|----------|------|----------|
| sessionStorage | Token、锁屏状态 | `WindowService` |
| localStorage | 主题配置、首次登录标记 | `InitThemeService`、`ThemeSkinService` |
| 内存 Signal | 用户信息、主题状态、窗口宽度 | `UserInfoStoreService`、`ThemeService` |
| 内存 BehaviorSubject | 菜单数组 | `MenuStoreService` |
| 内存 Signal（组件级） | 各页面本地状态 | 各组件 |
| HTTP（MSW mock） | 业务数据（用户/菜单/角色/部门） | 各 HTTP Service |

---

## sessionStorage 读写边界（已确认事实）

path: `src/app/core/services/common/window.service.ts`

| Key | 写入方 | 读取方 | 删除方 |
|-----|--------|--------|--------|
| `Authorization`（TokenKey） | `LoginInOutService.loginIn()` | `StartupService.load()`、`httpInterceptorService`、`JudgeLoginGuard` | `LoginInOutService.clearSessionCash()` |
| `LockedKey` | 锁屏触发逻辑 | `SubLockedStatusService` | 解锁逻辑 |

---

## localStorage 读写边界（已确认事实）

| Key | 写入方 | 读取方 | 说明 |
|-----|--------|--------|------|
| `ThemeOptionsKey` | `ThemeService`（effect 持久化） | `InitThemeService.initTheme()` | 主题布局配置（mode/color/fixedHead 等） |
| `StyleThemeModelKey` | `ThemeSkinService.loadTheme()` | `InitThemeService.initTheme()` | 主题风格（default/dark/aliyun/compact） |
| `IsFirstLogin` | 首次登录引导逻辑 | 引导页逻辑 | 控制 driver.js 引导是否展示 |

---

## 内存状态读写边界（已确认事实）

### Signal Store

| Signal | 所在服务 | 写入方 | 读取方 |
|--------|----------|--------|--------|
| `$userInfo` | `UserInfoStoreService` | `LoginInOutService.loginIn()` | `AuthDirective`、各需要用户信息的组件 |
| `$isNightTheme` | `ThemeService` | `themeStyleChangeEffect`（computed from `$themeStyle`） | 布局组件、主题相关组件 |
| `$isCompactTheme` | `ThemeService` | 同上 | 同上 |
| `$isOverModeTheme` | `ThemeService` | `SubWindowWithService`（resize 监听） | 布局组件 |
| `$isCollapsed` | `ThemeService` | 菜单收缩按钮、resize 监听 | `SideNavComponent`、`NavBarComponent` |
| `$themesOptions` | `ThemeService` | `SettingDrawerComponent` | 布局各区域显示控制 |
| `$themeStyle` | `ThemeService` | `SettingDrawerComponent` | `ThemeSkinService`（触发 CSS 切换） |
| `currentTransition` | `ViewTransitionService` | `withViewTransitions` 回调 | 过渡动画相关组件 |

### BehaviorSubject Store

| Subject | 所在服务 | 写入方 | 读取方 |
|---------|----------|--------|--------|
| `menuArray$` | `MenuStoreService` | `LoginInOutService.loginIn()`（登录后）、`clearSessionCash()`（登出后清空） | `SideNavComponent`、`NavBarComponent`（订阅菜单渲染） |

---

## HTTP 数据流（已确认事实）

所有 HTTP 数据流经 `BaseHttpService`，响应结构统一为 `ActionResult<T>`。

### 读取路径

```
组件 → HTTP Service.get/post() → BaseHttpService → HttpClient
  → httpInterceptorService（注入 Token）
  → MSW Service Worker（mock 拦截）
  → resultHandle()（解包 data 字段）
  → 组件 signal/变量
```

### 写入路径

```
组件表单提交 → HTTP Service.post/put/delete()
  → BaseHttpService（可选 Loading、可选成功提示）
  → MSW mock 返回
  → 组件更新本地状态 / 刷新列表
```

### 分页数据流

```
组件 nz-table 分页变化
  → SearchCommonVO<T>{ pageIndex, pageSize, filters }
  → HTTP Service.post('/xxx/list', param)
  → PageInfo<T>{ total, list }
  → 组件更新表格数据
```

---

## 路由复用缓存（已确认事实）

path: `src/app/core/services/common/reuse-strategy.ts`

| 缓存对象 | 存储位置 | 写入时机 | 清除时机 |
|----------|----------|----------|----------|
| 路由组件实例 | `SimpleReuseStrategy` 内存 Map | 路由离开时（`shouldDetach` 返回 true） | Tab 关闭、Tab 刷新、登出 |

不缓存条件：`route.data.shouldDetach === 'no'`（如 `refresh-empty`、`transitions` 相关路由）

---

## 滚动位置缓存（已确认事实）

path: `src/app/core/services/common/scroll.service.ts`

- 路由 `data.scrollContain` 字段指定需要缓存滚动位置的容器选择器
- 示例：`feat/scroll/keep-scroll-page` 路由配置了 `scrollContain: ['#div-scroll1', '#div-scroll2']`
- 路由离开时保存滚动位置，返回时恢复

grep: `scrollContain`, `ScrollService`
