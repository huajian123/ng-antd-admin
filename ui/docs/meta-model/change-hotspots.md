---
name: change-hotspots
description: ng-antd-admin 高风险变更区列表，需求高变区、强耦合区、公共底座区
type: project
---

# 高风险变更区

## 风险等级说明

| 等级 | 含义 |
|------|------|
| 🔴 高 | 改动影响面广，极易引发回归问题 |
| 🟡 中 | 改动影响局部模块，需要测试覆盖 |
| 🟢 低 | 改动相对独立，影响面小 |

---

## 1. 🔴 BaseHttpService — HTTP 基础封装

**文件**：`src/app/core/services/http/base-http.service.ts`

**风险原因**：
- 所有业务 HTTP 服务（AccountService/RoleService/MenusService/DeptService/LoginService）都继承或注入此服务
- `resultHandle()` 的 code 判断逻辑（200/201）影响全局响应处理
- `handleLoading()` 的 500ms 最小展示逻辑影响所有带 loading 的请求
- `getUrl()` 的 URL 拼接逻辑影响所有接口路径

**影响面**：全部 HTTP 请求  
**grep 关键词**：`BaseHttpService`, `resultHandle`, `handleFilter`

---

## 2. 🔴 SimpleReuseStrategy — 路由复用策略

**文件**：`src/app/core/services/common/reuse-strategy.ts`

**风险原因**：
- 控制所有页面的缓存/销毁行为
- `handlers` 静态 Map 是全局状态，内存泄漏风险
- `waitDelete` 静态变量在并发操作时可能产生竞态
- 与 `TabService` 深度耦合，Tab 关闭/刷新/切换都依赖此策略
- 滚动位置恢复逻辑（`scrollHandlers`）在 DOM 已移除时可能失效

**影响面**：所有带 Tab 的页面、路由切换体验  
**grep 关键词**：`SimpleReuseStrategy`, `shouldDetach`, `waitDelete`, `handlers`

---

## 3. 🔴 LoginInOutService — 登录/登出核心

**文件**：`src/app/core/services/common/login-in-out.service.ts`

**风险原因**：
- 登录流程串联 Token 存储、JWT 解析、权限码获取、菜单获取、Store 更新
- 任何一步失败都会导致登录状态不完整
- 静态追加权限码（`TabsDetail`、`SearchTableDetail`）是硬编码，新增类似需求需修改此处
- `loginOut()` 需要清理 Tab 缓存、Session、菜单 Store，顺序依赖强

**影响面**：登录/登出/应用启动恢复  
**grep 关键词**：`LoginInOutService`, `loginIn`, `loginOut`, `clearTabCash`

---

## 4. 🔴 TabService — 多页签管理

**文件**：`src/app/core/services/common/tab.service.ts`

**风险原因**：
- Tab 的增删改查逻辑复杂，涉及索引计算、路由快照管理
- `delTab`/`delLeftTab`/`delRightTab`/`delOtherTab` 四种删除场景，边界条件多
- `$currSelectedIndexTab` 的索引维护在并发操作时容易出错
- `refresh()` 依赖 `skipLocationChange` 的中间路由跳转，时序敏感
- 与 `SimpleReuseStrategy` 深度耦合

**影响面**：所有多页签操作  
**grep 关键词**：`TabService`, `delTab`, `addTab`, `$tabArray`

---

## 5. 🔴 ThemeService + ThemeSkinService — 主题体系

**文件**：
- `src/app/core/services/store/common-store/theme.service.ts`
- `src/app/core/services/common/theme-skin.service.ts`

**风险原因**：
- `$themesOptions` Signal 被 `DefaultComponent` 的 `effect()` 监听，修改字段会触发布局重算
- 4 套主题 CSS bundle 的动态加载/卸载，若时序错误会出现样式闪烁
- `SettingInterface` 字段变更会影响 `DefaultComponent`、`SettingDrawerComponent`、`InitThemeService`
- Less 主题变量（`src/styles/themes/`）修改影响所有组件样式

**影响面**：全局布局、所有组件样式  
**grep 关键词**：`ThemeService`, `$themesOptions`, `ThemeSkinService`, `loadTheme`

---

## 6. 🟡 ModalWrapService — 弹窗服务

**文件**：`src/app/widget/base-modal.ts`

