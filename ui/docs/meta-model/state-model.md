---
updated: 2026-04-10
---

# State Model — 状态模型

> 前端 SPA 的"持久化层"替代文档。覆盖全局 Signal/BehaviorSubject、computed/effect 依赖链、浏览器持久化边界、HTTP 数据落点。
> 按 skill output-contract 全局状态节点模板输出。

---

## 状态总览

| 状态名 | 类别 | 所在服务 | 持久化 |
|--------|------|----------|--------|
| `$userInfo` | 全局 Signal | `UserInfoStoreService` | 否（会话内存） |
| `$themesOptions` | 全局 Signal | `ThemeService` | localStorage |
| `$themeStyle` | 全局 Signal | `ThemeService` | localStorage |
| `$isNightTheme` | 全局 Signal（computed） | `ThemeService` | 否 |
| `$isCompactTheme` | 全局 Signal（computed） | `ThemeService` | 否 |
| `$isOverModeTheme` | 全局 Signal | `ThemeService` | 否 |
| `$isCollapsed` | 全局 Signal | `ThemeService` | 否 |
| `menuArray$` | 全局 BehaviorSubject | `MenuStoreService` | 否 |
| `$windowWidth` | 全局 Signal | `WindowsWidthService` | 否 |
| `$splitLeftNavArray` | 全局 Signal | `SplitNavStoreService` | 否 |
| `lockScreenSignalStore` | 全局 Signal | `LockScreenStoreService` | sessionStorage |
| `$modalFullStatusStore` | 全局 Signal | `ModalFullStatusStoreService` | 否 |
| `$globalSpinStore` | 全局 Signal | `SpinService` | 否 |
| `$loginTypeStore` | 业务 Signal | `Login1StoreService` | 否 |
| `isLogin1OverModelSignalStore` | 业务 Signal | `Login1StoreService` | 否 |
| `$searchListComponentStore` | 业务 Signal | `SearchListStoreService` | 否 |

---

## $userInfo — 用户信息

- **类别**：全局 Signal
- **结论级别**：事实
- **业务含义**：当前登录用户的身份与权限，是按钮级权限控制的数据源
- **初始值**：`{ userId: -1, userName: '', authCode: [] }`
- **写入方**：`LoginInOutService.loginIn()` — 登录成功后写入；登出时不主动清空（依赖 Token 失效）
- **读取方**：`AuthDirective`（按钮权限）、`UserInfoStoreService.getUserAuthCodeByUserId()`、各需要用户名的组件
- **computed / effect 依赖**：无 computed；`AuthDirective` 在 `ngOnInit` 时读取一次（非响应式，待验证）
- **持久化**：否（内存 Signal，刷新后由 `StartupService` 从 Token 重建）
- **清除时机**：不主动清除；刷新页面后若无 Token 则保持初始值
- **风险点**：`authCode` 在 `LoginInOutService` 中硬编码注入了 `TabsDetail` 和 `SearchTableDetail`，实际项目需改为后端管理
- **索引**：
  - path: `src/app/core/services/store/common-store/userInfo-store.service.ts`
  - symbol: `UserInfoStoreService.$userInfo`
  - grep keywords: `$userInfo`, `authCode`, `parsToken`

---

## $themesOptions — 主题布局配置

- **类别**：全局 Signal
- **结论级别**：事实
- **业务含义**：控制整个应用的布局开关（菜单模式、固定头部、是否展示 Tab 等），用户可在 SettingDrawer 修改
- **初始值**：`{ theme: 'dark', color: '#1890FF', mode: 'side', isShowTab: true, fixedHead: true, ... }`
- **写入方**：`InitThemeService.initTheme()`（启动时从 localStorage 恢复）；`SettingDrawerComponent`（用户操作）
- **读取方**：`layout/default/` 各布局组件（NavBar、SideNav、Tab、ToolBar）；`SubWindowWithService`（读取 mode 判断 over 模式阈值）
- **computed / effect 依赖**：`ThemeService` 内有 `themeStyleChangeEffect`，监听 `$themeStyle` 变化联动 `$isNightTheme`/`$isCompactTheme`；`SubWindowWithService` 用 `toObservable($themesOptions)` 监听 mode 变化
- **持久化**：`localStorage[ThemeOptionsKey]`，由 `InitThemeService` 写入和读取
- **清除时机**：不清除，持久化
- **风险点**：`mode='mixin'` 时 `splitNav` 字段联动 `SplitNavStoreService.$splitLeftNavArray`，逻辑较复杂
- **索引**：
  - path: `src/app/core/services/store/common-store/theme.service.ts`
  - symbol: `ThemeService.$themesOptions`
  - config: `ThemeOptionsKey`（`src/app/config/constant.ts`）
  - grep keywords: `$themesOptions`, `ThemeOptionsKey`, `SettingInterface`

