---
updated: 2026-04-10
---

# Flow Index — 核心流程索引

> 按 skill output-contract 流程模板输出：结论级别、业务目标、触发方式、入口位置、主调用链、关键分支、状态变更点、持久化点、外部调用点、配置影响点、适合插入变更的位置、索引。

---

## 1. 登录流程

- **结论级别**：事实
- **业务目标**：验证用户身份，建立会话，加载用户权限和菜单，跳转主页
- **触发方式**：用户提交登录表单
- **入口位置**：`pages/login/login-form/` → `LoginService.login()`

**主调用链**：
```
LoginFormComponent.submit()
  → LoginService.login({ userName, password })     POST /auth/signin
  → 返回 JWT token
  → LoginInOutService.loginIn(token)
    → WindowService.setSessionStorage(TokenKey, 'Bearer ' + token)
    → UserInfoStoreService.parsToken(token)         JWT 解码 → { userId, userName }
    → AccountService.getAccountAuthCode(userId)     GET /user/auth-code/:id
    → userInfo.authCode = [...codes, TabsDetail, SearchTableDetail]  ← 硬编码注入
    → UserInfoStoreService.$userInfo.set(userInfo)
    → LoginService.getMenuByUserAuthCode(authCode)  POST /auth/menu
    → fnFlatDataHasParentToTree(menus)              扁平 → 树形
    → MenuStoreService.setMenuArrayStore(tree)
  → Router.navigate('/default/dashboard')
```

**关键分支**：
- token 解码失败 → `userId=-1, userName=''`，后续权限码为空，菜单为空
- `getAccountAuthCode` 失败 → `finalize` 仍 resolve，但 authCode 为空
- `getMenuByUserAuthCode` 返回空数组 → 菜单为空，侧边栏无内容

**状态变更点**：
- `SessionStorage[Authorization]` 写入
- `UserInfoStoreService.$userInfo` signal 写入
- `MenuStoreService.menuArray$` BehaviorSubject 写入

**持久化点**：SessionStorage（Token）

**外部调用点**：
- `POST /auth/signin`（mock: `mocks/business/login.ts`）
- `GET /user/auth-code/:id`（mock: `mocks/business/permission.ts`）
- `POST /auth/menu`（mock: `mocks/business/menu.ts`）

**配置影响点**：
- `TokenKey`, `TokenPre`（`config/constant.ts`）
- `ActionCode.TabsDetail`, `ActionCode.SearchTableDetail`（硬编码注入，todo 标注）

**适合插入变更的位置**：
- 新增权限码注入 → `LoginInOutService.loginIn()` 的 `authCode.push()` 处
- 修改 token 存储方式 → `WindowService.setSessionStorage()` 调用处
- 新增登录后初始化逻辑 → `loginIn()` 的 `switchMap` 链末尾

**索引**：
- path: `src/app/core/services/common/login-in-out.service.ts`
- symbol: `LoginInOutService.loginIn`, `LoginService.login`, `MenuStoreService.setMenuArrayStore`
- grep keywords: `loginIn`, `getMenuByUserAuthCode`, `fnFlatDataHasParentToTree`, `setMenuArrayStore`

---

## 2. 应用启动流程

- **结论级别**：事实
- **业务目标**：应用加载时恢复登录态、主题、锁屏状态，完成初始化后激活路由
- **触发方式**：浏览器加载页面（首次或刷新）
- **入口位置**：`app.config.ts` → `APPINIT_PROVIDES`（`provideAppInitializer` 链）

**主调用链**：
```
Angular bootstrap
  → APPINIT_PROVIDES 顺序执行（任一抛出异常则后续不执行）：
    1. StartupService.load()
       → WindowService.getSessionStorage(TokenKey)
       → 有 token → LoginInOutService.loginIn(token)   （走登录流程恢复状态）
       → 无 token → resolve()
    2. LoadAliIconCdnService.load()
       → 动态插入 <script src="阿里图标CDN">
    3. SubLockedStatusService.initLockedStatus()
       → 监听 storage 事件，同步锁屏状态
    4. InitThemeService.initTheme()
       → 读 localStorage[ThemeOptionsKey] → ThemeService.$themesOptions.set()
       → 读 localStorage[StyleThemeModelKey] → ThemeService.$themeStyle.set()
    5. SubWindowWithService.subWindowWidth()
       → 监听 window.resize → 更新 ThemeService.$isOverModeTheme / $isCollapsed
    6. ThemeSkinService.loadTheme()
       → 动态插入/替换 <link rel="stylesheet"> 指向主题 CSS
  → 路由激活 → DefaultComponent 渲染
```

