---
updated: 2026-04-10
---

# Functional Inventory — 功能清单

> 按 skill output-contract 功能清单模板输出：类型、结论级别、所属模块、用户入口、前端落点、后端入口、核心实现、外部依赖、典型变更、风险点、索引（含 grep keywords）。

---

## 账号密码登录

- **类型**：平台功能
- **结论级别**：事实
- **所属模块**：pages/login
- **用户入口**：`/login/login-form`
- **前端落点**：`pages/login/login-form/`
- **后端入口**：`POST /auth/signin`
- **核心实现**：`LoginService.login()` → `LoginInOutService.loginIn()`
- **外部依赖**：`@auth0/angular-jwt`（JWT 解码）
- **典型变更**：新增记住密码、修改密码加密方式、新增验证码
- **风险点**：`loginIn()` 链路长，任一步骤失败会导致登录后白屏或菜单空白
- **索引**：
  - path: `src/app/pages/login/login-form/`, `src/app/core/services/common/login-in-out.service.ts`
  - symbol: `LoginService.login`, `LoginInOutService.loginIn`
  - grep keywords: `login`, `loginIn`, `LoginService`, `/auth/signin`

---

## 注册

- **类型**：平台功能
- **结论级别**：事实
- **所属模块**：pages/login
- **用户入口**：`/login/register-form`
- **前端落点**：`pages/login/register-form/`
- **后端入口**：待验证（mock 中未见 register 接口）
- **核心实现**：`pages/login/register-form/` 组件
- **外部依赖**：—
- **典型变更**：新增注册字段、接入邮箱验证
- **风险点**：mock 中无对应接口，实际接入后端时需补充
- **索引**：
  - path: `src/app/pages/login/register-form/`
  - grep keywords: `register-form`, `register`

---

## 登出

- **类型**：平台功能
- **结论级别**：事实
- **所属模块**：core/services（layout/default 触发）
- **用户入口**：NavBar 用户菜单
- **前端落点**：`layout/default/nav-bar/nav-bar.component.ts`（触发点）
- **后端入口**：`POST /auth/signout`
- **核心实现**：`LoginInOutService.loginOut()` → 清 Tab 缓存 → 清 SessionStorage → 清菜单
- **外部依赖**：—
- **典型变更**：登出前增加确认弹窗、登出后跳转到指定页面
- **风险点**：`Router.navigate()` 失败会导致 Tab 缓存和 SessionStorage 未清理
- **索引**：
  - path: `src/app/core/services/common/login-in-out.service.ts`
  - symbol: `LoginInOutService.loginOut`, `clearTabCash`, `clearSessionCash`
  - grep keywords: `loginOut`, `clearTabCash`, `/auth/signout`

---

## 锁屏

- **类型**：平台功能
- **结论级别**：事实
- **所属模块**：shared/components + widget/common-widget
- **用户入口**：NavBar 锁屏按钮（高概率推断）
- **前端落点**：`shared/components/lock-screen/`、`widget/common-widget/lock-widget/`
- **后端入口**：无（纯前端）
- **核心实现**：`SubLockedStatusService` 监听 `SessionStorage[LockedKey]`；`LockWidgetService` 控制解锁弹窗
- **外部依赖**：—
- **典型变更**：修改锁屏超时时间、修改解锁密码验证逻辑
- **风险点**：锁屏状态存 SessionStorage，多 Tab 场景下状态同步依赖 storage 事件
- **索引**：
  - path: `src/app/shared/components/lock-screen/`, `src/app/widget/common-widget/lock-widget/`
  - symbol: `SubLockedStatusService`, `LockWidgetService`
  - config: `LockedKey`（`config/constant.ts`）
  - grep keywords: `LockedKey`, `SubLockedStatusService`, `LockWidgetService`

---

## 路由守卫（未登录拦截）

- **类型**：平台功能
- **结论级别**：事实
- **所属模块**：core/services
- **用户入口**：所有需要登录的路由跳转
- **前端落点**：`core/services/common/guard/judgeLogin.guard.ts`
- **后端入口**：无
- **核心实现**：`CanActivateChildFn`，检查 `SessionStorage[TokenKey]`，无 token 重定向 `/login`
- **外部依赖**：—
- **典型变更**：新增角色级路由守卫、修改未登录跳转目标
- **风险点**：仅检查 token 存在性，不验证 token 有效性（过期 token 可通过守卫）
- **索引**：
  - path: `src/app/core/services/common/guard/judgeLogin.guard.ts`
  - symbol: `JudgeLoginGuard`
  - grep keywords: `JudgeLoginGuard`, `canActivateChild`, `TokenKey`

---

## 菜单管理

