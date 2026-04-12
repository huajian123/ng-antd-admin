---
updated: 2026-04-10
---

# Module Index

> 模块地图。每个核心模块按 skill 模板输出：职责、输入、输出、上下游、关键入口、典型变更点、索引。
> 路由→组件→文件的完整映射见各模块"关键入口"小节。

---

## 模块总览

| 模块 | 类型 | 职责一句话 |
|------|------|-----------|
| layout/default | 接口适配 | 主布局壳，承载导航/Tab/主题/路由出口 |
| core/services | 基础设施 | 全局服务：HTTP、状态、守卫、路由复用、主题 |
| pages/login | 应用编排 | 登录/注册入口，触发认证流程 |
| pages/system | 领域核心 | 系统管理 CRUD（菜单/账号/部门/角色） |
| pages/dashboard | 应用编排 | 数据可视化仪表盘 |
| pages/comp | 接口适配 | 组件演示，展示 ng-zorro-antd 用法 |
| pages/feat | 接口适配 | 功能演示，展示各类前端能力 |
| pages/page-demo | 接口适配 | 页面模板演示，供业务页面参考 |
| shared | 基础设施 | 通用组件/指令/管道，跨模块复用 |
| widget/drawer | 接口适配 | 业务弹窗/抽屉组件，按需调用 |

---

## layout/default — 主布局壳

- **类型**：接口适配层
- **结论级别**：事实
- **职责**：承载整个应用的视觉框架，包含顶部导航、侧边菜单、多页签、主题设置抽屉、路由出口
- **输入**：`MenuStoreService`（菜单数据）、`ThemeService`（主题状态）、`UserInfoStoreService`（用户信息）、路由激活事件
- **输出**：渲染布局 DOM，触发路由导航，写入 `ThemeService` 状态
- **上游**：`core/services/store/common-store/`（状态来源）、`pages/*`（子路由内容）
- **下游**：`shared/components/`（PageHeader、TopProgressBar 等）、`widget/`（LockWidget、SearchRoute）
- **关键入口**：

  | 组件 | 文件 | 职责 |
  |------|------|------|
  | DefaultComponent | `layout/default/default.component.ts` | 布局容器，挂 `canActivateChild: [JudgeLoginGuard]` |
  | NavBarComponent | `layout/default/nav-bar/nav-bar.component.ts` | 顶部栏：Logo、折叠按钮、面包屑、工具区 |
  | SideNavComponent | `layout/default/side-nav/side-nav.component.ts` | 左侧菜单，订阅 `MenuStoreService` |
  | TabComponent | `layout/default/tab/tab.component.ts` | 多页签，依赖 `TabService` + `SimpleReuseStrategy` |
  | SettingDrawerComponent | `layout/default/setting-drawer/setting-drawer.component.ts` | 主题设置面板，写入 `ThemeService` |
  | ToolBarComponent | `layout/default/tool-bar/` | 工具栏（全屏、搜索、通知等） |
  | NavDrawerComponent | `layout/default/nav-drawer/` | 移动端菜单抽屉 |
  | RefreshEmptyComponent | `layout/default/refresh-empty/` | Tab 刷新占位，`shouldDetach: 'no'` |

- **风险点**：Tab 刷新依赖 `refresh-empty` 占位路由；菜单渲染依赖 `MenuStoreService` BehaviorSubject，登录后必须先写入才能显示菜单
- **典型变更**：新增顶部工具按钮、调整菜单宽度（需同步 Less 变量）、修改 Tab 行为
- **索引**：
  - path: `src/app/layout/default/`
  - symbol: `DefaultComponent`, `NavBarComponent`, `SideNavComponent`, `TabComponent`, `SettingDrawerComponent`
  - config: `SideNavWidth=208`, `CollapsedNavWidth=48`（`src/app/config/constant.ts`）
  - grep keywords: `MenuStoreService`, `TabService`, `SimpleReuseStrategy`, `refresh-empty`, `shouldDetach`

---

## core/services — 核心服务层