---

## $themeStyle — 主题风格

- **类别**：全局 Signal
- **结论级别**：事实
- **业务含义**：当前激活的皮肤风格（default/dark/aliyun/compact），驱动 CSS 文件动态切换
- **初始值**：`'default'`（由 `InitThemeService` 从 localStorage 覆盖）
- **写入方**：`InitThemeService.initTheme()`（启动恢复）；`SettingDrawerComponent`（用户切换）
- **读取方**：`ThemeSkinService`（通过 `computed(() => this.themesService.$themeStyle())` 消费）；`themeStyleChangeEffect`
- **computed / effect 依赖**：
  - `themeStyleChangeEffect`（effect）：`$themeStyle` 变化 → 联动写入 `$isNightTheme`、`$isCompactTheme`
  - `ThemeSkinService.$currentStyleTheme`（computed）：派生当前主题值，供 `loadTheme()` 使用
- **持久化**：`localStorage[StyleThemeModelKey]`
- **清除时机**：不清除
- **风险点**：CSS 文件路径与主题名强绑定（`${theme}.css`），文件名变更会导致主题切换静默失败
- **索引**：
  - path: `src/app/core/services/store/common-store/theme.service.ts`, `src/app/core/services/common/theme-skin.service.ts`
  - symbol: `ThemeService.$themeStyle`, `ThemeSkinService.$currentStyleTheme`
  - config: `StyleThemeModelKey`
  - grep keywords: `$themeStyle`, `StyleThemeModelKey`, `loadTheme`, `toggleTheme`

---

## $isNightTheme / $isCompactTheme — 主题派生状态

- **类别**：全局 Signal（effect 联动写入，非 computed）
- **结论级别**：事实
- **业务含义**：`$themeStyle` 的派生布尔值，供布局组件快速判断当前是否为暗黑/紧凑模式
- **初始值**：`false`
- **写入方**：`themeStyleChangeEffect`（监听 `$themeStyle` 变化自动写入）
- **读取方**：布局组件（NavBar、SideNav 等）用于条件样式
- **computed / effect 依赖**：由 `themeStyleChangeEffect` 驱动，源头是 `$themeStyle`
- **持久化**：否
- **清除时机**：随 `$themeStyle` 变化自动更新
- **风险点**：使用 effect 而非 computed 实现派生，若 effect 执行时机有延迟可能出现短暂不一致
- **索引**：
  - path: `src/app/core/services/store/common-store/theme.service.ts`
  - symbol: `ThemeService.$isNightTheme`, `ThemeService.$isCompactTheme`, `themeStyleChangeEffect`
  - grep keywords: `$isNightTheme`, `$isCompactTheme`, `themeStyleChangeEffect`

---

## $isOverModeTheme / $isCollapsed — 菜单折叠状态

- **类别**：全局 Signal
- **结论级别**：事实
- **业务含义**：`$isOverModeTheme` 表示当前窗口宽度是否触发 over 模式（菜单浮层覆盖）；`$isCollapsed` 表示菜单是否收缩为图标模式
- **初始值**：`false`
- **写入方**：`SubWindowWithService`（监听 `BreakpointObserver`，窗口 resize 时写入）；NavBar 折叠按钮（用户手动切换 `$isCollapsed`）
- **读取方**：`SideNavComponent`、`NavBarComponent`、`NavDrawerComponent`
- **computed / effect 依赖**：`SubWindowWithService` 用 `toObservable($themesOptions)` 监听 mode 变化，动态调整 over 模式阈值（side 模式用 700px，top/mix 模式用 1247px）
- **持久化**：否
- **清除时机**：随窗口 resize 自动更新
- **风险点**：`SideCollapsedMaxWidth=700` 和 `TopCollapsedMaxWidth=1247` 是硬编码常量，修改需同步 Less 变量
- **索引**：
  - path: `src/app/core/services/store/common-store/theme.service.ts`, `src/app/core/services/common/sub-window-with.service.ts`
  - symbol: `ThemeService.$isOverModeTheme`, `ThemeService.$isCollapsed`, `SubWindowWithService`
  - config: `SideCollapsedMaxWidth=700`, `TopCollapsedMaxWidth=1247`
  - grep keywords: `$isOverModeTheme`, `$isCollapsed`, `SubWindowWithService`, `BreakpointObserver`

---

## menuArray$ — 菜单数组

