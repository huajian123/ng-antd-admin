---
updated: 2026-04-10
---

# Widget & Drawer Index — 弹窗/抽屉组件索引

> 项目中所有 Modal/Drawer 形式的业务组件，统一在此索引。

## Modal 基础设施（已确认事实）

| 文件 | 职责 |
|------|------|
| `widget/modal/nz-modal-wrap.service.ts` | NzModal 封装服务，统一打开方式 |
| `widget/modal/modal-drag.directive.ts` | Modal 拖拽指令 |
| `widget/modal/modal-drag.service.ts` | Modal 拖拽服务 |
| `widget/modal/modal-resize.directive.ts` | Modal 缩放指令 |
| `widget/modal/modal-resize.service.ts` | Modal 缩放服务 |
| `tpl/global-modal-btn-tpl/` | 全局 Modal 按钮模板（确认/取消） |

## Drawer 基础设施（已确认事实）

| 文件 | 职责 |
|------|------|
| `drawer/base-drawer.ts` | Drawer 基类 |
| `drawer/biz-drawer/ex-drawer-drawer/` | 封装抽屉演示 |
| `tpl/global-drawer-foot-tpl/` | 全局 Drawer 底部按钮模板 |

---

## 业务 Modal 组件（已确认事实）

### 系统管理类

| 组件 | 路径 | 用途 |
|------|------|------|
| AccountModal | `widget/biz-widget/system/account-modal/` | 账号新增/编辑 |
| DeptManageModal | `widget/biz-widget/system/dept-manage-modal/` | 部门新增/编辑 |
| MenuModal | `widget/biz-widget/system/menu-modal/` | 菜单新增/编辑 |
| RoleManageModal | `widget/biz-widget/system/role-manage-modal/` | 角色新增/编辑 |

### 认证类

| 组件 | 路径 | 用途 |
|------|------|------|
| LoginModal | `widget/biz-widget/login/login-modal.component.ts` | 登录超时重新登录弹窗 |
| ChangePassword | `widget/biz-widget/change-password/change-password.component.ts` | 修改密码弹窗 |

### 功能类

| 组件 | 路径 | 用途 |
|------|------|------|
| AppendFormModal | `widget/biz-widget/form/append-form-modal/` | 追加表单弹窗 |
| TaskModal | `widget/biz-widget/task/task-modal.component.ts` | 任务弹窗 |
| DragModal | `widget/biz-widget/drag/drag.component.ts` | 拖拽 Modal 演示 |

---

## 通用 Widget（已确认事实）

| 组件 | 路径 | 用途 |
|------|------|------|
| LockWidget | `widget/common-widget/lock-widget/` | 锁屏解锁弹窗 |
| SearchRoute | `widget/common-widget/search-route/` | 全局路由搜索（快捷跳转） |

---

## 业务 Drawer 组件（已确认事实）

| 组件 | 路径 | 用途 |
|------|------|------|
| ExDrawerDrawer | `drawer/biz-drawer/ex-drawer-drawer/` | 封装抽屉演示 |

---

## 业务 Store（已确认事实）

| 服务 | 路径 | 用途 |
|------|------|------|
| Login1StoreService | `core/services/store/biz-store-service/other-login/login1-store.service.ts` | 第三方登录状态 |
| SearchListStoreService | `core/services/store/biz-store-service/search-list/search-list-store.service.ts` | 搜索列表页状态 |
