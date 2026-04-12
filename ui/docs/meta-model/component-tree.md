---
updated: 2026-04-11
---

# Component Tree & Render Boundaries — 组件树与渲染边界

> 覆盖懒加载边界、OnPush 变更检测依赖、动态组件插入点、路由复用缓存边界、渲染性能边界。
> 按 skill output-contract 组件节点模板输出。

---

## 懒加载边界（已确认事实）

### 预加载策略

策略类：`SelectivePreloadingStrategyService`（`PreloadingStrategy` 实现）
规则：路由 `data.preload === true` 的模块在应用启动后立即预加载，其余模块按需加载。

| 路由 | 预加载 | 触发时机 |
|------|--------|----------|
| `/login` | ✓ 预加载 | 应用启动后立即加载 |
| `/default`（布局壳） | ✓ 预加载 | 应用启动后立即加载 |
| `dashboard` | ✓ 预加载 | 布局壳加载后立即加载 |
| `page-demo` | ✗ 按需 | 用户首次访问时加载 |
| `feat` | ✗ 按需 | 用户首次访问时加载 |
| `comp` | ✗ 按需 | 用户首次访问时加载 |
| `level` | ✗ 按需 | 用户首次访问时加载 |
| `system` | ✗ 按需 | 用户首次访问时加载 |

path: `src/app/core/services/common/selective-preloading-strategy.service.ts`, `src/app/app.routes.ts`

### 懒加载组件（loadComponent）

所有页面组件均使用 `loadComponent` 懒加载，无 NgModule 边界，每个组件独立 chunk。

---

## 路由复用缓存边界（已确认事实）

策略类：`SimpleReuseStrategy`

**缓存规则**：路由 `data.shouldDetach !== 'no'` 且有 `data.key` 时缓存组件实例。

### 不缓存的路由（shouldDetach: 'no'）

| 路由 | 原因 |
|------|------|
| `DefaultComponent`（布局壳） | 布局壳不应被缓存 |
| `refresh-empty` | Tab 刷新占位，必须每次重建 |
| `blank` / `empty-page` / `empty-for-lock` / `global-loading` | 空白布局页，不需要缓存 |
| `login` / `login-form` / `register-form` | 登录页不缓存 |
| `feat/transitions` / `feat/transitions-detail` | View Transitions 动画依赖组件重建 |

### 缓存清除时机

| 触发 | 清除范围 |
|------|----------|
| Tab 关闭 | 对应路由的缓存实例 |
| Tab 刷新 | 先跳 `refresh-empty` 清除，再重建 |
| 登出 | `SimpleReuseStrategy.deleteAllRouteSnapshot()` 清除全部 |

path: `src/app/core/services/common/reuse-strategy.ts`
grep keywords: `shouldDetach`, `retrieve`, `deleteRouteSnapshot`, `deleteAllRouteSnapshot`

---

## OnPush 组件与变更检测依赖（已确认事实）

全项目布局层组件均使用 `ChangeDetectionStrategy.OnPush`，依赖 Signal/computed 驱动更新。

### DefaultComponent

- **变更检测**：OnPush
- **消费的全局状态**：`ThemeService.$themesOptions`（computed）、`ThemeService.$isNightTheme`（computed）、`ThemeService.$isOverModeTheme`（computed）、`ThemeService.$isCollapsed`（computed）、`LockScreenStoreService.lockScreenSignalStore`（computed）
- **渲染触发**：任一 computed signal 变化时自动触发
- path: `src/app/layout/default/default.component.ts`

### NavBarComponent

- **变更检测**：OnPush
- **消费的全局状态**：`MenuStoreService.menuArray$`（BehaviorSubject，`takeUntilDestroyed` 订阅）、`SplitNavStoreService.$splitLeftNavArray`（computed）、`ThemeService.$themesOptions`（computed）、`UserInfoStoreService.$userInfo`（computed）
- **input()**：`isMixinHead`、`isMixinLeft`（控制混合模式渲染分支）
- **渲染触发**：Signal computed 变化自动触发；BehaviorSubject 订阅后手动 `markForCheck()`（高概率推断）
- **风险点**：同时消费 Signal 和 BehaviorSubject，混合模式下变更检测触发路径不统一
- path: `src/app/layout/default/nav-bar/nav-bar.component.ts`

### SideNavComponent

- **变更检测**：OnPush
- **消费的全局状态**：`ThemeService.$themesOptions`（computed）、`ThemeService.$isNightTheme`（computed）、`ThemeService.$isCollapsed`（computed）
- **渲染触发**：computed signal 变化自动触发
- path: `src/app/layout/default/side-nav/side-nav.component.ts`

### TabComponent

- **变更检测**：OnPush
- **消费的全局状态**：`TabService.getTabArray$()`（BehaviorSubject，AsyncPipe 订阅）、`ThemeService.$themesOptions`（computed）、`SplitNavStoreService.$splitLeftNavArray`（computed）
- **渲染触发**：AsyncPipe 自动触发；computed signal 变化自动触发
- **风险点**：`ChangeDetectorRef.markForCheck()` 在 `NavigationEnd` 事件后手动调用，若遗漏会导致 Tab 不更新
- path: `src/app/layout/default/tab/tab.component.ts`

### SettingDrawerComponent

- **变更检测**：OnPush
- **消费的全局状态**：`ThemeService.$themesOptions`（computed）、`ThemeService.$themeStyle`（computed）
- **渲染触发**：computed signal 变化自动触发
- path: `src/app/layout/default/setting-drawer/setting-drawer.component.ts`

### ToolBarComponent

- **变更检测**：OnPush
- **消费的全局状态**：`ThemeService.$themesOptions`（computed）
- path: `src/app/layout/default/tool-bar/tool-bar.component.ts`