- **类别**：全局 BehaviorSubject
- **结论级别**：事实
- **业务含义**：当前用户有权访问的菜单树，驱动侧边栏和顶部导航渲染
- **初始值**：`[]`
- **写入方**：`LoginInOutService.loginIn()`（登录后写入树形菜单）；`LoginInOutService.clearSessionCash()`（登出后清空）
- **读取方**：`SideNavComponent`、`NavBarComponent`（订阅 Observable）；`SearchRouteService`（路由搜索）
- **computed / effect 依赖**：`SplitNavStoreService.$splitLeftNavArray` 在混合模式下由菜单数据派生（高概率推断，待验证）
- **持久化**：否（内存 BehaviorSubject，刷新后由 `StartupService` 重建）
- **清除时机**：登出时 `setMenuArrayStore([])`
- **风险点**：使用 BehaviorSubject 而非 Signal，与其他 store 风格不一致；订阅方需手动管理生命周期（`takeUntilDestroyed`）
- **索引**：
  - path: `src/app/core/services/store/common-store/menu-store.service.ts`
  - symbol: `MenuStoreService.menuArray$`, `setMenuArrayStore`, `getMenuArrayStore`
  - grep keywords: `MenuStoreService`, `setMenuArrayStore`, `getMenuArrayStore`

---

## $windowWidth — 窗口宽度断点

- **类别**：全局 Signal
- **结论级别**：事实
- **业务含义**：当前窗口宽度对应的栅格断点（xs/sm/md/lg/xl/xxl），供响应式布局组件使用
- **初始值**：`EquipmentWidth.xxl`
- **写入方**：`SubWindowWithService.subWindowWidth()`（启动时初始化 + BreakpointObserver 监听）
- **读取方**：响应式布局组件（`ScreenLessHiddenDirective` 等）
- **computed / effect 依赖**：无
- **持久化**：否
- **清除时机**：随窗口 resize 自动更新
- **风险点**：无
- **索引**：
  - path: `src/app/core/services/store/common-store/windows-width.service.ts`
  - symbol: `WindowsWidthService.$windowWidth`, `EquipmentWidth`
  - grep keywords: `$windowWidth`, `EquipmentWidth`, `WindowsWidthService`

---

## $splitLeftNavArray — 混合模式左侧菜单

- **类别**：全局 Signal
- **结论级别**：事实
- **业务含义**：混合菜单模式（mix）下，左侧显示的二级菜单数组，由顶部一级菜单点击触发更新
- **初始值**：`[]`
- **写入方**：混合模式下 NavBar 一级菜单点击时写入（高概率推断，待验证具体写入位置）
- **读取方**：`SideNavComponent`（混合模式下渲染左侧菜单）
- **computed / effect 依赖**：无
- **持久化**：否
- **清除时机**：登出或菜单切换时
- **风险点**：待验证写入方的具体位置
- **索引**：
  - path: `src/app/core/services/store/common-store/split-nav-store.service.ts`
  - symbol: `SplitNavStoreService.$splitLeftNavArray`
  - grep keywords: `$splitLeftNavArray`, `SplitNavStoreService`

---

## lockScreenSignalStore — 锁屏状态

- **类别**：全局 Signal
- **结论级别**：事实
- **业务含义**：记录锁屏状态（是否锁定、密码、锁屏前路径），驱动锁屏遮罩显示
- **初始值**：`{ locked: false, password: '', beforeLockPath: '' }`
- **写入方**：`SubLockedStatusService.initLockedStatus()`（启动时从 sessionStorage 恢复）；锁屏/解锁操作
- **读取方**：`LockScreenComponent`（显示/隐藏遮罩）；`LockWidgetService`（解锁验证）
- **computed / effect 依赖**：无
- **持久化**：`sessionStorage[LockedKey]`，加密存储（`fnEncrypt/fnDecrypt` + `salt`）
- **清除时机**：解锁成功后重置；登出时随 sessionStorage 清除
- **风险点**：`salt` 常量明文存储在代码中（`config/constant.ts`），安全风险
- **索引**：
  - path: `src/app/core/services/store/common-store/lock-screen-store.service.ts`, `src/app/core/services/common/sub-locked-status.service.ts`
  - symbol: `LockScreenStoreService.lockScreenSignalStore`, `SubLockedStatusService.initLockedStatus`
  - config: `LockedKey`, `salt`（`src/app/config/constant.ts`）
  - grep keywords: `lockScreenSignalStore`, `LockedKey`, `fnEncrypt`, `fnDecrypt`

---

## $modalFullStatusStore — Modal 全屏状态

