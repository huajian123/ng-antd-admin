---
name: module-index
description: ng-antd-admin 模块地图，各模块职责、入口、上下游依赖、典型变更点
type: project
---

# 模块索引

## 模块地图总览

```
ng-antd-admin
├── [core]        核心基础层（服务、拦截器、守卫、启动）
├── [layout]      布局层（default 主布局 / blank 空白布局）
├── [pages]       页面层（按业务域分组）
│   ├── login         登录/注册
│   ├── dashboard     仪表盘
│   ├── system        系统管理（账号/角色/菜单/部门）
│   ├── page-demo     页面示例（表单/列表/详情/个人中心等）
│   ├── feat          功能示例（图表/地图/富文本/WebSocket等）
│   ├── comp          组件示例（过渡/懒加载/表单等）
│   ├── level         多级菜单示例
│   └── other-login   其他登录方式示例
├── [shared]      共享组件/指令/管道
├── [widget]      弹窗/抽屉业务组件
├── [drawer]      抽屉服务封装
├── [tpl]         全局模板（Modal/Drawer 按钮）
├── [config]      常量与权限码
└── [utils]       工具函数
```

---

## 1. core — 核心基础层

**职责**：应用启动、HTTP 封装、认证守卫、全局 Signal Store、主题/语言/锁屏等基础能力。

| 子模块 | 路径 | 关键文件 |
|--------|------|---------|
| startup | `core/startup/` | `startup.service.ts` — 应用初始化，读 token → loginIn |
| http 基础 | `core/services/http/` | `base-http.service.ts` — 统一 GET/POST/PUT/DELETE 封装 |
| http 业务 | `core/services/http/login/` | `login.service.ts` — 登录/登出/菜单接口 |
| http 业务 | `core/services/http/system/` | `account/dept/menus/role.service.ts` |
| http 业务 | `core/services/http/download/` | `download.service.ts` |
| 拦截器 | `core/services/interceptors/` | `http-interceptor.ts`（Token 注入）、`login-expired.service.ts` |
| 守卫 | `core/services/common/guard/` | `judgeLogin.guard.ts`（Token 检查）、`judgeAuth.guard.ts`（权限检查） |
| 通用服务 | `core/services/common/` | tab、reuse-strategy、theme-skin、window、scroll、lazy、driver 等 |
| Signal Store | `core/services/store/common-store/` | menu、userInfo、theme、lockScreen、language、spin、splitNav、windowsWidth |
| Signal Store | `core/services/store/biz-store-service/` | login1-store、search-list-store |
| 类型定义 | `core/services/types.ts` | Menu、PageInfo、SearchCommonVO、OptionsInterface 等公共接口 |
| 验证器 | `core/services/validators/` | 自定义表单验证规则 |

**上游**：无（基础层）  
**下游**：layout、pages、shared、widget 均依赖 core

**典型变更点**：
- 修改 Token 存储方式 → `constant.ts` + `http-interceptor.ts` + `window.service.ts`
- 新增全局 Store → `core/services/store/common-store/`
- 修改 API 基础路径 → `base-http.service.ts` + `environment.ts`

---

## 2. layout — 布局层

**职责**：提供两套布局容器，default 为主后台布局（含侧边栏/顶栏/Tab/设置抽屉），blank 为空白布局（用于登录等全屏页）。

| 子模块 | 路径 | 关键文件 |
|--------|------|---------|
| default 布局 | `layout/default/` | `default.component.ts` — 主布局容器 |
| 侧边导航 | `layout/default/side-nav/` | 左侧菜单树 |
| 顶部导航栏 | `layout/default/nav-bar/` | 顶部 Logo + 折叠按钮 |
| 导航抽屉 | `layout/default/nav-drawer/` | 窄屏时菜单变为抽屉 |
| 工具栏 | `layout/default/tool-bar/` | 顶部右侧工具区 |
| Tab 页签 | `layout/default/tab/` | 多页签管理 |
| 设置抽屉 | `layout/default/setting-drawer/` | 主题/布局设置面板 |
| 刷新占位 | `layout/default/refresh-empty/` | Tab 刷新时的占位路由 |
| blank 布局 | `layout/blank/` | 空白布局（登录页使用） |