- **类型**：业务功能
- **结论级别**：事实
- **所属模块**：pages/system
- **用户入口**：`/default/system/menu`
- **前端落点**：`pages/system/menu/menu.component.ts`
- **后端入口**：`POST /menu/list`、`POST /menu/create`、`PUT /menu/update`、`POST /menu/del`
- **核心实现**：`MenusService`；弹窗：`widget/biz-widget/system/menu-modal/`
- **外部依赖**：—
- **典型变更**：新增菜单字段、修改菜单树渲染逻辑
- **风险点**：菜单数据变更直接影响所有用户的导航；`menuType='F'` 的权限按钮变更影响按钮级权限
- **索引**：
  - path: `src/app/pages/system/menu/`, `src/app/core/services/http/system/menus.service.ts`
  - symbol: `MenusService`, `MenuComponent`
  - grep keywords: `MenusService`, `/menu/list`, `menu-modal`

---

## 账号管理

- **类型**：业务功能
- **结论级别**：事实
- **所属模块**：pages/system
- **用户入口**：`/default/system/account`
- **前端落点**：`pages/system/account/account.component.ts`
- **后端入口**：`POST /user/list`、`POST /user/create`、`PUT /user/update`、`POST /user/del/`
- **核心实现**：`AccountService`；弹窗：`widget/biz-widget/system/account-modal/`
- **外部依赖**：—
- **典型变更**：新增账号字段、修改密码策略、新增批量操作
- **风险点**：删除账号不可逆（mock 中为软删除，实际需确认）；权限码 `AccountAdd/Edit/Del` 控制按钮显示
- **索引**：
  - path: `src/app/pages/system/account/`, `src/app/core/services/http/system/account.service.ts`
  - symbol: `AccountService`, `AccountComponent`
  - config: `ActionCode.AccountAdd/Edit/Del`
  - grep keywords: `AccountService`, `/user/list`, `account-modal`

---

## 部门管理

- **类型**：业务功能
- **结论级别**：事实
- **所属模块**：pages/system
- **用户入口**：`/default/system/dept`
- **前端落点**：`pages/system/dept/dept.component.ts`
- **后端入口**：`POST /department/list`、`POST /department/create`、`PUT /department/update`、`POST /department/del/`
- **核心实现**：`DeptService`；弹窗：`widget/biz-widget/system/dept-manage-modal/`
- **外部依赖**：—
- **典型变更**：新增部门层级限制、修改部门树渲染
- **风险点**：部门树结构变更影响账号管理中的部门选择；`DeptAdd/Edit/Del/AddLowLevel` 权限码控制按钮
- **索引**：
  - path: `src/app/pages/system/dept/`, `src/app/core/services/http/system/dept.service.ts`
  - symbol: `DeptService`, `DeptComponent`
  - config: `ActionCode.DeptAdd/Edit/Del/AddLowLevel`
  - grep keywords: `DeptService`, `/department/list`, `dept-manage-modal`

---

## 角色管理

- **类型**：业务功能
- **结论级别**：事实
- **所属模块**：pages/system
- **用户入口**：`/default/system/role-manager`
- **前端落点**：`pages/system/role-manager/role-manage.component.ts`
- **后端入口**：`POST /role/list`、`POST /role/create`、`PUT /role/update`、`POST /role/del`、`POST /permission/assign-role-menu`
- **核心实现**：`RoleService`；弹窗：`widget/biz-widget/system/role-manage-modal/`；权限分配子页：`set-role/set-role.component.ts`
- **外部依赖**：—
- **典型变更**：修改权限分配 UI（树形 checkbox）、新增角色继承
- **风险点**：权限分配直接影响所有该角色用户的按钮权限；`set-role` 子路由需要 `ActionCode.RoleManagerSetRole` 权限
- **索引**：
  - path: `src/app/pages/system/role-manager/`, `src/app/core/services/http/system/role.service.ts`
  - symbol: `RoleService`, `RoleManageComponent`, `SetRoleComponent`
  - config: `ActionCode.RoleManagerSetRole`
  - grep keywords: `RoleService`, `/role/list`, `assign-role-menu`, `role-manage-modal`

---

## 多页签（Tab）

- **类型**：平台功能
- **结论级别**：事实
- **所属模块**：layout/default
- **用户入口**：布局顶部 Tab 栏
- **前端落点**：`layout/default/tab/tab.component.ts`
- **后端入口**：无
- **核心实现**：`TabService` + `SimpleReuseStrategy`；Tab 刷新依赖 `refresh-empty` 占位路由
- **外部依赖**：—
- **典型变更**：新增 Tab 右键菜单（关闭其他/关闭全部）、实现 Tab 持久化（刷新后恢复）
- **风险点**：`SimpleReuseStrategy` 逻辑复杂，修改易引入缓存 Bug；Tab 刷新依赖 `refresh-empty` 路由，不能删除
- **索引**：
  - path: `src/app/layout/default/tab/tab.component.ts`, `src/app/core/services/common/tab.service.ts`, `src/app/core/services/common/reuse-strategy.ts`
  - symbol: `TabService`, `SimpleReuseStrategy`, `TabComponent`
  - grep keywords: `TabService`, `shouldDetach`, `refresh-empty`, `deleteRouteSnapshot`