**关键分支**：
- `StartupService.load()` 中 token 存在但已过期 → `loginIn()` 内 HTTP 请求失败 → 菜单/权限为空，但不跳转登录（守卫在路由激活时才检查）
- 任一 initializer 抛出未捕获异常 → 应用卡白屏

**状态变更点**：
- `UserInfoStoreService.$userInfo`（若有 token）
- `MenuStoreService.menuArray$`（若有 token）
- `ThemeService.$themesOptions`、`$themeStyle`
- `ThemeService.$isOverModeTheme`、`$isCollapsed`

**持久化点**：读取 localStorage（不写入）

**外部调用点**：阿里图标 CDN（网络请求）、主题 CSS 文件（本地静态资源）

**配置影响点**：
- `ThemeOptionsKey`, `StyleThemeModelKey`（`config/constant.ts`）
- `SideCollapsedMaxWidth=700`, `TopCollapsedMaxWidth=1247`（窗口宽度阈值）

**适合插入变更的位置**：
- 新增启动初始化逻辑 → `APPINIT_PROVIDES` 数组末尾追加 `provideAppInitializer`
- 修改主题恢复逻辑 → `InitThemeService.initTheme()`

**索引**：
- path: `src/app/app.config.ts`, `src/app/core/startup/startup.service.ts`
- symbol: `StartupService.load`, `InitThemeService.initTheme`, `ThemeSkinService.loadTheme`
- grep keywords: `provideAppInitializer`, `APPINIT_PROVIDES`, `StartupService`, `initTheme`

---

## 3. HTTP 请求流程

- **结论级别**：事实
- **业务目标**：统一封装 HTTP 请求，处理 Token 注入、Loading、错误提示、响应解包
- **触发方式**：业务 Service 调用 `BaseHttpService.get/post/put/delete()`
- **入口位置**：`core/services/http/base-http.service.ts`

**主调用链**：
```
业务 Service.get/post/put/delete(path, param, config?)
  → BaseHttpService.getUrl()          拼接 baseUrl（dev: /site/api，prod: localUrl）
  → BaseHttpService.handleLoading()   config.showLoading=true → NzMessage.loading()（最少 500ms）
  → HttpClient.request()
  → httpInterceptorService            注入 Authorization: Bearer <token>
  → MSW Service Worker 拦截           返回 mock 数据
  → filter(e => e.type !== 0)         过滤上传进度事件
  → resultHandle()
    → handleFilter()
      → code 非 200/201 → NzMessage.error(msg)
      → needSuccessInfo=true → NzMessage.success('操作成功')
    → map(item => item.data)           解包 data 字段
  → finalize(closeLoading())          关闭 Loading（含 500ms 最小展示保证）
```

**关键分支**：
- `config.otherUrl=true` → 不拼 baseUrl，直接用 path 作为完整 URL
- HTTP 状态码非 2xx → `handleError()` 返回 `{ code: status, message: errMsg }`
- `code=1012` → 登录超时，应由业务层处理（当前 mock 不触发，实际项目需在 `handleFilter` 中处理）

**状态变更点**：无（纯数据流，不写入全局状态）

**持久化点**：无（数据由调用方决定如何存储）

**外部调用点**：MSW Service Worker（开发/生产均启用）、真实后端（生产环境 `localUrl`）

**配置影响点**：
- `environment.production`（决定 baseUrl）
- `TokenKey`（请求头 key）
- `loginTimeOutCode=1012`, `tokenErrorCode=1010`

**适合插入变更的位置**：
- 新增全局错误处理（如 1012 自动弹登录弹窗）→ `BaseHttpService.handleFilter()` 或 `httpInterceptorService`
- 修改 Loading 最小展示时长 → `BaseHttpService.handleLoading()` 中 `minDuration=500`
- 新增请求重试逻辑 → `resultHandle()` 的 pipe 链中插入 `retry()`

**索引**：
- path: `src/app/core/services/http/base-http.service.ts`, `src/app/core/services/interceptors/http-interceptor.ts`
- symbol: `BaseHttpService`, `resultHandle`, `handleFilter`, `handleLoading`, `httpInterceptorService`
- grep keywords: `BaseHttpService`, `resultHandle`, `handleFilter`, `httpInterceptorService`

---

## 4. 路由守卫与权限控制流程

- **结论级别**：事实
- **业务目标**：拦截未登录访问，控制按钮级权限
- **触发方式**：路由跳转（守卫）、组件渲染（按钮权限指令）
- **入口位置**：`core/services/common/guard/judgeLogin.guard.ts`、`shared/directives/auth.directive.ts`

