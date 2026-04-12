---
updated: 2026-04-10
---

# Change Hotspots — 高风险变更区

> 变更频率高、影响面广、或容易引入 Bug 的区域。变更前先确认影响面。

## 1. 路由复用策略（高风险）

**文件**：`src/app/core/services/common/reuse-strategy.ts`

**风险**：任何对 `SimpleReuseStrategy` 的修改都会影响全部页面的缓存行为。Tab 刷新依赖 `refresh-empty` 占位路由，若路由 key 逻辑变动，Tab 刷新会失效。

**影响面**：所有带 `data.key` 的路由、`TabService`、`layout/default/tab/`

**grep**：`shouldDetach`, `retrieve`, `deleteRouteSnapshot`, `refresh-empty`

---

## 2. 登录/登出流程（高风险）

**文件**：`src/app/core/services/common/login-in-out.service.ts`

**风险**：同时涉及 Token 存储、用户信息 signal、菜单 BehaviorSubject、Tab 清理、路由跳转。任一环节失败都会导致登录态异常或菜单不显示。

**影响面**：`StartupService`、`JudgeLoginGuard`、`MenuStoreService`、`UserInfoStoreService`、`TabService`

**grep**：`loginIn`, `loginOut`, `clearTabCash`, `clearSessionCash`

---

## 3. 主题系统（中风险）

**文件**：
- `src/app/core/services/common/theme-skin.service.ts`
- `src/app/core/services/store/common-store/theme.service.ts`
- `src/app/layout/default/setting-drawer/setting-drawer.component.ts`

**风险**：动态插入/替换 CSS `<link>` 标签，若文件路径或命名规则变动，主题切换会静默失败（无报错但样式不变）。`$themeStyle` signal 的 effect 联动 `$isNightTheme`/`$isCompactTheme`，修改时注意副作用。

**影响面**：全局样式、所有组件的 Less 文件

**grep**：`loadTheme`, `StyleThemeModelKey`, `ThemeOptionsKey`, `themeMixin`

---

## 4. HTTP 基础服务（中风险）

**文件**：`src/app/core/services/http/base-http.service.ts`

**风险**：所有业务 HTTP 服务都继承或注入此服务。修改 `resultHandle`、`handleFilter`、`handleLoading` 会影响全部接口的响应处理逻辑。Loading 的 500ms 最小展示时间是刻意设计，不要随意删除。

**影响面**：全部 HTTP 服务

**grep**：`resultHandle`, `handleFilter`, `handleLoading`, `ActionResult`

---

## 5. HTTP 拦截器（中风险）

**文件**：`src/app/core/services/interceptors/http-interceptor.ts`

**风险**：Token 注入逻辑在此，修改 header key 需同步修改后端（或 mock）。`filter(e => e.type !== 0)` 过滤掉上传进度事件，若需要上传进度功能需特别处理。

**影响面**：全部 HTTP 请求

**grep**：`httpInterceptorService`, `TokenKey`, `Authorization`

---

## 6. 应用启动初始化（中风险）

**文件**：`src/app/app.config.ts`

**风险**：`APPINIT_PROVIDES` 是顺序执行的，若某个 initializer 抛出未捕获异常，后续初始化不会执行，应用会卡在白屏。`StartupService.load()` 依赖 `LoginInOutService`，链路较长。

**影响面**：应用启动、首屏渲染

**grep**：`provideAppInitializer`, `StartupService`, `APPINIT_PROVIDES`

---

## 7. 菜单 Store（中风险）

**文件**：`src/app/core/services/store/common-store/menu-store.service.ts`

**风险**：使用 `BehaviorSubject`（非 signal），与其他 signal-based store 风格不一致。`SideNavComponent` 和 `NavBarComponent` 都订阅此 Observable，修改数据结构需同步更新两处渲染逻辑。

**影响面**：左侧菜单、顶部菜单、混合模式菜单

**grep**：`MenuStoreService`, `getMenuArrayStore`, `setMenuArrayStore`

---

## 8. 占位页（低风险但需关注）

**文件**：`src/app/pages/no-content/no-content.component.ts`

**说明**：`comp/comp2~5`、`feat/feat1,3,4,5`、`page-demo/page-demo2~4` 均指向此占位组件，是未实现功能的标记。新增真实页面时需同步更新对应路由配置。

**grep**：`no-content`

---

## 9. 权限码配置（低风险但需关注）

**文件**：`src/app/config/actionCode.ts`（待验证路径）

**风险**：`LoginInOutService.loginIn()` 中硬编码了两个权限码（`ActionCode.TabsDetail`、`ActionCode.SearchTableDetail`），注释说明这是临时方案。实际项目中应从后端权限管理获取，不应硬编码。

**grep**：`ActionCode.TabsDetail`, `ActionCode.SearchTableDetail`, `authCode.push`

---

## 10. MSW Mock 数据（开发环境风险）

**文件**：`src/mocks/`

**风险**：Mock 数据与真实后端接口可能存在字段差异。`public/mockServiceWorker.js` 需要与 MSW 版本匹配，升级 MSW 后需重新生成。

**grep**：`handlers`, `mockServiceWorker`