---

## 主题切换

- **类型**：平台功能
- **结论级别**：事实
- **所属模块**：layout/default（SettingDrawer）
- **用户入口**：布局右侧悬浮设置按钮 → SettingDrawer
- **前端落点**：`layout/default/setting-drawer/setting-drawer.component.ts`
- **后端入口**：无（纯前端，持久化到 localStorage）
- **核心实现**：`ThemeService.$themeStyle` → `ThemeSkinService.loadTheme()` 动态替换 CSS `<link>`
- **外部依赖**：主题 CSS 静态文件
- **典型变更**：新增主题风格、修改默认主题色、新增布局配置项
- **风险点**：CSS 文件路径变更会导致主题切换静默失败；`SideNavWidth` 修改需同步 Less 变量
- **索引**：
  - path: `src/app/layout/default/setting-drawer/setting-drawer.component.ts`, `src/app/core/services/common/theme-skin.service.ts`
  - symbol: `ThemeSkinService.loadTheme`, `ThemeService.$themeStyle`
  - config: `StyleThemeModelKey`, `ThemeOptionsKey`, `SideNavWidth`, `CollapsedNavWidth`
  - grep keywords: `loadTheme`, `$themeStyle`, `StyleThemeModelKey`

---

## 全局路由搜索

- **类型**：平台功能
- **结论级别**：事实
- **所属模块**：widget/common-widget
- **用户入口**：ToolBar 搜索按钮（高概率推断）
- **前端落点**：`widget/common-widget/search-route/search-route.component.ts`
- **后端入口**：无（本地菜单数据搜索）
- **核心实现**：`SearchRouteService`，从 `MenuStoreService` 读取菜单树，模糊匹配后跳转
- **外部依赖**：—
- **典型变更**：新增搜索快捷键、支持历史记录
- **风险点**：依赖 `MenuStoreService` 菜单数据，登录前不可用
- **索引**：
  - path: `src/app/widget/common-widget/search-route/`
  - symbol: `SearchRouteComponent`, `SearchRouteService`
  - grep keywords: `SearchRouteService`, `search-route`

---

## 拖拽/缩放 Modal

- **类型**：平台功能
- **结论级别**：事实
- **所属模块**：widget/modal
- **用户入口**：`feat/ex-modal` 演示页
- **前端落点**：`widget/modal/modal-drag.directive.ts`、`widget/modal/modal-resize.directive.ts`
- **后端入口**：无
- **核心实现**：`ModalDragDirective`（拖拽）、`ModalResizeDirective`（缩放）、对应 Service
- **外部依赖**：—
- **典型变更**：修改拖拽边界限制、修改缩放最小尺寸
- **风险点**：向左/向上拖拽曾有 Bug（已修复，见 git log `fix: 解决modal resize无法向左侧和向上托拽的问题`）；修改时需回归测试四个方向的拖拽
- **索引**：
  - path: `src/app/widget/modal/`
  - symbol: `ModalDragDirective`, `ModalResizeDirective`, `ModalDragService`, `ModalResizeService`
  - grep keywords: `modal-drag`, `modal-resize`, `ModalDragDirective`

---

## ECharts 图表

- **类型**：功能演示
- **结论级别**：事实
- **所属模块**：pages/feat/charts
- **用户入口**：`feat/charts/echarts`
- **前端落点**：`pages/feat/charts/echarts/echarts.component.ts`（CDK Portal 切换三个 Tab）
- **后端入口**：无（静态演示数据）
- **核心实现**：`ngx-echarts` + `echarts`，动态 import；CDK Portal 实现 Tab 内容懒渲染
- **外部依赖**：`ngx-echarts`、`echarts`
- **典型变更**：新增图表类型、修改图表配置
- **风险点**：`echarts` 动态 import 在低网速下首次加载慢；升级 `ngx-echarts` 需注意 API 兼容性
- **索引**：
  - path: `src/app/pages/feat/charts/echarts/`
  - symbol: `EchartsComponent`, `StartedComponent`, `AdvancedComponent`, `SeriesComponent`
  - grep keywords: `ngx-echarts`, `echarts`, `CDK Portal`, `ComponentPortal`

---

## AntV X6 流程图

