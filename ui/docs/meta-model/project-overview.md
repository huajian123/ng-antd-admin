---
name: project-overview
description: ng-antd-admin 项目总体概览，技术栈、架构类型、入口、主题体系
type: project
---

# 项目概览

## 基本信息

| 项目名 | ng-antd-admin |
|--------|--------------|
| 架构类型 | 模块化单体前端应用（Angular SPA） |
| Angular 版本 | v21.2.x（Zoneless 模式） |
| UI 组件库 | ng-zorro-antd v21.2.0 |
| 样式方案 | Less + `.themeMixin()` |
| 状态管理 | Angular Signals（无 NgRx/Akita） |
| HTTP 层 | Angular HttpClient + 函数式拦截器 |
| Mock 层 | MSW（Mock Service Worker） |
| 国际化 | @ngx-translate/core |
| 路由策略 | Hash 路由 + 自定义路由复用（SimpleReuseStrategy） |
| 构建工具 | @angular/build（esbuild） |
| 部署目标 | GitHub Pages（base-href=/ng-antd-admin/） |

## 架构类型判定

**事实**：单体前端应用，无微服务拆分，无 monorepo 子包。所有业务代码在 `src/app/` 下按功能目录组织。

## 技术栈清单

| 分类 | 技术 |
|------|------|
| 框架 | Angular 21（Zoneless + Signals） |
| UI | ng-zorro-antd（Ant Design Angular） |
| 图表 | ECharts（ngx-echarts）、AntV G2Plot、AntV X6（流程图） |
| 地图 | 高德地图（@amap/amap-jsapi-loader） |
| 富文本 | TinyMCE（@tinymce/tinymce-angular） |
| 认证 | JWT（@auth0/angular-jwt） |
| 密码强度 | @zxcvbn-ts |
| 文件下载 | file-saver |
| 二维码 | qrcode |
| 引导 | driver.js |
| Mock | MSW v2 |
| 国际化 | @ngx-translate/core |
| 样式 | Less，4 套主题（default/dark/aliyun/compact） |

## 入口文件

| 文件 | 作用 |
|------|------|
| `src/main.ts` | 应用启动入口，bootstrapApplication |
| `src/app/app.ts` | 根组件 AppComponent |
| `src/app/app.config.ts` | 全局 providers 配置（路由、拦截器、初始化服务） |
| `src/app/app.routes.ts` | 顶层路由（login / default / blank） |

## 主题体系

4 套独立 CSS bundle，运行时动态切换：

| Bundle | 文件 |
|--------|------|
| default（默认亮色） | `src/styles/default.less` |
| dark（暗黑） | `src/styles/dark.less` |
| aliyun（阿里云风格） | `src/styles/aliyun.less` |
| compact（紧凑） | `src/styles/compact.less` |

主题变量定义在 `src/styles/themes/`，组件内样式通过 `.themeMixin({})` 包裹以支持主题切换。

## 目录结构速览

```
src/app/
├── config/          # 常量、权限码
├── core/            # 核心层（服务、拦截器、守卫、启动）
│   ├── services/
│   │   ├── common/  # 通用服务（守卫、Tab、主题、锁屏等）
│   │   ├── http/    # HTTP 业务服务（login/system/download）
│   │   ├── interceptors/ # HTTP 拦截器
│   │   ├── store/   # Signal Store 服务
│   │   ├── types.ts # 公共接口定义
│   │   └── validators/ # 表单验证
│   └── startup/     # 应用启动服务
├── layout/          # 布局组件（default/blank）
├── pages/           # 页面模块（按业务域分组）
│   ├── dashboard/   # 仪表盘
│   ├── system/      # 系统管理（账号/角色/菜单/部门）
│   ├── page-demo/   # 页面示例
│   ├── feat/        # 功能示例
│   ├── comp/        # 组件示例
│   ├── login/       # 登录页
│   └── other-login/ # 其他登录方式示例
├── shared/          # 共享组件、指令、管道
├── widget/          # 弹窗/抽屉业务组件
├── drawer/          # 抽屉服务封装
├── tpl/             # 全局模板（Modal/Drawer 按钮模板）
└── utils/           # 工具函数
```

## 运行时关键配置

| 配置项 | 位置 | 说明 |
|--------|------|------|
| API 基础路径（dev） | `BaseHttpService` → `/site/api` | 通过 proxy.conf.json 代理 |
| API 基础路径（prod） | `environment.prod.ts` → `localUrl` | 直接请求 |
| Token 存储 | SessionStorage，key=`Authorization` | Bearer 前缀 |
| 路由模式 | Hash（`withHashLocation()`） | |
| 变更检测 | Zoneless（`provideZonelessChangeDetection()`） | |
