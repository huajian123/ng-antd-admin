---
updated: 2026-04-11
version: v3 (frontend-spa-compliant)
---

# Meta Index — ng-antd-admin

> 总入口索引。每次处理需求/Bug 先读这里，命中节点后再展开最小必要文件。

## 项目一句话

基于 Angular 21 + ng-zorro-antd 21 的**中后台管理系统模板**，无数据库，前端纯 SPA，使用 MSW 模拟后端接口。

## 文档索引

| 文档 | 内容 |
|------|------|
| [project-overview.md](./project-overview.md) | 技术栈、架构类型、启动流程、关键配置 |
| [module-index.md](./module-index.md) | 所有页面模块地图（路由 → 组件 → 文件，含全部子路由） |
| [functional-inventory.md](./functional-inventory.md) | 功能清单（功能名 → 路由 → 源码文件） |
| [auth-login-index.md](./auth-login-index.md) | 认证与权限：JWT、权限码、路由守卫、锁屏、登录超时 |
| [flow-index.md](./flow-index.md) | 核心流程：登录、权限、路由复用、主题切换、HTTP、登出 |
| [domain-model.md](./domain-model.md) | 核心领域对象：Menu、UserInfo、SettingInterface、PageInfo、ActionCode |
| [widget-drawer-index.md](./widget-drawer-index.md) | 所有 Modal/Drawer 业务组件、Widget、业务 Store |
| [change-hotspots.md](./change-hotspots.md) | 高风险变更区、热点文件 |
| [secondary-indexes.md](./secondary-indexes.md) | 二级索引目录入口 |
| [runtime-boundaries.md](./runtime-boundaries.md) | 请求入口、异步入口、外部系统边界、浏览器存储边界 |
| [interface-index.md](./interface-index.md) | 全部 HTTP API 契约（认证/用户/菜单/部门/角色/权限） |
| [config-index.md](./config-index.md) | 常量、环境变量、主题默认值、路由配置、风险热点 |
| [data-access-index.md](./data-access-index.md) | sessionStorage/localStorage/Signal/BehaviorSubject/HTTP 读写边界 |
| [state-model.md](./state-model.md) | 全局 Signal/BehaviorSubject 状态节点、computed/effect 依赖链、持久化边界、HTTP 数据落点 |
| [component-tree.md](./component-tree.md) | 懒加载边界、OnPush 变更检测依赖、动态组件插入点、路由复用缓存边界、渲染性能边界 |
| [deps-boundary.md](./deps-boundary.md) | 第三方库版本锁定风险、CDN 依赖、API 不稳定库、仅开发环境依赖 |

## 架构快照（已确认事实）

- **类型**：模块化单体 SPA，无后端，MSW mock 全部接口
- **Angular**：v21，Zoneless（`provideZonelessChangeDetection`），Standalone Components
- **状态管理**：Signal（组件级）+ BehaviorSubject（菜单 store）+ signal store（主题/用户信息）
- **路由**：Hash 路由，懒加载，路由复用策略（`SimpleReuseStrategy`），Tab 多页签
- **HTTP**：`BaseHttpService` 统一封装，JWT Bearer Token，MSW 拦截
- **主题**：4 套皮肤（default/dark/aliyun/compact），Less + `.themeMixin()`，运行时动态切换

## 热区（变更频率高）

- `src/app/layout/default/` — 布局壳（NavBar、SideNav、Tab、SettingDrawer）
- `src/app/core/services/store/common-store/` — 全局状态（主题、菜单、用户信息）
- `src/app/pages/comp/` — 组件演示页，当前有未完成占位页
- `src/app/pages/feat/` — 功能演示页，当前有未完成占位页

## 未决问题

- 无（首轮全项目建模已完成）