- **类型**：基础设施
- **结论级别**：事实
- **职责**：提供全局单例服务：HTTP 封装、状态 store、路由守卫、路由复用、主题、Tab、锁屏、窗口监听
- **输入**：HTTP 响应、SessionStorage/localStorage、路由事件、窗口 resize 事件
- **输出**：Signal/BehaviorSubject 状态、路由跳转决策、HTTP 数据流
- **上游**：Angular 框架（HttpClient、Router）、浏览器 API
- **下游**：所有页面模块、layout/default、shared
- **关键入口**：

  | 服务 | 文件 | 职责 |
  |------|------|------|
  | BaseHttpService | `core/services/http/base-http.service.ts` | HTTP 统一封装（Loading、错误处理、响应解包） |
  | httpInterceptorService | `core/services/interceptors/http-interceptor.ts` | 注入 Bearer Token，处理 HTTP 错误 |
  | LoginInOutService | `core/services/common/login-in-out.service.ts` | 登录/登出核心逻辑 |
  | StartupService | `core/startup/startup.service.ts` | 应用启动时恢复登录态 |
  | SimpleReuseStrategy | `core/services/common/reuse-strategy.ts` | 路由复用，支撑 Tab 缓存 |
  | TabService | `core/services/common/tab.service.ts` | Tab 增删改查 |
  | ThemeService | `core/services/store/common-store/theme.service.ts` | 主题 signal store |
  | ThemeSkinService | `core/services/common/theme-skin.service.ts` | 动态加载主题 CSS |
  | MenuStoreService | `core/services/store/common-store/menu-store.service.ts` | 菜单 BehaviorSubject store |
  | UserInfoStoreService | `core/services/store/common-store/userInfo-store.service.ts` | 用户信息 signal store |
  | JudgeLoginGuard | `core/services/common/guard/judgeLogin.guard.ts` | 路由守卫，检查 Token |
  | SubLockedStatusService | `core/services/common/sub-locked-status.service.ts` | 锁屏状态监听 |
  | SubWindowWithService | `core/services/common/sub-window-with.service.ts` | 窗口宽度监听 |
  | ScrollService | `core/services/common/scroll.service.ts` | 滚动位置缓存 |

- **风险点**：`BaseHttpService` 是全部 HTTP 的单点，修改影响所有接口；`SimpleReuseStrategy` 是 Tab 缓存的核心，逻辑复杂
- **典型变更**：新增 HTTP 拦截逻辑、修改 Token 刷新策略、调整路由复用规则
- **索引**：
  - path: `src/app/core/`
  - symbol: `BaseHttpService`, `LoginInOutService`, `SimpleReuseStrategy`, `ThemeService`, `MenuStoreService`
  - config: `TokenKey`, `TokenPre`, `loginTimeOutCode`, `tokenErrorCode`（`src/app/config/constant.ts`）
  - grep keywords: `BaseHttpService`, `resultHandle`, `shouldDetach`, `MenuStoreService`, `$userInfo`

---

## pages/login — 登录模块

- **类型**：应用编排
- **结论级别**：事实
- **职责**：提供登录、注册、第三方登录入口，触发认证流程
- **输入**：用户表单输入（用户名/密码）
- **输出**：JWT token → `LoginInOutService.loginIn()` → 跳转 `/default/dashboard`
- **上游**：用户操作
- **下游**：`LoginService`（HTTP）、`LoginInOutService`（认证流程）
- **关键入口**：

  | 路由 | 组件文件 |
  |------|----------|
  | `login/login-form` | `pages/login/login-form/` |
  | `login/register-form` | `pages/login/register-form/` |
  | `login/other-login` | `pages/other-login/` |

- **风险点**：登录成功后的 `loginIn()` 链路较长（Token 存储 → 权限码 → 菜单），任一步骤失败会导致白屏
- **典型变更**：新增第三方登录方式、修改登录表单校验规则
- **索引**：
  - path: `src/app/pages/login/`
  - symbol: `LoginService.login()`, `LoginInOutService.loginIn()`
  - config: `TokenKey`, `TokenPre`
  - grep keywords: `login`, `loginIn`, `LoginService`

---

## pages/system — 系统管理模块

- **类型**：领域核心
- **结论级别**：事实
- **职责**：提供菜单、账号、部门、角色的 CRUD 管理，是权限体系的配置入口
- **输入**：管理员操作（表单提交、删除确认）
- **输出**：HTTP 请求 → MSW mock → 列表刷新
- **上游**：`core/services/http/system/`（HTTP 服务）、`widget/biz-widget/system/`（弹窗组件）
- **下游**：`mocks/business/`（mock 数据）
- **关键入口**：

  | 路由 | 组件文件 | HTTP 服务 |
  |------|----------|-----------|
  | `system/menu` | `pages/system/menu/menu.component.ts` | `MenusService` |
  | `system/account` | `pages/system/account/account.component.ts` | `AccountService` |
  | `system/dept` | `pages/system/dept/dept.component.ts` | `DeptService` |
  | `system/role-manager` | `pages/system/role-manager/role-manage.component.ts` | `RoleService` |
  | `system/role-manager/set-role` | `pages/system/role-manager/set-role/set-role.component.ts` | `RoleService.updatePermission()` |

