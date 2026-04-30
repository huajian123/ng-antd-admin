---
name: flow-index
description: ng-antd-admin 关键流程索引，含登录、路由守卫、HTTP请求、Tab管理、主题切换、路由复用等核心链路
type: project
---

# 关键流程索引

## 1. 应用启动流程

```
main.ts → bootstrapApplication(AppComponent, appConfig)
  ↓
appConfig.providers 中 APPINIT_PROVIDES 按顺序执行：
  1. StartupService.load()
     ├─ 读 SessionStorage['Authorization']
     ├─ 有 token → LoginInOutService.loginIn(token) → 恢复用户状态
     └─ 无 token → resolve()（等待用户登录）
  2. LoadAliIconCdnService.load()     → 加载阿里图标 CDN
  3. SubLockedStatusService.initLockedStatus() → 订阅锁屏状态
  4. InitThemeService.initTheme()     → 从 localStorage 恢复主题设置
  5. SubWindowWithService.subWindowWidth() → 监听窗口宽度变化
  6. ThemeSkinService.loadTheme()     → 动态加载主题 CSS bundle
  7. InitLangService.initLang()       → 初始化 i18n 语言
  ↓
路由激活 → AppComponent 渲染
  ↓
默认重定向 '' → '/login/login-form'
  ↓
若 token 存在（StartupService 已恢复状态）→ 守卫放行 → '/default/dashboard'
```

**关键文件**：`src/app/app.config.ts`、`src/app/core/startup/startup.service.ts`

---

## 2. 登录流程

```
/login/login-form → LoginFormComponent
  ↓
用户填写 userName + password → 提交
  ↓
LoginService.login({ userName, password })
  POST /auth/signin
  ↓
返回 JWT token 字符串
  ↓
LoginInOutService.loginIn(token)
  ├─ SessionStorage.set('Authorization', 'Bearer ' + token)
  ├─ JwtHelperService.decodeToken(token) → { userName, sub(userId) }
  ├─ AccountService.getAccountAuthCode(userId)
  │     GET /user/auth-code/{id} → string[]
  ├─ 追加静态权限码（TabsDetail、SearchTableDetail）
  ├─ UserInfoStoreService.$userInfo.set(userInfo)
  ├─ LoginService.getMenuByUserAuthCode(authCode)
  │     POST /auth/menu → Menu[]（后端按权限码过滤）
  ├─ 过滤 menuType === 'C'
  ├─ fnFlatDataHasParentToTree(menus) → 树形菜单
  └─ MenuStoreService.setMenuArrayStore(menus)
  ↓
Router.navigate(['/default/dashboard'])
```

---

## 3. 登出流程

```
用户点击登出（LayoutHeadRightMenuComponent 或其他入口）
  ↓
LoginInOutService.loginOut()
  ├─ LoginService.loginOut() POST /auth/signout（fire-and-forget）
  ├─ Router.navigate(['/login/login-form'])
  ├─ SimpleReuseStrategy.deleteAllRouteSnapshot() → 清除所有路由缓存
  ├─ TabService.clearTabs() → 清空 Tab 数组
  ├─ SessionStorage.remove('Authorization')
  └─ MenuStoreService.setMenuArrayStore([])
```

---

## 4. HTTP 请求流程

```
业务组件调用 XxxService.method()
  ↓
BaseHttpService.get/post/put/delete(path, params, config)
  ├─ 构造 URL：environment.production ? localUrl : '/site/api' + path
  ├─ config.showLoading → NzMessageService.loading()（最少展示 500ms）
  ↓
HttpClient 发出请求
  ↓
httpInterceptorService（函数式拦截器）
  ├─ 读 SessionStorage['Authorization']
  ├─ 若有 token → 注入请求头 Authorization: Bearer <token>
  ├─ filter(e => e.type !== 0)（过滤进度事件）
  └─ catchError → handleError（按状态码生成中文错误信息）
  ↓
响应回到 BaseHttpService.resultHandle()
  ├─ filter → handleFilter：code !== 200/201 → message.error(msg)
  │                          needSuccessInfo → message.success('操作成功')
  └─ map → 若 code !== 200/201 → throw Error(msg)，否则返回 data
  ↓
finalize → closeLoading()（关闭 Loading）
  ↓
业务组件 subscribe 拿到 data
```

**关键文件**：`core/services/http/base-http.service.ts`、`core/services/interceptors/http-interceptor.ts`

---

## 5. 路由守卫流程

```
用户访问 /default/** 路由
  ↓
canActivateChild: [JudgeLoginGuard]（若已挂载）
  ├─ WindowService.getSessionStorage('Authorization')
  ├─ 有 token → return true → 放行
  └─ 无 token → Router.parseUrl('/login') → 跳转登录页

用户访问需要权限的路由
  ↓
canActivate: [JudgeAuthGuard]
  ├─ UserInfoStoreService.$userInfo().authCode
  ├─ 包含 route.data.code → return true
  └─ 不包含 → 跳转 403 页面
```

**注意（推断）**：`default-routing.ts` 中 `canActivateChild: []` 当前为空，守卫可能在具体子路由或组件内部实现。

---

## 6. 多页签（Tab）管理流程

### 6.1 新增 Tab

```
路由激活 → NavBarComponent 或 TabComponent 监听路由变化
  ↓
TabService.addTab({ title, path, snapshotArray })
  ├─ 若 title === 'refresh-empty' → 跳过
  ├─ 若已存在同 title 的 tab（非新详情页）→ 更新 snapshotArray 和 path
  └─ 若不存在同 path 的 tab → push 新 tab
```

### 6.2 关闭 Tab

