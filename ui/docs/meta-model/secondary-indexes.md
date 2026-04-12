---
updated: 2026-04-11
---

# Secondary Indexes — 二级索引目录

> 一级索引回答"系统是什么"，二级索引回答"去哪里下钻"。

- [运行时边界](./runtime-boundaries.md) — 请求入口、异步入口、外部系统边界、浏览器存储边界
- [接口索引](./interface-index.md) — 全部 HTTP API 契约（认证/用户/菜单/部门/角色/权限）
- [配置索引](./config-index.md) — 常量、环境变量、主题默认值、路由配置、风险热点
- [数据访问索引](./data-access-index.md) — sessionStorage/localStorage/Signal/BehaviorSubject/HTTP 读写边界
- [状态模型](./state-model.md) — 全局 Signal/BehaviorSubject、computed/effect 依赖链、持久化边界、HTTP 数据落点
- [组件树与渲染边界](./component-tree.md) — 懒加载边界、OnPush 变更检测依赖、动态组件插入点、路由复用缓存
- [第三方库边界](./deps-boundary.md) — 版本锁定风险、CDN 依赖、API 不稳定库、仅开发环境依赖