- **风险点**：菜单管理的变更会影响所有用户的导航；角色权限分配直接影响按钮级权限控制
- **典型变更**：新增系统管理子模块、修改权限码格式、调整角色-菜单关联逻辑
- **索引**：
  - path: `src/app/pages/system/`, `src/app/core/services/http/system/`
  - symbol: `MenusService`, `AccountService`, `DeptService`, `RoleService`
  - grep keywords: `system`, `MenusService`, `AccountService`, `RoleService`, `permission`

---

## pages/dashboard — 仪表盘模块

- **类型**：应用编排
- **结论级别**：事实
- **职责**：数据可视化展示，登录后默认落地页
- **输入**：HTTP 数据（mock）、ECharts/G2Plot 配置
- **输出**：图表渲染
- **上游**：`core/services/http/`（数据）、`echarts`/`@antv/g2plot`（图表库）
- **下游**：无
- **关键入口**：

  | 路由 | 组件文件 |
  |------|----------|
  | `dashboard/analysis` | `pages/dashboard/analysis/analysis.component.ts` |
  | `dashboard/monitor` | `pages/dashboard/monitor/monitor.component.ts` |
  | `dashboard/workbench` | `pages/dashboard/workbench/workbench.component.ts` |

- **风险点**：图表库版本升级可能导致 API 不兼容
- **典型变更**：新增图表类型、修改数据接口、调整布局
- **索引**：
  - path: `src/app/pages/dashboard/`
  - symbol: `AnalysisComponent`, `MonitorComponent`, `WorkbenchComponent`
  - grep keywords: `dashboard`, `echarts`, `g2plot`

---

## pages/comp — 组件演示模块

- **类型**：接口适配（演示）
- **结论级别**：事实
- **职责**：展示 ng-zorro-antd 及自定义组件的用法，供开发者参考
- **输入**：无（静态演示）
- **输出**：组件渲染
- **上游**：`shared/biz-components/`（PasswordStrengthMeter 等）、`@zxcvbn-ts/core`
- **下游**：无
- **关键入口**：

  | 路由 | 组件文件 | 标题 |
  |------|----------|------|
  | `comp/transition` | `pages/comp/transition/transition.component.ts` | 动画组件 |
  | `comp/basic` | `pages/comp/basic/basic.component.ts` | 基础组件 |
  | `comp/lazy/lazy-basic` | `pages/comp/lazy/lazy-basic/lazy-basic.component.ts` | 懒加载基础实例 |
  | `comp/lazy/lazy-scroll` | `pages/comp/lazy/lazy-scroll/lazy-scroll.component.ts` | 滚动懒加载 |
  | `comp/luckysheet` | `pages/comp/luckysheet/luckysheet.component.ts` | 在线 Excel |
  | `comp/desc` | `pages/comp/desc/desc.component.ts` | 详情组件 |
  | `comp/strength-meter` | `pages/comp/strength-meter/strength-meter.component.ts` | 密码强度组件 |
  | `comp/form/shrink-form` | `pages/comp/form/shrink-form/shrink-form.component.ts` | 可伸缩表单 |
  | `comp/form/append-form` | `pages/comp/form/append-form/append-form.component.ts` | 可增删表单 |
  | `comp/blingbling` | `pages/comp/blingbling/blingbling.component.ts` | blingbling |
  | `comp/comp2~5` | `pages/no-content/no-content.component.ts` | 占位页（未实现） |

- **风险点**：`comp2~5` 为占位页，新增真实页面时需同步更新路由和菜单配置
- **典型变更**：新增组件演示页、替换占位页为真实实现
- **索引**：
  - path: `src/app/pages/comp/`
  - grep keywords: `comp-routing`, `no-content`

---

## pages/feat — 功能演示模块