**风险原因**：
- 所有业务弹窗（系统管理 CRUD）都通过此服务打开
- 拖拽逻辑（`createDrag`）依赖 DOM 结构（`.ant-modal-content`、`.ant-modal-header`），ng-zorro 升级可能破坏
- z-index 管理逻辑在多弹窗场景下复杂
- `BasicConfirmModalComponent` 抽象类是所有弹窗组件的基类，修改影响所有弹窗

**影响面**：所有使用 Modal 的业务功能  
**grep 关键词**：`ModalWrapService`, `BasicConfirmModalComponent`, `getCurrentValue`

---

## 7. 🟡 AntTableComponent — 通用表格

**文件**：`src/app/shared/components/ant-table/ant-table.component.ts`

**风险原因**：
- 被所有列表页面复用（系统管理 4 个模块 + page-demo 多个列表页）
- `TableHeader` 接口字段变更影响所有使用方
- checkbox 选中状态管理（`checkedCashArrayFromComment`）依赖外部传入数组的引用，容易产生状态不同步
- `linkedSignal` 的使用（`_tableConfig`）在 Angular 21 中是较新特性，行为需关注

**影响面**：所有列表页  
**grep 关键词**：`AntTableComponent`, `AntTableConfig`, `TableHeader`

---

## 8. 🟡 app.config.ts — 全局配置

**文件**：`src/app/app.config.ts`

**风险原因**：
- `APPINIT_PROVIDES` 中初始化服务的执行顺序固定，调整顺序可能导致依赖未就绪
- `provideZonelessChangeDetection()` 是 Zoneless 模式，异步操作需要手动触发变更检测
- `SimpleReuseStrategy` 作为 `RouteReuseStrategy` 注册，替换时需同步更新 `TabService`

**影响面**：应用启动、全局行为  
**grep 关键词**：`APPINIT_PROVIDES`, `provideZonelessChangeDetection`, `SimpleReuseStrategy`

---

## 9. 🟡 actionCode.ts — 权限码配置

**文件**：`src/app/config/actionCode.ts`

**风险原因**：
- 权限码字符串与后端菜单管理中的 `code` 字段必须严格一致
- 新增功能需要同时在此文件添加权限码 + 后端菜单表插入对应记录
- 权限码格式（`default:模块:子模块:操作`）若不统一会导致权限失效

**影响面**：所有需要权限控制的功能按钮  
**grep 关键词**：`ActionCode`, `authCode`, `code`

---

## 10. 🟡 DefaultComponent — 主布局容器

**文件**：`src/app/layout/default/default.component.ts`

**风险原因**：
- 包含两个 `effect()`，监听主题变化并重算布局参数
- `judgeMarginTop()` 的计算逻辑依赖多个布局状态的组合，条件复杂
- 布局模式（side/top/mixin）切换涉及多个子组件的显示/隐藏
- `ngAfterViewInit` 中的首次登录引导（driver.js）依赖 localStorage

**影响面**：整个后台布局  
**grep 关键词**：`DefaultComponent`, `judgeMarginTop`, `isMixinMode`

---

## 11. 🟢 系统管理 CRUD 页面（account/role/menu/dept）

**风险原因**：
- 各模块相对独立，改动影响面局限在本模块
- 弹窗组件（`widget/biz-widget/system/`）与页面组件解耦
- 但修改 API 路径需同步修改 HTTP 服务和 Mock 数据

**影响面**：单个系统管理模块  
**grep 关键词**：`AccountService`/`RoleService`/`MenusService`/`DeptService`

---

## 12. 🟢 Mock 数据层

**文件**：`src/mocks/`

**风险原因**：
- Mock 数据与真实 API 响应结构必须保持一致
- 新增接口需要同步添加 MSW handler
- Mock 仅在开发环境生效（`src/mocks/browser.ts` 中条件启动）

**影响面**：开发/测试环境  
**grep 关键词**：`handlers`, `http.post`, `http.get`（msw）

---

## 待验证问题

| 问题 | 风险 | 验证方式 |
|------|------|---------|
| `default-routing.ts` 中 `canActivateChild: []` 为空，路由守卫是否真正生效？ | 高 | 检查子路由是否单独挂载守卫 |
| `LoginInOutService` 中 `takeUntilDestroyed(this.destroyRef)` 在 root 服务中是否会提前取消订阅？ | 中 | 检查 DestroyRef 在 root 服务中的生命周期 |
| `SimpleReuseStrategy.handlers` 静态 Map 是否存在内存泄漏？ | 中 | 检查长时间使用后的内存占用 |
| `checkedCashArrayFromComment` 使用数组引用传递，是否存在状态污染？ | 中 | 检查多个表格实例共存时的行为 |