**上游**：core（ThemeService、TabService、MenuStoreService、SplitNavStoreService）  
**下游**：pages（通过 RouterOutlet 渲染页面内容）

**典型变更点**：
- 布局模式切换（side/top/mixin）→ `default.component.ts` + `ThemeService`
- Tab 行为修改 → `tab/tab.component.ts` + `tab.service.ts`
- 菜单渲染 → `side-nav/` + `MenuStoreService`

---

## 3. pages — 页面层

### 3.1 login — 登录模块

| 路径 | 说明 |
|------|------|
| `pages/login/` | 主登录页容器（blank 布局） |
| `pages/login/login-form/` | 账号密码登录表单 |
| `pages/login/register-form/` | 注册表单 |
| `pages/other-login/login1/` | 其他登录方式示例（手机/二维码/注册） |

**路由**：`/login/login-form`（默认入口）

### 3.2 dashboard — 仪表盘

| 路径 | 说明 |
|------|------|
| `pages/dashboard/analysis/` | 数据分析页（图表密集） |
| `pages/dashboard/monitor/` | 监控页 |
| `pages/dashboard/workbench/` | 工作台 |

**路由**：`/default/dashboard/analysis`（登录后默认跳转）

### 3.3 system — 系统管理

| 路径 | 说明 | 对应 HTTP 服务 |
|------|------|--------------|
| `pages/system/account/` | 账号管理 | `AccountService` |
| `pages/system/role-manager/` | 角色管理 + 权限分配 | `RoleService` |
| `pages/system/menu/` | 菜单管理 | `MenusService` |
| `pages/system/dept/` | 部门管理 | `DeptService` |

**路由**：`/default/system/account` 等

### 3.4 page-demo — 页面示例

| 子模块 | 路径 |
|--------|------|
| 表单示例 | `pages/page-demo/form/`（base/step/advanced） |
| 列表示例 | `pages/page-demo/list/`（search-table/search-list/standard-table/card-table/tree-list） |
| 详情示例 | `pages/page-demo/detail/`（base-detail/adv-detail） |
| 个人中心 | `pages/page-demo/personal/`（personal-center/personal-setting） |
| 异常页 | `pages/page-demo/except/`（403/404/500/network-error/no-data） |
| 结果页 | `pages/page-demo/result/`（success/fail） |
| 流程图 | `pages/page-demo/flow/flow-chat/`（AntV X6） |
| 任务管理 | `pages/page-demo/task/` |
| 新布局 | `pages/page-demo/new-page-layout/` |

### 3.5 feat — 功能示例

| 功能 | 路径 |
|------|------|
| 扩展 Modal | `feat/ex-modal/` |
| 扩展 Drawer | `feat/ex-drawer/` |
| 消息通知 | `feat/msg/` |
| 内嵌 iframe | `feat/frame/` |
| 富文本 | `feat/rich-text/`（TinyMCE） |
| 文件上传 | `feat/upload/` |
| 右键菜单 | `feat/context-menu/` |
| 会话超时 | `feat/session-timeout/` |
| 颜色选择器 | `feat/color-sel/` |
| 滚动 | `feat/scroll/` |
| 图片预览 | `feat/img-preview/` |
| 多页签示例 | `feat/tabs/` |
| WebSocket | `feat/websocket/` |
| 全屏 | `feat/full-screen/` |
| 图标 | `feat/icons/` |
| 图表 | `feat/charts/`（ECharts/高德/百度地图） |
| 水印 | `feat/water-mark/` |
| 二维码 | `feat/qrcode/` |
| 下载 | `feat/download/` |
| Signal 示例 | `feat/signal-demo/` |
| 多语言 | `feat/multilingual/` |
| 过渡动画 | `feat/transitions/` |

### 3.6 comp — 组件示例

| 功能 | 路径 |
|------|------|
| 过渡动画 | `comp/transition/` |
| 基础组件 | `comp/basic/` |
| 懒加载 | `comp/lazy/` |
| 表格 | `comp/luckysheet/` |
| 描述列表 | `comp/desc/` |
| 密码强度 | `comp/strength-meter/` |
| 表单 | `comp/form/` |
| 炫酷效果 | `comp/blingbling/` |