- **类型**：接口适配（演示）
- **结论级别**：事实
- **职责**：展示各类前端能力（Modal/Drawer/图表/WebSocket/文件/主题等），供开发者参考
- **输入**：用户交互（演示操作）
- **输出**：功能演示渲染
- **上游**：多个第三方库（TinyMCE、ngx-echarts、@antv/x6、screenfull、driver.js 等）
- **下游**：`widget/modal/`（拖拽/缩放 Modal）、`core/services/common/tab.service.ts`（Tab 演示）
- **关键入口**（核心子模块）：

  | 路由 | 组件文件 | 关键依赖 |
  |------|----------|---------|
  | `feat/ex-modal` | `pages/feat/ex-modal/` | `widget/modal/modal-drag.directive.ts` |
  | `feat/rich-text` | `pages/feat/rich-text/` | `@tinymce/tinymce-angular` |
  | `feat/charts/echarts` | `pages/feat/charts/echarts/echarts.component.ts` | `ngx-echarts` + CDK Portal |
  | `feat/charts/gaode-map` | `pages/feat/charts/gaode-map/` | `@amap/amap-jsapi-loader` |
  | `feat/charts/baidu-map` | `pages/feat/charts/baidu-map/` | 百度地图 JS SDK |
  | `feat/tabs` | `pages/feat/tabs/tabs.component.ts` | `TabService`、`ActionCode.TabsDetail` |
  | `feat/transitions` | `pages/feat/transitions/transitions.ts` | View Transitions API，`shouldDetach: 'no'` |
  | `feat/websocket` | `pages/feat/websocket/` | 原生 WebSocket |
  | `feat/scroll/keep-scroll-page` | `pages/feat/scroll/keep-scroll-page/` | `ScrollService`，`scrollContain` 路由 data |
  | `feat/feat1,3,4,5` | `pages/no-content/` | 占位页（未实现） |

- **风险点**：`feat/transitions` 禁用路由复用（`shouldDetach: 'no'`），修改时注意不要意外开启缓存
- **典型变更**：新增功能演示页、替换占位页、升级第三方库
- **索引**：
  - path: `src/app/pages/feat/`
  - grep keywords: `feat-routing`, `no-content`, `shouldDetach`

---

## pages/page-demo — 页面模板演示模块

- **类型**：接口适配（模板）
- **结论级别**：事实
- **职责**：提供标准业务页面模板（表单/列表/详情/个人中心/异常/结果/流程图），供业务开发参考
- **输入**：HTTP 数据（mock）、用户操作
- **输出**：标准页面布局渲染
- **上游**：`core/services/http/`、`@antv/x6`（流程图）、`shared/components/ant-table/`（列表页）
- **下游**：无
- **关键入口**：

  | 路由 | 组件文件 | 说明 |
  |------|----------|------|
  | `page-demo/form/base-form` | `pages/page-demo/form/base/base.component.ts` | 基础表单模板 |
  | `page-demo/form/step-form` | `pages/page-demo/form/step/step.component.ts` | 分步表单模板 |
  | `page-demo/form/advanced-form` | `pages/page-demo/form/advanced/advanced.component.ts` | 高级表单模板 |
  | `page-demo/list/search-table` | `pages/page-demo/list/search-table/search-table.component.ts` | 查询表格（含详情子路由，需权限） |
  | `page-demo/list/standard-table` | `pages/page-demo/list/standard-table/standard-table.component.ts` | 标准表格 |
  | `page-demo/list/tree-list` | `pages/page-demo/list/tree-list/tree-list.component.ts` | 树状表格 |
  | `page-demo/list/card-table` | `pages/page-demo/list/card-table/card-table.component.ts` | 卡片列表 |
  | `page-demo/list/search-list/{article,project,application}` | `pages/page-demo/list/search-list/` | 搜索列表（3个子 Tab） |
  | `page-demo/detail/base-detail` | `pages/page-demo/detail/base-detail/base-detail.component.ts` | 基础详情页 |
  | `page-demo/detail/adv-detail` | `pages/page-demo/detail/adv-detail/adv-detail.component.ts` | 高级详情页 |
  | `page-demo/personal/personal-center` | `pages/page-demo/personal/personal-center/personal-center.component.ts` | 个人中心 |
  | `page-demo/personal/personal-setting` | `pages/page-demo/personal/personal-setting/personal-setting.component.ts` | 个人设置 |
  | `page-demo/except/{403,404,500,network-error,no-data}` | `pages/page-demo/except/` | 异常页 |
  | `page-demo/result/{success,fail}` | `pages/page-demo/result/` | 结果页 |
  | `page-demo/flow/flow-chat` | `pages/page-demo/flow/flow-chat/flow-chat.component.ts` | AntV X6 流程图 |
  | `page-demo/task` | `pages/page-demo/task/task.component.ts` | 任务页 |

- **风险点**：`search-table-detail` 路由需要 `ActionCode.SearchTableDetail` 权限，硬编码在 `LoginInOutService` 中
- **典型变更**：新增列表/表单模板类型、修改分页逻辑
- **索引**：
  - path: `src/app/pages/page-demo/`
  - symbol: `ActionCode.SearchTableDetail`
  - grep keywords: `page-demo`, `search-table`, `SearchTableDetail`

---

## shared — 共享基础设施