**主调用链（路由守卫）**：
```
Router.navigate(url)
  → JudgeLoginGuard.canActivateChild()
  → WindowService.getSessionStorage(TokenKey)
  → 有 token → return true（放行）
  → 无 token → return router.parseUrl('/login')（重定向）
```

**主调用链（按钮权限）**：
```
组件模板渲染 <button [auth]="'ActionCode.xxx'">
  → AuthDirective.ngOnInit()
  → UserInfoStoreService.$userInfo().authCode.includes(code)
  → 有权限 → 保留 DOM
  → 无权限 → ViewContainerRef.clear()（移除 DOM 元素）
```

**关键分支**：
- 路由 `data.authCode` 字段 → 路由级权限（如 `set-role`、`example-detail`），守卫读取并校验
- `menuType='F'` 的 Menu 项 → 仅用于权限码，不渲染菜单

**状态变更点**：无

**持久化点**：无

**外部调用点**：无

**配置影响点**：`ActionCode`（`config/actionCode.ts`）、`TokenKey`（`config/constant.ts`）

**适合插入变更的位置**：
- 新增路由级权限校验 → `JudgeLoginGuard` 中增加 authCode 检查
- 修改按钮权限逻辑 → `AuthDirective.ngOnInit()`

**索引**：
- path: `src/app/core/services/common/guard/judgeLogin.guard.ts`, `src/app/shared/directives/auth.directive.ts`
- symbol: `JudgeLoginGuard`, `AuthDirective`
- config: `ActionCode`（`src/app/config/actionCode.ts`）
- grep keywords: `JudgeLoginGuard`, `AuthDirective`, `authCode`, `canActivateChild`

---

## 5. 路由复用 / Tab 多页签流程

- **结论级别**：事实
- **业务目标**：实现多页签浏览，缓存已访问页面组件实例，支持 Tab 切换/关闭/刷新
- **触发方式**：路由激活、Tab 操作（切换/关闭/刷新）
- **入口位置**：`core/services/common/reuse-strategy.ts`、`layout/default/tab/tab.component.ts`

**主调用链**：
```
路由激活
  → SimpleReuseStrategy.shouldDetach(route)
    → route.data.shouldDetach === 'no' → false（不缓存：refresh-empty、transitions 等）
    → 其他 → true（缓存）
  → SimpleReuseStrategy.store(route, handle)   缓存组件实例
  → TabService.addTab(route)                   添加 Tab 项

Tab 点击切换
  → Router.navigate(tab.path)
  → SimpleReuseStrategy.shouldAttach(route)    → true
  → SimpleReuseStrategy.retrieve(route)        → 返回缓存实例（不重新创建组件）

Tab 关闭
  → SimpleReuseStrategy.deleteRouteSnapshot(key)
  → TabService.removeTab(tab)
  → Router.navigate(相邻 tab)

Tab 刷新
  → Router.navigate('/refresh-empty')          先跳占位页（清除缓存）
  → Router.navigate(原路由)                    重新创建组件
```

**关键分支**：
- `route.data.key` 未设置 → 路由复用 key 为 undefined，可能导致缓存混乱
- `shouldDetach: 'no'` → 不缓存，每次进入重新创建（transitions、refresh-empty）
- Tab 数量上限 → 当前无限制（高概率推断，未验证）

**状态变更点**：`TabService` 内部 Tab 数组（内存）、`SimpleReuseStrategy` 缓存 Map（内存）

**持久化点**：无（刷新页面后 Tab 和缓存全部丢失）

**外部调用点**：无

**配置影响点**：路由 `data.key`（Tab 唯一标识）、`data.shouldDetach`（是否缓存）

**适合插入变更的位置**：
- 修改缓存策略 → `SimpleReuseStrategy.shouldDetach()`
- 新增 Tab 右键菜单功能 → `TabComponent` 模板
- 实现 Tab 持久化（刷新后恢复）→ `TabService` + `SimpleReuseStrategy`，需配合 SessionStorage

**索引**：
- path: `src/app/core/services/common/reuse-strategy.ts`, `src/app/core/services/common/tab.service.ts`, `src/app/layout/default/tab/tab.component.ts`
- symbol: `SimpleReuseStrategy`, `TabService`, `TabComponent`
- grep keywords: `shouldDetach`, `retrieve`, `deleteRouteSnapshot`, `refresh-empty`, `TabService`

---

## 6. 主题切换流程