```
用户点击 Tab 上的 × 按钮
  ↓
TabService.delTab(tab, index)
  ├─ 从 $tabArray 移除该 tab
  ├─ SimpleReuseStrategy.deleteRouteSnapshot(key) → 销毁组件缓存
  └─ Router.navigateByUrl(相邻 tab 的 path)
```

### 6.3 刷新 Tab

```
TabService.refresh()
  ↓
Router.navigateByUrl('/default/refresh-empty', { skipLocationChange: true })
  ↓
SimpleReuseStrategy.deleteRouteSnapshot(key) → 清除当前路由缓存
  ↓
Router.navigate([currentRoute], { queryParams }) → 重新进入路由
```

---

## 7. 路由复用（RouteReuseStrategy）流程

```
路由离开时：
  SimpleReuseStrategy.shouldDetach(route)
    ├─ route.data.shouldDetach === 'no' → false（不缓存）
    ├─ !isShowTab → false（无 Tab 时不缓存）
    └─ 其他 → true（缓存）
      ├─ 记录滚动位置到 scrollHandlers[key]
      └─ store(route, handle) → handlers[key] = handle

路由进入时：
  SimpleReuseStrategy.shouldAttach(route)
    └─ handlers[key] 存在 → true → retrieve(route) 返回缓存 handle
  
  SimpleReuseStrategy.shouldReuseRoute(future, curr)
    └─ futureKey === currKey → true（同路由复用）
      └─ 恢复滚动位置
```

**关键文件**：`core/services/common/reuse-strategy.ts`、`core/services/common/tab.service.ts`

---

## 8. 主题切换流程

```
用户在 SettingDrawerComponent 中选择主题
  ↓
ThemeService.$themesOptions.set(newOptions) 或 $themeStyle.set(newStyle)
  ↓
ThemeSkinService.loadTheme()
  ├─ 动态创建 <link> 标签
  ├─ href = '/assets/default.css' | '/assets/dark.css' | '/assets/aliyun.css' | '/assets/compact.css'
  └─ 移除旧主题 <link>
  ↓
DefaultComponent 中 effect() 监听 $themesOptions 变化
  └─ 更新布局相关状态（mode/fixedHead/isShowTab 等）
```

**关键文件**：`core/services/common/theme-skin.service.ts`、`core/services/store/common-store/theme.service.ts`

---

## 9. 弹窗（Modal）打开流程

```
业务组件调用 ModalWrapService.show(XxxModalComponent, options, params)
  ↓
createModalConfig() → 构造 NzModalOptions
  ├─ nzContent: XxxModalComponent
  ├─ nzFooter: [确认按钮, 取消按钮]（绑定 confirmCallback/cancelCallback）
  ├─ nzData: params（传入组件实例）
  └─ nzWrapClassName: 随机 UUID 类名（用于拖拽定位）
  ↓
NzModalService.create(options) → 打开弹窗
  ↓
afterOpen → createDrag(wrapCls) → 绑定拖拽
  ↓
用户点击确认 → confirmCallback()
  ├─ XxxModalComponent.getCurrentValue() → 获取表单值
  └─ modalRef.destroy({ status: ModalBtnStatus.Ok, modalValue })
  ↓
afterClose → Observable<ModalResponse> 返回给调用方
```

---

## 10. 抽屉（Drawer）打开流程

```
业务组件调用 DrawerWrapService.show(XxxDrawerComponent, options, params)
  ↓
createDrawerConfig() → 构造 NzDrawerOptions
  ├─ nzContent: XxxDrawerComponent
  ├─ nzFooter: GlobalDrawerFootTplComponent 的按钮模板
  └─ nzContentParams: { params }
  ↓
NzDrawerService.create(options) → 打开抽屉
  ↓
用户点击确认 → sure()
  ├─ drawerRef.getContentComponent().getCurrentValue()
  └─ drawerRef.close({ status: ModalBtnStatus.Ok, modalValue })
  ↓
afterClose → Observable<NzSafeAny> 返回给调用方
```

---

## 11. 窗口宽度响应流程

```
SubWindowWithService.subWindowWidth()（应用启动时初始化）
  ↓
监听 window resize 事件
  ↓
WindowsWidthService.$windowWidth.set(width)
  ↓
ThemeService.$isOverModeTheme.set(width < SideCollapsedMaxWidth)
  ↓
DefaultComponent 中 isOverMode computed() 响应
  └─ 侧边栏变为抽屉模式（NavDrawerComponent）
```

**常量**：`SideCollapsedMaxWidth = 700`、`TopCollapsedMaxWidth = 1253`

---

## 12. 系统管理 CRUD 流程（以账号管理为例）

```
AccountComponent 初始化
  ↓
AccountService.getAccount({ pageIndex, pageSize, filters })
  POST /user/list → PageInfo<User>
  ↓
AntTableComponent 渲染列表

用户点击"新增"
  ↓
ModalWrapService.show(AccountModalComponent, options, { nzTitle: '新增' })
  ↓
用户填写表单 → 点击确认
  ↓
AccountModalComponent.getCurrentValue() → 返回 User 表单值
  ↓
AccountService.addAccount(user) POST /user/create
  ↓
成功 → message.success('操作成功') → 刷新列表

用户点击"编辑"
  ↓
AccountService.getAccountDetail(id) GET /user/{id}
  ↓
ModalWrapService.show(AccountModalComponent, options, { nzTitle: '编辑', id })
  ↓
AccountService.editAccount(user) PUT /user/update

用户点击"删除"
  ↓
NzModalService.confirm() → 二次确认
  ↓
AccountService.delAccount([id]) POST /user/del/
```

**同类流程**：DeptComponent、MenuComponent、RoleManagerComponent 遵循相同模式。
