---
name: functional-inventory
description: ng-antd-admin 功能清单，按业务域列出所有功能项及其路由、服务、权限码映射
type: project
---

# 功能清单索引

## 功能清单总览

| 功能域 | 功能数 | 路由前缀 |
|--------|--------|---------|
| 认证 | 3 | `/login` |
| 仪表盘 | 3 | `/default/dashboard` |
| 系统管理 | 4 | `/default/system` |
| 页面示例 | 15+ | `/default/page-demo` |
| 功能示例 | 20+ | `/default/feat` |
| 组件示例 | 8+ | `/default/comp` |
| 多级菜单 | 4 | `/default/level` |
| 关于 | 1 | `/default/about` |

---

## 一、认证功能

### F-AUTH-01 账号密码登录

| 项 | 值 |
|----|-----|
| 路由 | `/login/login-form` |
| 组件 | `pages/login/login-form/login-form.component.ts` |
| 服务 | `LoginService.login()` → POST `/auth/signin` |
| 权限码 | 无（公开页面） |
| 关键流程 | → [flow-index.md#2-登录流程](flow-index.md) |
| 证据级别 | 事实 |

### F-AUTH-02 注册

| 项 | 值 |
|----|-----|
| 路由 | `/login/register-form` |
| 组件 | `pages/login/register-form/register-form.component.ts` |
| 服务 | 推断调用注册接口（待验证） |
| 权限码 | 无 |
| 证据级别 | 推断 |

### F-AUTH-03 其他登录方式（示例）

| 项 | 值 |
|----|-----|
| 路由 | `/blank/other-login/login1/...` |
| 子页面 | normal-login / phone-login / qr-login / regist-login |
| 组件 | `pages/other-login/login1/` |
| 说明 | 演示多种登录 UI 形态，非生产登录入口 |
| 证据级别 | 事实 |

---

## 二、仪表盘

### F-DASH-01 数据分析

| 项 | 值 |
|----|-----|
| 路由 | `/default/dashboard/analysis` |
| 组件 | `pages/dashboard/analysis/analysis.component.ts` |
| 说明 | 图表密集型页面，ECharts/G2Plot 展示数据 |
| 权限码 | 推断需要菜单权限 |
| 证据级别 | 事实（路由）/ 推断（内容） |

### F-DASH-02 监控

| 项 | 值 |
|----|-----|
| 路由 | `/default/dashboard/monitor` |
| 组件 | `pages/dashboard/monitor/monitor.component.ts` |
| 证据级别 | 事实 |

### F-DASH-03 工作台

| 项 | 值 |
|----|-----|
| 路由 | `/default/dashboard/workbench` |
| 组件 | `pages/dashboard/workbench/workbench.component.ts` |
| 证据级别 | 事实 |

---

## 三、系统管理

### F-SYS-01 账号管理

| 项 | 值 |
|----|-----|
| 路由 | `/default/system/account` |
| 组件 | `pages/system/account/account.component.ts` |
| HTTP 服务 | `AccountService`（`core/services/http/system/account.service.ts`） |
| 弹窗组件 | `widget/biz-widget/system/account-modal/` |
| API | POST `/user/list`、GET `/user/{id}`、POST `/user/create`、PUT `/user/update`、POST `/user/del/` |
| 权限码 | `AccountAdd` / `AccountEdit` / `AccountDel` |
| 关键字段 | id, userName, password, available, roleName[], sex, telephone, mobile, email, departmentId |
| grep 关键词 | `AccountService`, `account-modal`, `ActionCode.AccountAdd` |
| 证据级别 | 事实 |

### F-SYS-02 角色管理

| 项 | 值 |
|----|-----|
| 路由 | `/default/system/role-manager` |
| 组件 | `pages/system/role-manager/` |
| 子路由 | `set-role`（权限分配子页面） |
| HTTP 服务 | `RoleService`（`core/services/http/system/role.service.ts`） |
| 弹窗组件 | `widget/biz-widget/system/role-manage-modal/` |
| API | POST `/role/list`、GET `/role/{id}`、POST `/role/create`、PUT `/role/update`、POST `/role/del`、GET `/permission/list-role-resources/{id}`、POST `/permission/assign-role-menu` |
| 权限码 | `RoleManagerAdd` / `RoleManagerEdit` / `RoleManagerDel` / `RoleManagerSetRole` |
| 关键字段 | id, roleName, roleDesc；权限分配：permCodes[], roleId |
| grep 关键词 | `RoleService`, `role-manage-modal`, `ActionCode.RoleManager` |
| 证据级别 | 事实 |

### F-SYS-03 菜单管理

| 项 | 值 |
|----|-----|
| 路由 | `/default/system/menu` |
| 组件 | `pages/system/menu/menu.component.ts` |
| HTTP 服务 | `MenusService`（`core/services/http/system/menus.service.ts`） |
| 弹窗组件 | `widget/biz-widget/system/menu-modal/` |
| API | POST `/menu/list`、GET `/menu/{id}`、POST `/menu/create`、PUT `/menu/update`、POST `/menu/del` |
| 权限码 | `MenuAdd` / `MenuEdit` / `MenuDel` / `MenuAddLowLevel` |
| 关键字段 | menuName, code, icon, alIcon, orderNum, menuType(C/F), path, visible, status, newLinkFlag |
| grep 关键词 | `MenusService`, `menu-modal`, `ActionCode.Menu` |
| 证据级别 | 事实 |

### F-SYS-04 部门管理

| 项 | 值 |
|----|-----|
| 路由 | `/default/system/dept` |
| 组件 | `pages/system/dept/dept.component.ts` |
| HTTP 服务 | `DeptService`（`core/services/http/system/dept.service.ts`） |
| 弹窗组件 | `widget/biz-widget/system/dept-manage-modal/` |
| API | POST `/department/list`、GET `/department/{id}`、POST `/department/create`、PUT `/department/update`、POST `/department/del/` |
| 权限码 | `DeptAdd` / `DeptEdit` / `DeptDel` / `DeptAddLowLevel` |
| 关键字段 | id, departmentName, fatherId, state(0/1), orderNum |
| grep 关键词 | `DeptService`, `dept-manage-modal`, `ActionCode.Dept` |
| 证据级别 | 事实 |

---

## 四、页面示例（page-demo）

### F-PD-01 基础表单

| 路由 | `/default/page-demo/form/base` |
|------|-------------------------------|
| 组件 | `pages/page-demo/form/base/` |
| 证据级别 | 事实 |

### F-PD-02 分步表单

| 路由 | `/default/page-demo/form/step` |
|------|-------------------------------|
| 组件 | `pages/page-demo/form/step/`（step-one/step-two/step-three） |
| 证据级别 | 事实 |

### F-PD-03 高级表单（任务管理/用户成员/仓库管理）

| 路由 | `/default/page-demo/form/advanced` |
|------|-----------------------------------|
| 组件 | `pages/page-demo/form/advanced/`（task-manage-form/user-member-manage/warehouse-manage-form） |
| 证据级别 | 事实 |

### F-PD-04 查询表格

| 路由 | `/default/page-demo/list/search-table` |
|------|---------------------------------------|
| 组件 | `pages/page-demo/list/search-table/` |
| 子路由 | `search-table-detail`（详情页，需权限码 `SearchTableDetail`） |
| 证据级别 | 事实 |

### F-PD-05 搜索列表（应用/文章/项目）

| 路由 | `/default/page-demo/list/search-list` |
|------|--------------------------------------|
| 组件 | `pages/page-demo/list/search-list/`（application/article/project） |
| 证据级别 | 事实 |

### F-PD-06 标准表格

| 路由 | `/default/page-demo/list/standard-table` |
|------|----------------------------------------|
| 组件 | `pages/page-demo/list/standard-table/` |
| 证据级别 | 事实 |

### F-PD-07 卡片表格

| 路由 | `/default/page-demo/list/card-table` |
|------|-------------------------------------|
| 组件 | `pages/page-demo/list/card-table/` |
| 证据级别 | 事实 |

### F-PD-08 树形列表

| 路由 | `/default/page-demo/list/tree-list` |
|------|-------------------------------------|
| 组件 | `pages/page-demo/list/tree-list/` |
| 证据级别 | 事实 |

### F-PD-09 基础详情 / 高级详情

| 路由 | `/default/page-demo/detail/base-detail`、`/adv-detail` |
|------|------------------------------------------------------|
| 组件 | `pages/page-demo/detail/` |
| 证据级别 | 事实 |

### F-PD-10 个人中心

| 路由 | `/default/page-demo/personal/personal-center` |
|------|----------------------------------------------|
| 子页面 | application / article / projects |
| 证据级别 | 事实 |

### F-PD-11 个人设置

| 路由 | `/default/page-demo/personal/personal-setting` |
|------|-----------------------------------------------|
| 子页面 | base / bind / notice / safe |
| 证据级别 | 事实 |

### F-PD-12 异常页（403/404/500/网络错误/无数据）

| 路由 | `/default/page-demo/except/except403` 等 |
|------|----------------------------------------|
| 组件 | `pages/page-demo/except/` |
| 证据级别 | 事实 |

### F-PD-13 结果页（成功/失败）

| 路由 | `/default/page-demo/result/success`、`/fail` |
|------|---------------------------------------------|
| 证据级别 | 事实 |

### F-PD-14 流程图

| 路由 | `/default/page-demo/flow/flow-chat` |
|------|-------------------------------------|
| 组件 | `pages/page-demo/flow/flow-chat/` |
| 依赖 | AntV X6（`@antv/x6`） |
| 证据级别 | 事实 |

### F-PD-15 任务管理

| 路由 | `/default/page-demo/task` |
|------|--------------------------|
| 组件 | `pages/page-demo/task/`（task-list-panel/task-search-info） |
| 证据级别 | 事实 |

---

## 五、功能示例（feat）

| 功能 | 路由 | 关键依赖 |
|------|------|---------|
| 扩展 Modal | `/default/feat/ex-modal` | `ModalWrapService` |
| 扩展 Drawer | `/default/feat/ex-drawer` | `DrawerWrapService` |
| 消息通知 | `/default/feat/msg` | NzMessageService |
| 内嵌 iframe | `/default/feat/frame/zorro-doc` | — |
| 富文本编辑器 | `/default/feat/rich-text` | TinyMCE |
| 文件上传 | `/default/feat/upload` | — |
| 右键菜单 | `/default/feat/context-menu` | — |
| 会话超时 | `/default/feat/session-timeout` | `login-expired.service.ts` |
| 点击外部 | `/default/feat/click-out-side` | 自定义指令 |
| 颜色选择器 | `/default/feat/color-sel` | ngx-color-picker |
| 滚动 | `/default/feat/scroll/keep-scroll-page`、`play-scroll` | ScrollService |
| 图片预览 | `/default/feat/img-preview` | — |
| 多页签示例 | `/default/feat/tabs`（含 detail 子路由） | TabService |
| WebSocket | `/default/feat/websocket` | — |
| 全屏 | `/default/feat/full-screen` | screenfull |
| 图标 | `/default/feat/icons` | ant-design/icons-angular |
| ECharts 图表 | `/default/feat/charts/echarts/...` | ngx-echarts |
| 高德地图 | `/default/feat/charts/gaode-map` | @amap/amap-jsapi-loader |
| 百度地图 | `/default/feat/charts/baidu-map` | — |
| 水印 | `/default/feat/water-mark` | `WaterMarkService` |
| 二维码 | `/default/feat/qrcode` | qrcode |
| 文件下载 | `/default/feat/download` | `DownloadService`、file-saver |
| Signal 示例 | `/default/feat/signal-demo/...` | Angular Signals |
| 多语言 | `/default/feat/multilingual` | @ngx-translate/core |
| 过渡动画 | `/default/feat/transitions/...` | Angular View Transitions |
| 涟漪效果 | `/default/feat/ripple` | — |
| 复制 | `/default/feat/copy` | — |
| 引导 | `/default/feat/setup` | driver.js |
| Keep Alive | `/default/feat/keep-alive` | SimpleReuseStrategy |

---

## 六、组件示例（comp）

| 功能 | 路由 | 关键依赖 |
|------|------|---------|
| 过渡动画 | `/default/comp/transition` | Angular animations |
| 基础组件 | `/default/comp/basic` | ng-zorro-antd |
| 懒加载 | `/default/comp/lazy/...` | Angular lazy loading |
| 表格（LuckySheet） | `/default/comp/luckysheet` | LuckySheet |
| 描述列表 | `/default/comp/desc` | — |
| 密码强度计 | `/default/comp/strength-meter` | @zxcvbn-ts |
| 表单（追加/收缩） | `/default/comp/form/append-form`、`shrink-form` | — |
| 炫酷效果 | `/default/comp/blingbling` | — |

---

## 七、多级菜单示例（level）

| 路由 | 说明 |
|------|------|
| `/default/level/menu1/menu1-1/menu1-1-1` | 三级菜单示例 |
| `/default/level/menu1/menu1-1/menu1-1-2` | 三级菜单示例 |
| `/default/level/menu1/menu1-2` | 二级菜单示例 |
| `/default/level/menu2` | 二级菜单示例 |

---

## 八、全局功能（非路由页面）

| 功能 | 入口 | 实现 |
|------|------|------|
| 修改密码 | 顶部右侧菜单 | `widget/biz-widget/change-password/` |
| 锁屏 | 顶部工具栏 | `shared/components/lock-screen/`、`widget/common-widget/lock-widget/` |
| 路由搜索 | 顶部工具栏 | `widget/common-widget/search-route/` |
| 主题设置 | 右侧设置抽屉 | `layout/default/setting-drawer/` |
| 全局 Loading | 自动 | `shared/components/global-loading/` |
| 顶部进度条 | 路由切换时 | `shared/components/top-progress-bar/` |
| 聊天窗口 | 布局内 | `shared/components/chat/` |
| 水印 | 布局内 | `shared/components/water-mark/` |
| 引导（首次登录） | 自动触发 | `DriverService`（driver.js） |
