---
name: secondary-indexes
description: ng-antd-admin 二级索引目录，含运行时边界、接口索引、配置索引、数据访问索引、组件索引
type: project
---

# 二级索引目录

## 索引导航

| 索引 | 说明 |
|------|------|
| [1. 运行时边界](#1-运行时边界) | 环境变量、代理、构建配置 |
| [2. 接口索引](#2-接口索引) | 所有 HTTP API 汇总 |
| [3. 配置索引](#3-配置索引) | 常量、权限码、主题、路由 |
| [4. 数据访问索引](#4-数据访问索引) | HTTP 服务与 Signal Store |
| [5. 组件索引](#5-组件索引) | 共享组件、布局组件、弹窗组件 |
| [6. 指令与管道索引](#6-指令与管道索引) | 自定义指令和管道 |
| [7. 路由索引](#7-路由索引) | 完整路由树 |

---

## 1. 运行时边界

### 环境配置

| 文件 | 用途 |
|------|------|
| `src/environments/environment.ts` | 开发环境（`production: false`） |
| `src/environments/environment.prod.ts` | 生产环境（`production: true`，含 `localUrl`） |

### API 基础路径

| 环境 | 路径 | 说明 |
|------|------|------|
| 开发 | `/site/api` | 通过 `proxy.conf.json` 代理转发 |
| 生产 | `localUrl`（`environment.prod.ts` 中定义） | 直接请求后端 |

**文件**：`src/app/core/services/http/base-http.service.ts:35`

### 代理配置

**文件**：`proxy.conf.json`（根目录）  
**作用**：开发时将 `/site/api` 代理到后端服务地址

### 构建产物

| Bundle | 说明 |
|--------|------|
| `dist/` | 构建输出目录 |
| `default.css` | 默认主题 CSS |
| `dark.css` | 暗黑主题 CSS |
| `aliyun.css` | 阿里云主题 CSS |
| `compact.css` | 紧凑主题 CSS |

### Mock 层

**文件**：`src/mocks/browser.ts`  
**框架**：MSW（Mock Service Worker）v2  
**激活条件**：开发环境下在 `main.ts` 中条件启动  
**覆盖接口**：login/loginOut/user/department/role/menu/permission

### 存储边界

| 存储 | Key | 内容 | 生命周期 |
|------|-----|------|---------|
| SessionStorage | `Authorization` | `Bearer <JWT>` | 会话期间 |
| localStorage | `ThemeOptionsKey` | 主题设置 JSON | 持久 |
| localStorage | `StyleThemeModelKey` | 主题风格（default/dark/aliyun/compact） | 持久 |
| localStorage | `IsFirstLogin` | 是否首次登录（driver.js 引导） | 持久 |
| localStorage | `LockedKey` | 锁屏状态 | 持久 |
| localStorage | `LangKey` | 语言设置 | 持久 |

**文件**：`src/app/config/constant.ts`

---

## 2. 接口索引

### 认证接口

| 方法 | 路径 | 服务 | 说明 |
|------|------|------|------|
| POST | `/auth/signin` | `LoginService.login()` | 登录，返回 JWT |
| POST | `/auth/signout` | `LoginService.loginOut()` | 登出 |
| POST | `/auth/menu` | `LoginService.getMenuByUserAuthCode()` | 按权限码获取菜单 |

### 用户接口

| 方法 | 路径 | 服务 | 说明 |
|------|------|------|------|
| POST | `/user/list` | `AccountService.getAccount()` | 分页查询用户 |
| GET | `/user/{id}` | `AccountService.getAccountDetail()` | 用户详情 |
| GET | `/user/auth-code/{id}` | `AccountService.getAccountAuthCode()` | 获取用户权限码 |
| POST | `/user/create` | `AccountService.addAccount()` | 新增用户 |
| PUT | `/user/update` | `AccountService.editAccount()` | 编辑用户 |
| POST | `/user/del/` | `AccountService.delAccount()` | 删除用户（批量） |
| PUT | `/user/psd` | `AccountService.editAccountPsd()` | 修改密码 |

### 角色接口

| 方法 | 路径 | 服务 | 说明 |
|------|------|------|------|
| POST | `/role/list` | `RoleService.getRoles()` | 分页查询角色 |
| GET | `/role/{id}` | `RoleService.getRolesDetail()` | 角色详情 |
| POST | `/role/create` | `RoleService.addRoles()` | 新增角色 |
| PUT | `/role/update` | `RoleService.editRoles()` | 编辑角色 |
| POST | `/role/del` | `RoleService.delRoles()` | 删除角色（批量） |

### 权限接口

| 方法 | 路径 | 服务 | 说明 |
|------|------|------|------|
| GET | `/permission/list-role-resources/{id}` | `RoleService.getPermissionById()` | 查询角色已有权限码 |
| POST | `/permission/assign-role-menu` | `RoleService.updatePermission()` | 分配角色权限 |

### 菜单接口

| 方法 | 路径 | 服务 | 说明 |
|------|------|------|------|
| POST | `/menu/list` | `MenusService.getMenuList()` | 分页查询菜单 |
| GET | `/menu/{id}` | `MenusService.getMenuDetail()` | 菜单详情 |
| POST | `/menu/create` | `MenusService.addMenus()` | 新增菜单 |
| PUT | `/menu/update` | `MenusService.editMenus()` | 编辑菜单 |
| POST | `/menu/del` | `MenusService.delMenus()` | 删除菜单 |

### 部门接口

| 方法 | 路径 | 服务 | 说明 |
|------|------|------|------|
| POST | `/department/list` | `DeptService.getDepts()` | 分页查询部门 |
| GET | `/department/{id}` | `DeptService.getDeptsDetail()` | 部门详情 |
| POST | `/department/create` | `DeptService.addDepts()` | 新增部门 |
| PUT | `/department/update` | `DeptService.editDepts()` | 编辑部门 |
| POST | `/department/del/` | `DeptService.delDepts()` | 删除部门（批量） |

---

## 3. 配置索引

### 常量配置

**文件**：`src/app/config/constant.ts`

| 常量 | 值 | 用途 |
|------|-----|------|
| `TokenPre` | `'Bearer '` | Token 前缀 |
| `TokenKey` | `'Authorization'` | SessionStorage key / 请求头 key |
| `ThemeOptionsKey` | `'ThemeOptionsKey'` | 主题设置 localStorage key |
| `StyleThemeModelKey` | `'StyleThemeModelKey'` | 主题风格 localStorage key |
| `IsFirstLogin` | `'IsFirstLogin'` | 首次登录标记 |
| `LockedKey` | `'LockedKey'` | 锁屏状态 key |
| `loginTimeOutCode` | `1012` | 登录超时错误码 |
| `tokenErrorCode` | `1010` | Token 错误码 |
| `SideCollapsedMaxWidth` | `700` | 侧边栏变抽屉的临界宽度 |
| `TopCollapsedMaxWidth` | `1253` | 顶部菜单变抽屉的临界宽度 |
| `LangKey` | `'LangKey'` | 语言 localStorage key |
| `SideNavWidth` | `208` | 侧边栏宽度（px） |
| `CollapsedNavWidth` | `48` | 折叠状态侧边栏宽度（px） |
| `salt` | `'EIpWsyfiy@...'` | 密码加盐（前端加密用） |

### 权限码配置

**文件**：`src/app/config/actionCode.ts`  
→ 详见 [auth-login-index.md#权限码体系](auth-login-index.md)

### 路由配置

**文件**：`src/app/app.routes.ts`（顶层）  
→ 详见 [二级索引 7. 路由索引](#7-路由索引)

### 主题配置

**文件**：`src/app/core/services/store/common-store/theme.service.ts`  
**默认值**：`theme: 'dark'`、`mode: 'side'`、`color: '#1890FF'`、`isShowTab: true`

### 国际化配置

**文件**：`public/i18n/`（推断，待验证）  
**框架**：`@ngx-translate/core`，HTTP Loader 从 `./i18n/` 加载 JSON 文件

---

## 4. 数据访问索引

### HTTP 服务层

| 服务 | 文件 | 职责 |
|------|------|------|
| `BaseHttpService` | `core/services/http/base-http.service.ts` | HTTP 基础封装（GET/POST/PUT/DELETE/下载） |
| `LoginService` | `core/services/http/login/login.service.ts` | 登录/登出/菜单 |
| `AccountService` | `core/services/http/system/account.service.ts` | 用户 CRUD + 权限码 |
| `RoleService` | `core/services/http/system/role.service.ts` | 角色 CRUD + 权限分配 |
| `MenusService` | `core/services/http/system/menus.service.ts` | 菜单 CRUD |
| `DeptService` | `core/services/http/system/dept.service.ts` | 部门 CRUD |
| `DownloadService` | `core/services/http/download/download.service.ts` | 文件下载 |
| `ExampleService` | `core/services/http/example/example.service.ts` | 示例接口 |

### Signal Store 层

| Store | 文件 | 存储内容 |
|-------|------|---------|
| `UserInfoStoreService` | `store/common-store/userInfo-store.service.ts` | 当前用户信息（userId/userName/authCode） |
| `MenuStoreService` | `store/common-store/menu-store.service.ts` | 菜单树数组 |
| `ThemeService` | `store/common-store/theme.service.ts` | 主题设置、布局模式、折叠状态 |
| `LockScreenStoreService` | `store/common-store/lock-screen-store.service.ts` | 锁屏状态 |
| `LanguageService` | `store/common-store/language.service.ts` | 当前语言 |
| `SpinService` | `store/common-store/spin.service.ts` | 全局 Loading 状态 |
| `SplitNavStoreService` | `store/common-store/split-nav-store.service.ts` | 混合模式下分割菜单数组 |
| `WindowsWidthService` | `store/common-store/windows-width.service.ts` | 窗口宽度 |
| `ModalFullStatusStoreService` | `store/common-store/modal-full-status-store.service.ts` | Modal 全屏状态 |
| `Login1StoreService` | `store/biz-store-service/other-login/login1-store.service.ts` | 其他登录方式状态 |
| `SearchListStoreService` | `store/biz-store-service/search-list/search-list-store.service.ts` | 搜索列表状态 |

---

## 5. 组件索引

### 布局组件

| 组件 | 路径 | 说明 |
|------|------|------|
| `DefaultComponent` | `layout/default/default.component.ts` | 主布局容器 |
| `SideNavComponent` | `layout/default/side-nav/` | 左侧菜单 |
| `NavBarComponent` | `layout/default/nav-bar/` | 顶部导航栏 |
| `NavDrawerComponent` | `layout/default/nav-drawer/` | 窄屏菜单抽屉 |
| `ToolBarComponent` | `layout/default/tool-bar/` | 顶部工具栏 |
| `TabComponent` | `layout/default/tab/` | 多页签 |
| `SettingDrawerComponent` | `layout/default/setting-drawer/` | 主题设置抽屉 |
| `RefreshEmptyComponent` | `layout/default/refresh-empty/` | Tab 刷新占位 |
| `BlankComponent` | `layout/blank/` | 空白布局 |

### 共享通用组件

| 组件 | 路径 | 说明 |
|------|------|------|
| `AntTableComponent` | `shared/components/ant-table/` | 封装 nz-table，支持分页/排序/checkbox/列宽拖拽 |
| `TreeTableComponent` | `shared/components/tree-table/` | 树形表格 |
| `PageHeaderComponent` | `shared/components/page-header/` | 页面头部 |
| `LockScreenComponent` | `shared/components/lock-screen/` | 锁屏遮罩 |
| `GlobalLoadingComponent` | `shared/components/global-loading/` | 全局 Loading |
| `TopProgressBarComponent` | `shared/components/top-progress-bar/` | 路由切换进度条 |
| `ChatComponent` | `shared/components/chat/` | 聊天窗口 |
| `WaterMarkComponent` | `shared/components/water-mark/` | 水印 |
| `FooterSubmitComponent` | `shared/components/footer-submit/` | 底部提交按钮区 |
| `CardTableWrapComponent` | `shared/components/card-table-wrap/` | 卡片表格容器 |
| `EmptyForLockComponent` | `shared/components/empty-for-lock/` | 锁屏时内容占位 |

### 共享业务组件

| 组件 | 路径 | 说明 |
|------|------|------|
| `IconSelComponent` | `shared/biz-components/icon-sel/` | 图标选择器 |
| `HomeNoticeComponent` | `shared/biz-components/layout-components/home-notice/` | 首页通知 |
| `LayoutHeadRightMenuComponent` | `shared/biz-components/layout-components/layout-head-right-menu/` | 顶部右侧菜单（用户信息/登出等） |
| `PasswordStrengthMeterComponent` | `shared/biz-components/password-strength-meter/` | 密码强度计 |

### 弹窗/抽屉业务组件

| 组件 | 路径 | 说明 |
|------|------|------|
| `AccountModalComponent` | `widget/biz-widget/system/account-modal/` | 账号新增/编辑弹窗 |
| `DeptManageModalComponent` | `widget/biz-widget/system/dept-manage-modal/` | 部门新增/编辑弹窗 |
| `MenuModalComponent` | `widget/biz-widget/system/menu-modal/` | 菜单新增/编辑弹窗 |
| `RoleManageModalComponent` | `widget/biz-widget/system/role-manage-modal/` | 角色新增/编辑弹窗 |
| `ChangePasswordComponent` | `widget/biz-widget/change-password/` | 修改密码弹窗 |
| `AppendFormModalComponent` | `widget/biz-widget/form/append-form-modal/` | 追加表单弹窗 |
| `LockWidgetComponent` | `widget/common-widget/lock-widget/` | 锁屏弹窗 |
| `SearchRouteComponent` | `widget/common-widget/search-route/` | 路由搜索弹窗 |

---

## 6. 指令与管道索引

### 指令

**目录**：`src/app/shared/directives/`  
（具体指令名需读取目录文件，**推断**：包含点击外部、水印、权限等指令）

### 管道

| 管道 | 文件 | 说明 |
|------|------|------|
| `MapPipe` | `shared/pipes/map.pipe.ts` | 对象属性映射 |
| `TableFiledPipe` | `shared/pipes/table-filed.pipe.ts` | 表格字段格式化 |
| `ContextPipePipe` | `shared/components/ant-table/context-pipe.pipe.ts` | 上下文管道（用于模板中传递上下文） |

---

## 7. 路由索引

### 完整路由树

```
/                           → 重定向 /login/login-form
/login                      → LoginComponent（blank 布局）
  /login/login-form         → LoginFormComponent
  /login/register-form      → RegisterFormComponent
/blank                      → BlankComponent
  /blank/other-login/login1/normal-login
  /blank/other-login/login1/phone-login
  /blank/other-login/login1/qr-login
  /blank/other-login/login1/regist-login
/default                    → DefaultComponent（主布局）
  /default/dashboard
    /default/dashboard/analysis
    /default/dashboard/monitor
    /default/dashboard/workbench
  /default/system
    /default/system/account
    /default/system/dept
    /default/system/menu
    /default/system/role-manager
      /default/system/role-manager/set-role
  /default/page-demo
    /default/page-demo/form
      /default/page-demo/form/base
      /default/page-demo/form/step
      /default/page-demo/form/advanced/task-manage-form
      /default/page-demo/form/advanced/user-member-manage
      /default/page-demo/form/advanced/warehouse-manage-form
    /default/page-demo/list
      /default/page-demo/list/search-table
        /default/page-demo/list/search-table/search-table-detail
      /default/page-demo/list/search-list/application
      /default/page-demo/list/search-list/article
      /default/page-demo/list/search-list/project
      /default/page-demo/list/standard-table
      /default/page-demo/list/card-table
      /default/page-demo/list/tree-list
    /default/page-demo/detail/base-detail
    /default/page-demo/detail/adv-detail
    /default/page-demo/personal/personal-center/application
    /default/page-demo/personal/personal-center/article
    /default/page-demo/personal/personal-center/projects
    /default/page-demo/personal/personal-setting/base
    /default/page-demo/personal/personal-setting/bind
    /default/page-demo/personal/personal-setting/notice
    /default/page-demo/personal/personal-setting/safe
    /default/page-demo/except/except403
    /default/page-demo/except/except404
    /default/page-demo/except/except500
    /default/page-demo/except/network-error
    /default/page-demo/except/no-data
    /default/page-demo/result/success
    /default/page-demo/result/fail
    /default/page-demo/flow/flow-chat
    /default/page-demo/task
    /default/page-demo/new-layout
    /default/page-demo/page-demo1~4
  /default/feat
    /default/feat/ex-modal
    /default/feat/ex-drawer
    /default/feat/msg
    /default/feat/frame/zorro-doc
    /default/feat/rich-text
    /default/feat/upload
    /default/feat/context-menu
    /default/feat/session-timeout
    /default/feat/click-out-side
    /default/feat/color-sel
    /default/feat/scroll/keep-scroll-page
    /default/feat/scroll/play-scroll
    /default/feat/img-preview
    /default/feat/tabs
      /default/feat/tabs/detail
    /default/feat/websocket
    /default/feat/full-screen
    /default/feat/icons
    /default/feat/charts/echarts/started/...
    /default/feat/charts/echarts/series/...
    /default/feat/charts/echarts/advanced/...
    /default/feat/charts/gaode-map
    /default/feat/charts/baidu-map
    /default/feat/ripple
    /default/feat/copy
    /default/feat/setup
    /default/feat/download
    /default/feat/qrcode
    /default/feat/water-mark
    /default/feat/keep-alive
    /default/feat/transitions/...
    /default/feat/signal-demo/...
    /default/feat/multilingual
  /default/comp
    /default/comp/transition
    /default/comp/basic
    /default/comp/lazy/...
    /default/comp/luckysheet
    /default/comp/desc
    /default/comp/strength-meter
    /default/comp/form/append-form
    /default/comp/form/shrink-form
    /default/comp/blingbling
  /default/level
    /default/level/menu1/menu1-1/menu1-1-1
    /default/level/menu1/menu1-1/menu1-1-2
    /default/level/menu1/menu1-2
    /default/level/menu2
  /default/about
  /default/refresh-empty    → 刷新占位路由（shouldDetach: 'no'）
/**                         → 重定向 /login/login-form
```

### 路由 data 字段说明

| 字段 | 说明 |
|------|------|
| `key` | 路由复用策略的唯一标识，也用于 Tab 标题 |
| `shouldDetach: 'no'` | 禁止路由复用缓存（登录页、刷新占位页等） |
| `preload: true` | 标记为预加载模块（`SelectivePreloadingStrategyService` 使用） |
| `needKeepScroll: 'no'` | 禁止记录滚动位置 |
| `scrollContain` | 需要记录滚动位置的容器选择器数组 |
| `title` | 浏览器标题（格式：`menu.default:模块:子模块`，i18n key） |
