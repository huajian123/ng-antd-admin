---
name: meta-index
description: ng-antd-admin 元模型总入口索引，导航到所有子文档
type: project
---

# Meta Index — ng-antd-admin

> 本索引是元模型的唯一入口。后续任务先读此文件，命中模块/对象/流程后，再展开最小必要文件集合。

## 项目一句话

**ng-antd-admin** 是一个基于 Angular 21（Zoneless + Signals）+ ng-zorro-antd 的中后台管理系统脚手架，包含完整的认证/权限体系、系统管理 CRUD、多页签路由复用、多主题切换，以及大量功能/组件示例页面。

---

## 文档导航

| 文档 | 说明 |
|------|------|
| [project-overview.md](project-overview.md) | 技术栈、架构类型、入口、主题体系、目录结构 |
| [module-index.md](module-index.md) | 模块地图（core/layout/pages/shared/widget/drawer/tpl/config/utils） |
| [functional-inventory.md](functional-inventory.md) | 功能清单（认证/仪表盘/系统管理/页面示例/功能示例/组件示例） |
| [auth-login-index.md](auth-login-index.md) | 认证与权限体系（登录流程/Token/守卫/权限码/锁屏） |
| [domain-model.md](domain-model.md) | 领域对象（UserInfo/Menu/User/Role/Permission/Dept 等） |
| [flow-index.md](flow-index.md) | 关键流程（启动/登录/登出/HTTP/Tab/路由复用/主题/Modal/Drawer） |
| [change-hotspots.md](change-hotspots.md) | 高风险变更区（BaseHttpService/SimpleReuseStrategy/TabService 等） |
| [secondary-indexes.md](secondary-indexes.md) | 二级索引（运行时边界/接口/配置/数据访问/组件/路由树） |

---

## 架构速览

```
架构类型：模块化单体前端 SPA
框架：Angular 21（Zoneless + Signals）
UI：ng-zorro-antd 21
状态：Angular Signals（无 NgRx）
路由：Hash + 自定义路由复用（SimpleReuseStrategy）
HTTP：函数式拦截器 + BaseHttpService 统一封装
认证：JWT（SessionStorage）+ 权限码数组
主题：4 套 CSS bundle 动态切换（default/dark/aliyun/compact）
Mock：MSW v2（开发环境）
```

---

## 模块速查

| 模块 | 路径 | 核心职责 |
|------|------|---------|
| core | `src/app/core/` | HTTP封装、守卫、Store、启动、拦截器 |
| layout/default | `src/app/layout/default/` | 主布局（侧边栏/顶栏/Tab/设置抽屉） |
| pages/system | `src/app/pages/system/` | 账号/角色/菜单/部门 CRUD |
| pages/dashboard | `src/app/pages/dashboard/` | 仪表盘（分析/监控/工作台） |
| pages/login | `src/app/pages/login/` | 登录/注册 |
| shared | `src/app/shared/` | 通用组件/指令/管道 |
| widget | `src/app/widget/` | 业务弹窗/抽屉组件 |

---

## 关键服务速查

| 服务 | 文件 | 一句话 |
|------|------|--------|
| `BaseHttpService` | `core/services/http/base-http.service.ts` | 所有 HTTP 请求的基础封装 |
| `LoginInOutService` | `core/services/common/login-in-out.service.ts` | 登录/登出核心流程 |
| `TabService` | `core/services/common/tab.service.ts` | 多页签增删改查 |
| `SimpleReuseStrategy` | `core/services/common/reuse-strategy.ts` | 路由复用缓存策略 |
| `ThemeService` | `store/common-store/theme.service.ts` | 主题/布局 Signal Store |
| `MenuStoreService` | `store/common-store/menu-store.service.ts` | 菜单树 Signal Store |
| `UserInfoStoreService` | `store/common-store/userInfo-store.service.ts` | 用户信息 Signal Store |
| `ModalWrapService` | `widget/base-modal.ts` | 可拖拽/全屏 Modal 封装 |
| `DrawerWrapService` | `drawer/base-drawer.ts` | Drawer 统一封装 |

---

## 领域对象速查

| 对象 | 文件 | 关键字段 |
|------|------|---------|
| `UserInfo` | `store/common-store/userInfo-store.service.ts` | userId, userName, authCode[] |
| `Menu` | `core/services/types.ts` | id, fatherId, path, menuType(C/F), code |
| `User` | `http/system/account.service.ts` | id, userName, available, roleName[], departmentId |
| `Role` | `http/system/role.service.ts` | id, roleName, roleDesc |
| `Permission` | `http/system/role.service.ts` | code, menuGrade, permissionVo[], checked |
| `Dept` | `http/system/dept.service.ts` | id, departmentName, fatherId, state |
| `PageInfo<T>` | `core/services/types.ts` | pageIndex, pageSize, total, list[] |
| `AntTableConfig` | `shared/components/ant-table/` | pageIndex, pageSize, total, loading, headers[] |

---

## 系统管理 API 速查

| 模块 | 查询 | 新增 | 编辑 | 删除 |
|------|------|------|------|------|
| 用户 | POST `/user/list` | POST `/user/create` | PUT `/user/update` | POST `/user/del/` |
| 角色 | POST `/role/list` | POST `/role/create` | PUT `/role/update` | POST `/role/del` |
| 菜单 | POST `/menu/list` | POST `/menu/create` | PUT `/menu/update` | POST `/menu/del` |
| 部门 | POST `/department/list` | POST `/department/create` | PUT `/department/update` | POST `/department/del/` |

---

## 高风险区速查

| 风险 | 文件 | 说明 |
|------|------|------|
| 🔴 HTTP 基础 | `core/services/http/base-http.service.ts` | 改动影响所有接口 |
| 🔴 路由复用 | `core/services/common/reuse-strategy.ts` | 改动影响所有 Tab 缓存 |
| 🔴 登录流程 | `core/services/common/login-in-out.service.ts` | 改动影响认证链路 |
| 🔴 Tab 管理 | `core/services/common/tab.service.ts` | 边界条件复杂 |
| 🔴 主题体系 | `store/common-store/theme.service.ts` | 改动影响全局布局 |
| 🟡 Modal 服务 | `widget/base-modal.ts` | 改动影响所有弹窗 |
| 🟡 通用表格 | `shared/components/ant-table/` | 改动影响所有列表页 |

→ 详见 [change-hotspots.md](change-hotspots.md)

---

## 待验证问题

| 问题 | 风险 |
|------|------|
| `default-routing.ts` 中 `canActivateChild: []` 为空，路由守卫是否真正生效？ | 高 |
| `LoginInOutService` 中 `takeUntilDestroyed` 在 root 服务中是否会提前取消订阅？ | 中 |
| `SimpleReuseStrategy.handlers` 静态 Map 是否存在内存泄漏？ | 中 |
| `public/i18n/` 目录下的语言文件结构？ | 低 |

---

## 更新记录

| 日期 | 内容 |
|------|------|
| 2026-04-30 | 初始逆向，覆盖全部模块、功能清单、认证体系、领域对象、关键流程、高风险区、二级索引 |