- **类型**：基础设施
- **结论级别**：事实
- **职责**：提供跨模块复用的 UI 组件、指令、管道、业务组件
- **输入**：父组件 input()、路由数据
- **输出**：UI 渲染、事件 output()
- **上游**：ng-zorro-antd、`@zxcvbn-ts/core`
- **下游**：所有页面模块、layout/default
- **关键入口**：

  | 类型 | 关键组件/指令 | 职责 |
  |------|--------------|------|
  | 组件 | `ant-table/` | 封装 nz-table，支持分页/排序/搜索 |
  | 组件 | `page-header/` | 页面头部（面包屑+标题） |
  | 组件 | `lock-screen/` | 锁屏遮罩 |
  | 组件 | `global-loading/` | 全局 Loading |
  | 组件 | `top-progress-bar/` | 顶部进度条 |
  | 组件 | `tree-table/` | 树形表格 |
  | 业务组件 | `password-strength-meter/` | 密码强度计（`@zxcvbn-ts/core`） |
  | 业务组件 | `icon-sel/` | 图标选择器 |
  | 业务组件 | `layout-head-right-menu/` | 布局头部右侧菜单 |
  | 指令 | `auth.directive.ts` | 按钮级权限控制 |
  | 指令 | `debounceClick.directive.ts` | 防抖点击 |
  | 指令 | `keep-alive.ts` | KeepAlive |
  | 管道 | `html.pipe.ts` | 安全 HTML |
  | 管道 | `table-filed.pipe.ts` | 表格字段格式化 |

- **风险点**：`auth.directive.ts` 是按钮级权限的唯一控制点，修改影响全部权限按钮
- **典型变更**：新增通用组件、修改 `ant-table` 封装逻辑、调整权限指令
- **索引**：
  - path: `src/app/shared/`
  - symbol: `AuthDirective`, `AntTableComponent`, `PasswordStrengthMeterComponent`
  - grep keywords: `AuthDirective`, `authCode`, `ant-table`

---

## widget/drawer — 弹窗/抽屉组件层

- **类型**：接口适配
- **结论级别**：事实
- **职责**：提供业务弹窗（Modal/Drawer）组件，按需由页面组件调用
- **输入**：页面组件调用（传入数据）
- **输出**：弹窗 UI、表单提交 → HTTP 请求
- **上游**：`pages/system/`、`pages/feat/`、`core/services/http/system/`
- **下游**：`widget/modal/`（拖拽/缩放基础设施）、`tpl/`（按钮模板）
- **关键入口**：

  | 组件 | 路径 | 用途 |
  |------|------|------|
  | AccountModal | `widget/biz-widget/system/account-modal/` | 账号新增/编辑 |
  | DeptManageModal | `widget/biz-widget/system/dept-manage-modal/` | 部门新增/编辑 |
  | MenuModal | `widget/biz-widget/system/menu-modal/` | 菜单新增/编辑 |
  | RoleManageModal | `widget/biz-widget/system/role-manage-modal/` | 角色新增/编辑 |
  | LoginModal | `widget/biz-widget/login/login-modal.component.ts` | 登录超时重新登录 |
  | ChangePassword | `widget/biz-widget/change-password/change-password.component.ts` | 修改密码 |
  | LockWidget | `widget/common-widget/lock-widget/` | 锁屏解锁 |
  | SearchRoute | `widget/common-widget/search-route/` | 全局路由搜索 |
  | ModalDragDirective | `widget/modal/modal-drag.directive.ts` | Modal 拖拽 |
  | ModalResizeDirective | `widget/modal/modal-resize.directive.ts` | Modal 缩放 |

- **风险点**：Modal 拖拽/缩放逻辑（`modal-resize.service.ts`）曾有向左/向上拖拽 Bug（见 git log `fix: 解决modal resize无法向左侧和向上托拽的问题`）
- **典型变更**：新增业务弹窗、修改 Modal 拖拽边界逻辑
- **索引**：
  - path: `src/app/widget/`, `src/app/drawer/`, `src/app/tpl/`
  - symbol: `NzModalWrapService`, `ModalDragDirective`, `ModalResizeDirective`
  - grep keywords: `modal-drag`, `modal-resize`, `NzModalWrapService`

---

## 顶层路由（已确认事实）

| path | 目标 | 说明 |
|------|------|------|
| `/` | → `/login/login-form` | 默认重定向 |
| `/login` | `pages/login/` | 登录页，preload=true |
| `/blank` | `layout/blank/` | 空白布局 |
| `/default` | `layout/default/` | 主布局壳，preload=true |
| `/**` | → `/login/login-form` | 404 兜底 |

path: `src/app/app.routes.ts`
