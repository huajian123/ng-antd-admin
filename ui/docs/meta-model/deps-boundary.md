---
updated: 2026-04-11
---

# Deps Boundary — 第三方库边界

> 覆盖版本锁定风险、外部 CDN 依赖、API 不稳定库、仅开发环境依赖。
> 按 skill output-contract 第三方库节点模板输出。

---

## 库边界总览

| 库 | 版本 | 风险类型 | 风险等级 |
|----|------|----------|----------|
| ng-zorro-antd | ^21.2.0 | 版本锁定（与 Angular 强绑定） | 高 |
| @angular/* | ^21.2.x | 版本锁定（框架核心） | 高 |
| @antv/x6 | ^2.18.1 | API 不稳定（大版本升级变化大） | 高 |
| @antv/g2plot | ^2.4.33 | API 不稳定 | 中 |
| ngx-echarts | ^20.0.1 | 版本锁定（与 Angular 版本绑定） | 中 |
| @tinymce/tinymce-angular | ^9.0.0 | 版本锁定 + CDN 依赖（TinyMCE 核心） | 中 |
| 阿里图标 CDN | 固定 URL | CDN 依赖（外部网络） | 中 |
| LuckySheet | 非 npm（CDN） | CDN 依赖 + 非 npm | 中 |
| @amap/amap-jsapi-loader | ^1.0.1 | CDN 依赖（高德地图 JS API） | 中 |
| 百度地图 JS SDK | 非 npm（CDN） | CDN 依赖 + 非 npm | 中 |
| msw | ^2.12.14 | 仅开发/演示环境 | 低 |
| driver.js | ^1.3.6 | API 稳定 | 低 |

---

## ng-zorro-antd — UI 组件库

- **结论级别**：事实
- **当前版本**：^21.2.0
- **用途**：全项目 UI 组件库，覆盖表格、表单、弹窗、菜单、图标等所有 UI 元素
- **风险类型**：版本锁定
- **版本锁定关系**：ng-zorro-antd 大版本号与 Angular 大版本号严格对应（ng-zorro-antd 21.x → Angular 21.x）。Angular 升级大版本时必须同步升级 ng-zorro-antd，且两者的 breaking change 需同时处理
- **替换成本**：高（全项目组件均依赖，替换需重写所有模板）
- **升级注意事项**：每次 Angular 大版本升级前先查 ng-zorro-antd 的 Angular 版本兼容矩阵；关注 `NzSafeAny` 等内部类型的变更
- **降级/移除影响面**：全项目所有页面和组件
- **索引**：
  - grep keywords: `ng-zorro-antd`, `NzSafeAny`, `nz-`

---

## @angular/* — Angular 框架核心

- **结论级别**：事实
- **当前版本**：^21.2.5
- **用途**：框架核心（DI、路由、表单、HTTP、变更检测）
- **风险类型**：版本锁定
- **版本锁定关系**：Angular 21 引入 Zoneless（`provideZonelessChangeDetection`）和 Signal 作为一等公民；降级到 Angular 17 以下会导致大量 API 不兼容
- **替换成本**：高（不可替换，框架本身）
- **升级注意事项**：
  - Angular 每 6 个月发布一个大版本，需同步升级 ng-zorro-antd、ngx-echarts 等强绑定库
  - `standalone: true` 在 Angular 19+ 已成默认，项目已遵循此规范
  - `provideZonelessChangeDetection` 在 Angular 18 引入，项目已启用，升级时注意 Zone.js 相关 API 的废弃
- **降级/移除影响面**：全项目
- **索引**：
  - grep keywords: `provideZonelessChangeDetection`, `signal`, `computed`, `effect`, `input`, `output`

---

## @antv/x6 + @antv/x6-plugin-dnd — 流程图库

- **结论级别**：事实
- **当前版本**：^2.18.1 / ^2.1.1
- **用途**：`page-demo/flow/flow-chat` 流程图编辑器
- **风险类型**：API 不稳定
- **版本锁定关系**：`@antv/x6-plugin-dnd` 需与 `@antv/x6` 版本匹配
- **替换成本**：高（流程图渲染逻辑与 X6 API 深度耦合）
- **升级注意事项**：X6 2.x 与 1.x 有大量 breaking change；升级前必须阅读 CHANGELOG；`graph.dispose()` 在组件销毁时必须调用，否则内存泄漏
- **降级/移除影响面**：仅 `pages/page-demo/flow/`
- **索引**：
  - 引用位置: `src/app/pages/page-demo/flow/flow-chat/flow-chat.component.ts`
  - grep keywords: `@antv/x6`, `Graph`, `dispose`, `x6-plugin-dnd`

---

## @antv/g2plot — 图表库

- **结论级别**：事实
- **当前版本**：^2.4.33
- **用途**：`pages/dashboard/analysis/` 分析页图表
- **风险类型**：API 不稳定（AntV 系列库升级频繁）
- **版本锁定关系**：无强绑定，但 G2Plot 3.x 与 2.x API 差异较大
- **替换成本**：中（仅用于 dashboard，可替换为 ECharts）
- **升级注意事项**：G2Plot 已进入维护模式，官方推荐迁移到 G2 5.x；升级前评估迁移成本
- **降级/移除影响面**：仅 `pages/dashboard/analysis/`
- **索引**：
  - 引用位置: `src/app/pages/dashboard/analysis/analysis.component.ts`
  - grep keywords: `@antv/g2plot`, `g2plot`

---

## ngx-echarts + echarts — ECharts 封装

- **结论级别**：事实
- **当前版本**：ngx-echarts ^20.0.1 / echarts ^5.6.0
- **用途**：`feat/charts/echarts` 图表演示页
- **风险类型**：版本锁定（ngx-echarts 大版本号与 Angular 大版本号对应）
- **版本锁定关系**：ngx-echarts 20.x → Angular 20.x（当前 Angular 21，存在版本超前，待验证兼容性）
- **替换成本**：中（可直接使用 echarts 原生 API 替代 ngx-echarts 封装）
- **升级注意事项**：升级 Angular 时同步检查 ngx-echarts 的 Angular 版本支持；echarts 动态 import 配置在 `app.config.ts` 的 `NGX_ECHARTS_CONFIG` provider 中
- **降级/移除影响面**：仅 `pages/feat/charts/echarts/`
- **索引**：
  - 引用位置: `src/app/pages/feat/charts/echarts/echarts.component.ts`, `src/app/app.config.ts`
  - grep keywords: `ngx-echarts`, `NGX_ECHARTS_CONFIG`, `NgxEchartsModule`

---

## @tinymce/tinymce-angular — 富文本编辑器

- **结论级别**：事实
- **当前版本**：^9.0.0
- **用途**：`feat/rich-text` 富文本编辑器演示
- **风险类型**：版本锁定 + CDN 依赖
- **版本锁定关系**：`@tinymce/tinymce-angular` 是 TinyMCE 的 Angular 封装，TinyMCE 核心包需单独加载（npm 包或 CDN）
- **替换成本**：中（仅用于演示页，可替换为 Quill 等）
- **升级注意事项**：TinyMCE 6.x 起需要 API Key（免费版有水印），确认是否使用自托管版本；升级时检查 Angular 版本兼容性
- **降级/移除影响面**：仅 `pages/feat/rich-text/`
- **索引**：
  - 引用位置: `src/app/pages/feat/rich-text/`
  - grep keywords: `@tinymce/tinymce-angular`, `tinymce`, `EditorComponent`

---

## 阿里图标 CDN — iconfont

- **结论级别**：事实
- **当前版本**：固定 URL（`https://at.alicdn.com/t/font_3303907_htrdo3n69kc.js`）
- **用途**：全项目自定义图标（阿里图标库生成的 iconfont JS）
- **风险类型**：CDN 依赖（外部网络）
- **版本锁定关系**：URL 中的 `font_3303907_htrdo3n69kc` 是项目专属图标集 ID，图标库更新后需重新生成并替换 URL
- **替换成本**：低（修改 `LoadAliIconCdnService` 中的 `scriptUrl` 即可）
- **升级注意事项**：图标库更新后需在阿里图标官网重新生成 JS 文件并更新 URL；CDN 不可用时图标显示为空（不影响功能）
- **降级/移除影响面**：全项目自定义图标显示
- **索引**：
  - 引用位置: `src/app/core/services/common/load-ali-icon-cdn.service.ts`
  - grep keywords: `LoadAliIconCdnService`, `fetchFromIconfont`, `scriptUrl`, `at.alicdn.com`

---

## LuckySheet — 在线 Excel

- **结论级别**：事实
- **当前版本**：非 npm，通过 `LazyService` 动态加载 CDN
- **用途**：`comp/luckysheet` 在线 Excel 演示
- **风险类型**：CDN 依赖 + 非 npm（无版本锁定）
- **版本锁定关系**：无（CDN URL 中无版本号，始终加载最新版）
- **替换成本**：中（可替换为 Handsontable 等，但需重写组件）
- **升级注意事项**：LuckySheet 项目已停止维护（官方推荐迁移到 Luckysheet 2.0 / Fortune Sheet）；CDN 不可用时功能完全不可用
- **降级/移除影响面**：仅 `pages/comp/luckysheet/`
- **索引**：
  - 引用位置: `src/app/pages/comp/luckysheet/luckysheet.component.ts`
  - grep keywords: `LuckySheet`, `luckysheet`, `LazyService`

---

## @amap/amap-jsapi-loader — 高德地图

- **结论级别**：事实
- **当前版本**：^1.0.1
- **用途**：`feat/charts/gaode-map` 高德地图演示
- **风险类型**：CDN 依赖（高德地图 JS API 从 CDN 动态加载）
- **版本锁定关系**：`amap-jsapi-loader` 是加载器，实际地图 API 版本在加载时指定
- **替换成本**：低（仅演示页）
- **升级注意事项**：高德地图 JS API 2.0 与 1.x 有较大差异；需要高德开放平台 API Key，确认 Key 配置位置
- **降级/移除影响面**：仅 `pages/feat/charts/gaode-map/`
- **索引**：
  - 引用位置: `src/app/pages/feat/charts/gaode-map/gaode-map.component.ts`
  - grep keywords: `@amap/amap-jsapi-loader`, `AMapLoader`, `gaode-map`

---

## 百度地图 JS SDK

- **结论级别**：事实
- **当前版本**：非 npm，通过 `LazyService` 动态加载 CDN
- **用途**：`feat/charts/baidu-map` 百度地图演示
- **风险类型**：CDN 依赖 + 非 npm
- **版本锁定关系**：无（CDN URL 中指定版本）
- **替换成本**：低（仅演示页）
- **升级注意事项**：需要百度地图 API Key；CDN 不可用时功能完全不可用
- **降级/移除影响面**：仅 `pages/feat/charts/baidu-map/`
- **索引**：
  - 引用位置: `src/app/pages/feat/charts/baidu-map/baidu-map.component.ts`
  - grep keywords: `baidu-map`, `BMap`, `LazyService`

---

## msw — Mock Service Worker

- **结论级别**：事实
- **当前版本**：^2.12.14
- **用途**：拦截所有 HTTP 请求，返回 mock 数据（开发和生产演示均启用）
- **风险类型**：仅开发/演示环境（但当前生产也启用）
- **版本锁定关系**：无强绑定
- **替换成本**：低（仅影响 mock 层）
- **升级注意事项**：MSW 2.x 与 1.x API 差异较大（handler 写法变化）；升级后需重新生成 `public/mockServiceWorker.js`（`npx msw init public/`）；**生产环境 `mockEnabled: true` 是演示项目设计，实际业务项目需改为 false**
- **降级/移除影响面**：关闭 mock 后所有接口将请求真实后端，需确保后端可用
- **索引**：
  - 引用位置: `src/mocks/handlers.ts`, `src/app/app.config.ts`, `public/mockServiceWorker.js`
  - grep keywords: `msw`, `handlers`, `mockServiceWorker`, `mockEnabled`

---

## driver.js — 引导页

- **结论级别**：事实
- **当前版本**：^1.3.6
- **用途**：`feat/setup` 引导页演示（新手引导高亮）
- **风险类型**：API 稳定
- **版本锁定关系**：无
- **替换成本**：低（仅演示页）
- **升级注意事项**：driver.js 1.x 与 0.x API 差异较大，当前已使用 1.x
- **降级/移除影响面**：仅 `pages/feat/setup/`
- **索引**：
  - 引用位置: `src/app/pages/feat/setup/`
  - grep keywords: `driver.js`, `Driver`, `driver`

---

## @auth0/angular-jwt — JWT 解码

- **结论级别**：事实
- **当前版本**：^5.2.0
- **用途**：解码 JWT token，提取 `userName`、`sub`（userId）字段
- **风险类型**：API 稳定，但仅用于解码（不做验证）
- **版本锁定关系**：无强绑定
- **替换成本**：低（可替换为 `jwt-decode` 等轻量库，仅需修改 `UserInfoStoreService.parsToken()`）
- **升级注意事项**：当前仅使用 `JwtHelperService.decodeToken()`，不依赖其他功能
- **降级/移除影响面**：仅 `UserInfoStoreService.parsToken()`
- **索引**：
  - 引用位置: `src/app/core/services/store/common-store/userInfo-store.service.ts`
  - grep keywords: `JwtHelperService`, `decodeToken`, `@auth0/angular-jwt`

---

## @zxcvbn-ts/core + @zxcvbn-ts/language-en — 密码强度

- **结论级别**：事实
- **当前版本**：^2.1.0 / ^2.1.0
- **用途**：`shared/biz-components/password-strength-meter/` 密码强度计算
- **风险类型**：API 稳定，但仅支持英文语言包
- **版本锁定关系**：`@zxcvbn-ts/core` 与 `@zxcvbn-ts/language-en` 版本需匹配
- **替换成本**：低（仅影响密码强度组件）
- **升级注意事项**：中文密码评分可能不准确（仅有英文语言包）；如需中文支持需引入 `@zxcvbn-ts/language-common`
- **降级/移除影响面**：仅 `shared/biz-components/password-strength-meter/`
- **索引**：
  - 引用位置: `src/app/shared/biz-components/password-strength-meter/password-strength-meter.service.ts`
  - grep keywords: `zxcvbn`, `@zxcvbn-ts`, `PasswordStrengthMeter`

---

## screenfull — 全屏

- **结论级别**：事实
- **当前版本**：^6.0.2
- **用途**：`feat/full-screen` 全屏演示；`shared/directives/toggle-fullscreen.directive.ts`
- **风险类型**：API 稳定
- **版本锁定关系**：无
- **替换成本**：低（可替换为原生 Fullscreen API）
- **升级注意事项**：无
- **降级/移除影响面**：`pages/feat/full-screen/`、`ToggleFullscreenDirective`
- **索引**：
  - grep keywords: `screenfull`, `ToggleFullscreenDirective`

---

## file-saver — 文件下载

- **结论级别**：事实
- **当前版本**：^2.0.5
- **用途**：`feat/download` 文件下载演示
- **风险类型**：API 稳定
- **版本锁定关系**：无
- **替换成本**：低（可替换为原生 `<a download>` 方案）
- **升级注意事项**：无
- **降级/移除影响面**：仅 `pages/feat/download/`
- **索引**：
  - grep keywords: `file-saver`, `saveAs`