### NavDrawerComponent

- **变更检测**：OnPush
- **消费的全局状态**：`ThemeService.$isOverModeTheme`（computed）
- path: `src/app/layout/default/nav-drawer/nav-drawer.component.ts`

### BlankComponent

- **变更检测**：OnPush
- **消费的全局状态**：无（纯布局壳）
- path: `src/app/layout/blank/blank.component.ts`

---

## 动态组件插入点（已确认事实）

### AdDirective — 动态组件容器

- **类型**：指令，暴露 `ViewContainerRef`
- **用途**：父组件通过 `AdDirective.viewContainerRef.createComponent(type)` 动态插入任意组件
- **使用场景**：`DynamicComponent` 数据结构配合使用，传入组件类型和数据
- **风险点**：动态插入的组件不在静态模板中，IDE 无法静态分析依赖，修改时需全局搜索使用方
- path: `src/app/shared/directives/ad.directive.ts`
- grep keywords: `AdDirective`, `viewContainerRef`, `createComponent`, `DynamicComponent`

### ViewOutletDirective — 统一视图出口

- **类型**：指令，替代 `NgComponentOutlet` 和 `NgTemplateOutlet`
- **用途**：统一处理组件和模板的动态渲染，支持 context 传递
- **实现**：内部用 `effect()` 监听 `viewOutlet` input 变化，自动 `clear()` 并重建
- **风险点**：每次 `viewOutlet` input 变化都会销毁并重建组件，有性能开销；context 更新通过 `markForCheck()` 触发
- path: `src/app/shared/directives/view-outlet.directive.ts`
- grep keywords: `ViewOutletDirective`, `viewOutlet`, `viewContainerRef.createComponent`

### ComponentPortal（ECharts 演示页）

- **类型**：CDK Portal
- **用途**：`EchartsComponent` 用 `ComponentPortal` 在三个 Tab 间切换 `StartedComponent`、`AdvancedComponent`、`SeriesComponent`
- **风险点**：Portal 切换时组件会销毁重建，图表初始化有开销
- path: `src/app/pages/feat/charts/echarts/echarts.component.ts`
- grep keywords: `ComponentPortal`, `PortalModule`, `EchartsComponent`

### LazyService — 运行时动态加载外部资源

- **类型**：服务
- **用途**：运行时动态插入外部 JS/CSS（如 LuckySheet、driver.js 等非 npm 依赖）
- **实现**：`document.createElement('script'/'link')` + Promise 包装，带缓存防重复加载
- **风险点**：外部资源加载失败时 Promise reject，调用方需处理错误；CDN 不可用会导致功能不可用
- path: `src/app/core/services/common/lazy.service.ts`
- grep keywords: `LazyService`, `loadScript`, `loadStyle`

### ThemeSkinService — 动态主题 CSS

- **类型**：服务
- **用途**：运行时动态插入/替换主题 CSS `<link>` 标签
- **实现**：`document.createElement('link')` + `document.head.append()`，切换时移除旧主题 class 和 link
- **风险点**：CSS 文件路径硬编码为 `${theme}.css`，构建产物路径变更会导致静默失败
- path: `src/app/core/services/common/theme-skin.service.ts`
- grep keywords: `ThemeSkinService`, `loadCss`, `removeUnusedTheme`

---

## 渲染性能边界（已确认事实 / 高概率推断）

### AntTableComponent — 封装表格

- **变更检测**：OnPush
- **性能机制**：`trackBy` 函数（高概率推断，待验证）；分页由父组件控制，不做前端全量渲染
- **风险点**：大数据量时若无虚拟滚动，DOM 节点数量线性增长
- path: `src/app/shared/components/ant-table/ant-table.component.ts`
- grep keywords: `ant-table`, `trackBy`, `nz-table`

### ECharts 图表

- **性能机制**：`echarts` 动态 import（首次加载异步，后续缓存）；CDK Portal 切换时组件销毁重建
- **风险点**：首次加载 echarts 包体积较大（约 1MB+）；图表 resize 监听需手动销毁
- path: `src/app/pages/feat/charts/echarts/`
- grep keywords: `ngx-echarts`, `echarts`, `ComponentPortal`

### AntV X6 流程图

- **性能机制**：`@antv/x6` 使用 Canvas/SVG 渲染，不依赖 Angular 变更检测
- **风险点**：大型流程图节点数量多时 Canvas 渲染性能下降；组件销毁时需手动调用 `graph.dispose()`
- path: `src/app/pages/page-demo/flow/flow-chat/flow-chat.component.ts`
- grep keywords: `@antv/x6`, `Graph`, `dispose`

### TabComponent — 多页签

- **性能机制**：`trackBy` 函数（已确认，grep 结果显示有 trackBy）；Tab 数量无上限（待验证）
- **风险点**：Tab 数量过多时，`SimpleReuseStrategy` 缓存的组件实例占用内存线性增长
- path: `src/app/layout/default/tab/tab.component.ts`
- grep keywords: `TabComponent`, `trackBy`, `tabsSourceData`

---

## blank 布局路由（已确认事实）

blank 布局用于不需要主布局壳的页面，所有路由均设 `shouldDetach: 'no'`：

| 路由 | 组件 | 用途 |
|------|------|------|
| `blank` | `BlankComponent` | 空白布局容器 |
| `blank/empty-page` | `EmptyPageComponent` | 空白占位页 |
| `blank/empty-for-lock` | `EmptyForLockComponent` | 锁屏时的空白遮罩 |
| `blank/global-loading` | `GlobalLoadingComponent` | 全局 Loading 页 |

path: `src/app/layout/blank/blank-routing.ts`