- **类别**：全局 Signal
- **结论级别**：事实
- **业务含义**：记录当前是否有 Modal 处于全屏状态，保证同一时间只有一个全屏 Modal
- **初始值**：`false`
- **写入方**：Modal 全屏切换操作
- **读取方**：Modal 全屏按钮组件
- **computed / effect 依赖**：无
- **持久化**：否
- **清除时机**：Modal 关闭时重置为 false
- **风险点**：无
- **索引**：
  - path: `src/app/core/services/store/common-store/modal-full-status-store.service.ts`
  - symbol: `ModalFullStatusStoreService.$modalFullStatusStore`
  - grep keywords: `$modalFullStatusStore`, `ModalFullStatusStoreService`

---

## $globalSpinStore — 全局 Loading

- **类别**：全局 Signal
- **结论级别**：事实
- **业务含义**：控制全局 Spin（Loading 遮罩）的显示/隐藏
- **初始值**：`false`
- **写入方**：`SpinService`（业务代码手动调用）
- **读取方**：`GlobalLoadingComponent` 或根组件（高概率推断）
- **computed / effect 依赖**：无
- **持久化**：否
- **清除时机**：操作完成后手动设为 false
- **风险点**：与 `BaseHttpService.handleLoading()` 的 NzMessage Loading 是两套机制，注意不要混用
- **索引**：
  - path: `src/app/core/services/store/common-store/spin.service.ts`
  - symbol: `SpinService.$globalSpinStore`
  - grep keywords: `$globalSpinStore`, `SpinService`

---

## $loginTypeStore / isLogin1OverModelSignalStore — 第三方登录状态

- **类别**：业务 Signal
- **结论级别**：事实
- **业务含义**：`$loginTypeStore` 记录第三方登录页当前选中的登录类型；`isLogin1OverModelSignalStore` 记录 login1 是否以 over 模式（弹窗）展示
- **初始值**：`LoginType.Normal` / `false`
- **写入方**：`pages/other-login/login1/` 组件
- **读取方**：`pages/other-login/login1/` 组件
- **持久化**：否
- **清除时机**：页面离开时（组件销毁）
- **风险点**：无
- **索引**：
  - path: `src/app/core/services/store/biz-store-service/other-login/login1-store.service.ts`
  - symbol: `Login1StoreService.$loginTypeStore`, `Login1StoreService.isLogin1OverModelSignalStore`
  - grep keywords: `Login1StoreService`, `$loginTypeStore`

---

## $searchListComponentStore — 搜索列表 Tab 状态

- **类别**：业务 Signal
- **结论级别**：事实
- **业务含义**：记录搜索列表页当前激活的 Tab（文章/项目/应用），跨子组件共享
- **初始值**：`'搜索列表（文章）'`
- **写入方**：`pages/page-demo/list/search-list/` Tab 切换
- **读取方**：`SearchListComponent` 及其子组件
- **持久化**：否
- **清除时机**：路由离开时（若路由复用则保留）
- **风险点**：无
- **索引**：
  - path: `src/app/core/services/store/biz-store-service/search-list/search-list-store.service.ts`
  - symbol: `SearchListStoreService.$searchListComponentStore`
  - grep keywords: `SearchListStoreService`, `$searchListComponentStore`

---

## 浏览器持久化边界汇总

| Key | 存储类型 | 写入方 | 读取方 | 清除时机 | 加密 |
|-----|----------|--------|--------|----------|------|
| `Authorization` | sessionStorage | `LoginInOutService.loginIn()` | `StartupService`, `httpInterceptorService`, `JudgeLoginGuard` | 登出 | 否 |
| `LockedKey` | sessionStorage | `SubLockedStatusService` | `SubLockedStatusService` | 登出 | 是（AES + salt） |
| `ThemeOptionsKey` | localStorage | `InitThemeService` | `InitThemeService` | 不清除 | 否 |
| `StyleThemeModelKey` | localStorage | `ThemeSkinService` | `InitThemeService` | 不清除 | 否 |
| `IsFirstLogin` | localStorage | 引导页逻辑 | 引导页逻辑 | 不清除 | 否 |

path: `src/app/config/constant.ts`（所有 key 定义）

---

## HTTP 数据落点汇总

| 接口 | 响应数据落点 | 持久化 |
|------|-------------|--------|
| `POST /auth/signin` | token → `SessionStorage[Authorization]` | sessionStorage |
| `GET /user/auth-code/:id` | `UserInfoStoreService.$userInfo.authCode` | 否 |
| `POST /auth/menu` | `MenuStoreService.menuArray$` | 否 |
| `POST /user/list` 等列表接口 | 组件本地 signal（`pageInfo`） | 否 |
| `GET /user/:id` 等详情接口 | 组件本地 signal | 否 |