---

## 4. shared — 共享层

**职责**：跨页面复用的通用组件、业务组件、指令、管道。

| 子模块 | 路径 | 说明 |
|--------|------|------|
| 通用组件 | `shared/components/ant-table/` | 封装 nz-table，支持分页/排序/checkbox/列宽拖拽 |
| 通用组件 | `shared/components/tree-table/` | 树形表格 |
| 通用组件 | `shared/components/page-header/` | 页面头部 |
| 通用组件 | `shared/components/lock-screen/` | 锁屏组件 |
| 通用组件 | `shared/components/global-loading/` | 全局 Loading |
| 通用组件 | `shared/components/top-progress-bar/` | 顶部进度条 |
| 通用组件 | `shared/components/chat/` | 聊天窗口 |
| 通用组件 | `shared/components/water-mark/` | 水印 |
| 通用组件 | `shared/components/footer-submit/` | 底部提交按钮 |
| 通用组件 | `shared/components/card-table-wrap/` | 卡片表格容器 |
| 通用组件 | `shared/components/empty-for-lock/` | 锁屏占位 |
| 业务组件 | `shared/biz-components/icon-sel/` | 图标选择器 |
| 业务组件 | `shared/biz-components/layout-components/` | 布局头部右侧菜单、通知 |
| 业务组件 | `shared/biz-components/password-strength-meter/` | 密码强度计 |
| 指令 | `shared/directives/` | 通用指令 |
| 管道 | `shared/pipes/` | map.pipe、table-filed.pipe 等 |

---

## 5. widget — 弹窗/抽屉业务组件

**职责**：封装业务弹窗（Modal）和抽屉（Drawer）组件，通过 `ModalWrapService` / `DrawerWrapService` 调用。

| 子模块 | 路径 | 说明 |
|--------|------|------|
| 修改密码 | `widget/biz-widget/change-password/` | |
| 拖拽示例 | `widget/biz-widget/drag/` | |
| 表单弹窗 | `widget/biz-widget/form/append-form-modal/` | |
| 登录弹窗 | `widget/biz-widget/login/` | 登录超时弹窗 |
| 系统弹窗 | `widget/biz-widget/system/` | account/dept/menu/role 的新增编辑弹窗 |
| 任务弹窗 | `widget/biz-widget/task/` | |
| 通用弹窗 | `widget/common-widget/lock-widget/` | 锁屏弹窗 |
| 通用弹窗 | `widget/common-widget/search-route/` | 路由搜索弹窗 |
| Modal 服务 | `widget/modal/` | ModalWrapService（可拖拽、全屏、z-index 管理） |

---

## 6. drawer — 抽屉服务封装

| 路径 | 说明 |
|------|------|
| `drawer/base-drawer.ts` | `DrawerWrapService` — 统一抽屉打开/关闭/确认/取消 |
| `drawer/biz-drawer/ex-drawer-drawer/` | 示例业务抽屉 |

---

## 7. tpl — 全局模板

| 路径 | 说明 |
|------|------|
| `tpl/global-modal-btn-tpl/` | Modal 确认/取消按钮模板（含全屏图标） |
| `tpl/global-drawer-foot-tpl/` | Drawer 底部确认/取消按钮模板 |

---

## 8. config — 配置层

| 文件 | 说明 |
|------|------|
| `config/constant.ts` | Token、主题、锁屏、菜单宽度等常量 |
| `config/actionCode.ts` | 权限码枚举（系统管理 CRUD + 特殊页面权限） |

---

## 9. utils — 工具层

| 文件 | 说明 |
|------|------|
| `utils/tools.ts` | UUID、路由 key 计算、路径处理等 |
| `utils/treeTableTools.ts` | 扁平数据转树形结构 |
| `utils/camelFn.ts` | 驼峰转换 |
| `utils/errors.ts` | 自定义错误抛出 |
| `utils/validate/` | 验证工具函数 |