- **结论级别**：事实
- **业务目标**：运行时切换应用皮肤（4套）和布局配置，持久化到 localStorage
- **触发方式**：用户在 SettingDrawer 操作
- **入口位置**：`layout/default/setting-drawer/setting-drawer.component.ts`

**主调用链**：
```
用户选择主题风格（default/dark/aliyun/compact）
  → ThemeService.$themeStyle.set(style)
  → themeStyleChangeEffect（effect）
    → $isNightTheme.set(style === 'dark')
    → $isCompactTheme.set(style === 'compact')
  → ThemeSkinService.loadTheme()
    → 查找/创建 <link id="theme-style"> 标签
    → 替换 href 为对应 CSS 文件路径
    → localStorage.set(StyleThemeModelKey, style)

用户修改布局选项（mode/color/fixedHead 等）
  → ThemeService.$themesOptions.update(options)
  → effect 持久化 → localStorage.set(ThemeOptionsKey, JSON.stringify(options))
  → 布局组件响应 signal 变化，重新渲染
```

**关键分支**：
- CSS 文件路径不存在 → `<link>` href 替换成功但 CSS 加载 404，静默失败（无报错）
- `mode='mix'` + `splitNav=true` → 顶部显示一级菜单，侧边显示二级菜单（特殊布局逻辑）

**状态变更点**：
- `ThemeService.$themeStyle`
- `ThemeService.$isNightTheme`、`$isCompactTheme`
- `ThemeService.$themesOptions`

**持久化点**：`localStorage[StyleThemeModelKey]`、`localStorage[ThemeOptionsKey]`

**外部调用点**：主题 CSS 静态文件（本地）

**配置影响点**：`StyleThemeModelKey`, `ThemeOptionsKey`（`config/constant.ts`）

**适合插入变更的位置**：
- 新增主题风格 → `StyleTheme` 类型定义 + `ThemeSkinService.loadTheme()` 中的 CSS 路径映射
- 新增布局配置项 → `SettingInterface` 接口 + `SettingDrawerComponent` 模板

**索引**：
- path: `src/app/core/services/store/common-store/theme.service.ts`, `src/app/core/services/common/theme-skin.service.ts`, `src/app/layout/default/setting-drawer/setting-drawer.component.ts`
- symbol: `ThemeService.$themeStyle`, `ThemeSkinService.loadTheme`, `SettingDrawerComponent`
- config: `StyleThemeModelKey`, `ThemeOptionsKey`
- grep keywords: `$themeStyle`, `loadTheme`, `StyleThemeModelKey`, `ThemeOptionsKey`

---

## 7. 登出流程

- **结论级别**：事实
- **业务目标**：清除会话状态，清理 Tab 缓存，跳转登录页
- **触发方式**：用户点击登出按钮（NavBar 或用户菜单）
- **入口位置**：`LoginInOutService.loginOut()`

**主调用链**：
```
用户点击登出
  → LoginInOutService.loginOut()
    → LoginService.loginOut()                    POST /auth/signout（通知后端，mock）
    → Router.navigate('/login/login-form')
    → clearTabCash()
      → SimpleReuseStrategy.deleteAllRouteSnapshot(activatedRoute.snapshot)
      → TabService.clearTabs()
    → clearSessionCash()
      → WindowService.removeSessionStorage(TokenKey)
      → MenuStoreService.setMenuArrayStore([])
```

**关键分支**：
- `Router.navigate()` 失败 → `clearTabCash` 和 `clearSessionCash` 不执行（Promise 链断裂）
- `deleteAllRouteSnapshot` 异步 → 需等待完成后再清 Tab，顺序由 Promise 链保证

**状态变更点**：
- `SessionStorage[TokenKey]` 删除
- `MenuStoreService.menuArray$` 清空
- `SimpleReuseStrategy` 缓存 Map 清空
- `TabService` Tab 数组清空

**持久化点**：SessionStorage（删除 Token）

**外部调用点**：`POST /auth/signout`（mock: `mocks/business/login.ts`）

**配置影响点**：`TokenKey`（`config/constant.ts`）

**适合插入变更的位置**：
- 登出后清除更多状态 → `clearSessionCash()` 中追加清理逻辑
- 登出前确认弹窗 → 在 `loginOut()` 调用前插入 NzModal.confirm()

**索引**：
- path: `src/app/core/services/common/login-in-out.service.ts`
- symbol: `LoginInOutService.loginOut`, `clearTabCash`, `clearSessionCash`
- grep keywords: `loginOut`, `clearTabCash`, `clearSessionCash`, `deleteAllRouteSnapshot`