- **类型**：功能演示
- **结论级别**：事实
- **所属模块**：pages/page-demo/flow
- **用户入口**：`page-demo/flow/flow-chat`
- **前端落点**：`pages/page-demo/flow/flow-chat/flow-chat.component.ts`
- **后端入口**：无
- **核心实现**：`@antv/x6` + `@antv/x6-plugin-dnd`
- **外部依赖**：`@antv/x6`、`@antv/x6-plugin-dnd`
- **典型变更**：新增节点类型、实现流程图保存/加载
- **风险点**：`@antv/x6` 版本升级 API 变化较大
- **索引**：
  - path: `src/app/pages/page-demo/flow/flow-chat/`
  - symbol: `FlowChatComponent`
  - grep keywords: `@antv/x6`, `flow-chat`

---

## 查询表格（含详情权限控制）

- **类型**：页面模板
- **结论级别**：事实
- **所属模块**：pages/page-demo/list
- **用户入口**：`page-demo/list/search-table`
- **前端落点**：`pages/page-demo/list/search-table/search-table.component.ts`
- **后端入口**：（mock 数据，具体接口待验证）
- **核心实现**：`shared/components/ant-table/`；详情子路由 `search-table-detail/:name/:age` 需要 `ActionCode.SearchTableDetail` 权限
- **外部依赖**：—
- **典型变更**：新增搜索条件、修改列定义、新增导出功能
- **风险点**：`SearchTableDetail` 权限码在 `LoginInOutService` 中硬编码注入（todo 标注），实际项目需改为后端管理
- **索引**：
  - path: `src/app/pages/page-demo/list/search-table/`
  - symbol: `SearchTableComponent`, `SearchTableDetailComponent`
  - config: `ActionCode.SearchTableDetail`
  - grep keywords: `search-table`, `SearchTableDetail`, `ant-table`

---

## 密码强度组件

- **类型**：功能演示 + 业务组件
- **结论级别**：事实
- **所属模块**：pages/comp + shared/biz-components
- **用户入口**：`comp/strength-meter`
- **前端落点**：`pages/comp/strength-meter/strength-meter.component.ts`；复用组件：`shared/biz-components/password-strength-meter/`
- **后端入口**：无
- **核心实现**：`@zxcvbn-ts/core` + `@zxcvbn-ts/language-en`；`PsmProgressBarDirective` 控制进度条
- **外部依赖**：`@zxcvbn-ts/core`、`@zxcvbn-ts/language-en`
- **典型变更**：新增中文语言包、修改强度阈值
- **风险点**：`@zxcvbn-ts` 仅支持英文语言包，中文密码评分可能不准确
- **索引**：
  - path: `src/app/shared/biz-components/password-strength-meter/`, `src/app/pages/comp/strength-meter/`
  - symbol: `PasswordStrengthMeterComponent`, `PsmProgressBarDirective`
  - grep keywords: `zxcvbn`, `password-strength-meter`, `PasswordStrengthMeter`

---

## View Transitions 路由过渡动画

- **类型**：功能演示
- **结论级别**：事实
- **所属模块**：pages/feat/transitions
- **用户入口**：`feat/transitions`
- **前端落点**：`pages/feat/transitions/transitions.ts`
- **后端入口**：无
- **核心实现**：`withViewTransitions()` + `ViewTransitionService.currentTransition` signal；`shouldDetach: 'no'` 禁用路由复用
- **外部依赖**：View Transitions API（浏览器原生）
- **典型变更**：修改过渡动画效果、新增过渡类型
- **风险点**：View Transitions API 在部分浏览器不支持（需降级处理）；`shouldDetach: 'no'` 必须保留，否则缓存会破坏动画
- **索引**：
  - path: `src/app/pages/feat/transitions/`, `src/app/core/services/common/view-transition.service.ts`
  - symbol: `ViewTransitionService`, `Transitions`, `TransitionsDetail`
  - grep keywords: `ViewTransitionService`, `withViewTransitions`, `shouldDetach`

---

## 缓存滚动条

- **类型**：功能演示
- **结论级别**：事实
- **所属模块**：pages/feat/scroll
- **用户入口**：`feat/scroll/keep-scroll-page`
- **前端落点**：`pages/feat/scroll/keep-scroll-page/keep-scroll-page.component.ts`
- **后端入口**：无
- **核心实现**：`ScrollService`；路由 `data.scrollContain: ['#div-scroll1', '#div-scroll2']` 指定需缓存的滚动容器
- **外部依赖**：—
- **典型变更**：新增需缓存滚动位置的容器
- **风险点**：`scrollContain` 选择器与 DOM 结构强耦合，DOM 变更需同步更新路由配置
- **索引**：
  - path: `src/app/pages/feat/scroll/keep-scroll-page/`, `src/app/core/services/common/scroll.service.ts`
  - symbol: `ScrollService`, `KeepScrollPageComponent`
  - grep keywords: `scrollContain`, `ScrollService`, `keep-scroll-page`
