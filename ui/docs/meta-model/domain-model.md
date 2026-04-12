---
updated: 2026-04-10
---

# Domain Model — 核心领域对象

> 按 skill output-contract 领域对象模板输出：类别、结论级别、业务含义、关键属性、关键状态、状态迁移、关联对象、被哪些流程使用、主要落点。

---

## Menu

- **类别**：实体（树形聚合）
- **结论级别**：事实
- **业务含义**：系统导航菜单项或按钮权限点。`menuType='C'` 为菜单项（渲染到侧边栏/顶部栏），`menuType='F'` 为按钮权限点（不渲染，仅用于权限控制）。后端返回扁平数组，前端通过 `fnFlatDataHasParentToTree()` 转为树形结构。
- **关键属性**：
  - `id` / `fatherId`：树形关系键
  - `menuType: 'C' | 'F'`：区分菜单项与权限按钮
  - `code`：权限码，与 `ActionCode` 枚举对应
  - `path`：路由路径
  - `visible`：是否在菜单中显示
  - `status`：是否启用
  - `newLinkFlag`：是否新窗口打开
- **关键状态**：`open`（展开/收起）、`selected`（选中/未选中）、`status`（启用/禁用）、`visible`（显示/隐藏）
- **状态迁移**：
  - 登录后：后端返回扁平 Menu[] → `fnFlatDataHasParentToTree()` → `MenuStoreService.setMenuArrayStore()` → SideNav/NavBar 渲染
  - 登出后：`MenuStoreService.setMenuArrayStore([])` → 菜单清空
  - 菜单管理页修改后：重新调用 `/auth/menu` 接口刷新
- **关联对象**：`UserInfo.authCode`（权限码来源）、`ActionCode`（权限码枚举）、`MenuStoreService`（存储）
- **被哪些流程使用**：登录流程（菜单加载）、路由守卫流程（权限判断）、登出流程（菜单清空）
- **主要落点**：
  - path: `src/app/core/services/types.ts`
  - symbol: `Menu`, `MenuStoreService`, `fnFlatDataHasParentToTree`
  - grep keywords: `menuType`, `fnFlatDataHasParentToTree`, `MenuStoreService`, `setMenuArrayStore`

---

## UserInfo

- **类别**：值对象（会话级）
- **结论级别**：事实
- **业务含义**：当前登录用户的身份信息，包含用户名、用户 ID 和权限码数组。从 JWT token 解码获取基础信息，再从后端拉取权限码。
- **关键属性**：
  - `userId: number`：用户唯一标识（来自 JWT `sub` 字段）
  - `userName: string`：用户名（来自 JWT `userName` 字段）
  - `authCode: string[]`：权限码数组，格式 `default:<模块>:<子模块>:<操作>`
- **关键状态**：已登录（`userId > 0`）/ 未登录（`userId = -1`）
- **状态迁移**：
  - 登录成功：`parsToken(token)` 解码 → `getAccountAuthCode(userId)` 拉取权限码 → `$userInfo.set(userInfo)`
  - 登出：`$userInfo` 不主动清空（依赖 SessionStorage Token 失效后守卫拦截）
- **关联对象**：`Menu.code`（权限码匹配）、`ActionCode`（权限码枚举）、`AuthDirective`（消费权限码）
- **被哪些流程使用**：登录流程（写入）、路由守卫流程（读取 authCode）、按钮权限控制（AuthDirective 读取）
- **主要落点**：
  - path: `src/app/core/services/store/common-store/userInfo-store.service.ts`
  - symbol: `UserInfoStoreService.$userInfo`, `parsToken`, `getUserAuthCodeByUserId`
  - grep keywords: `$userInfo`, `authCode`, `parsToken`, `UserInfoStoreService`

---

## SettingInterface — 主题配置

- **类别**：值对象（持久化配置）
- **结论级别**：事实
- **业务含义**：控制整个应用的布局和视觉配置，包括菜单模式、主题色、各区域显示开关等。持久化到 `localStorage`，刷新后恢复。
- **关键属性**：
  - `theme`：暗黑/明亮模式
  - `color`：主题色（默认 `#1890FF`）
  - `mode: 'side' | 'top' | 'mix'`：菜单布局模式
  - `isShowTab`：是否展示多页签
  - `fixedHead` / `fixedTab` / `fixedLeftNav`：固定区域开关
  - `hasTopArea` / `hasFooterArea` / `hasNavArea` / `hasNavHeadArea`：区域显示开关
  - `colorWeak` / `greyTheme`：无障碍模式
  - `splitNav`：混合模式下分割菜单
- **关键状态**：无状态机，纯配置值对象
- **状态迁移**：
  - 应用启动：`InitThemeService` 从 `localStorage[ThemeOptionsKey]` 读取 → `ThemeService.$themesOptions.set()`
  - 用户修改：`SettingDrawerComponent` → `ThemeService.$themesOptions.update()` → effect 持久化到 localStorage
- **关联对象**：`StyleTheme`（主题风格枚举）、`ThemeService`（存储）、`ThemeSkinService`（CSS 加载）
- **被哪些流程使用**：应用启动流程（恢复配置）、主题切换流程（写入/读取）
- **主要落点**：
  - path: `src/app/core/services/store/common-store/theme.service.ts`
  - symbol: `ThemeService.$themesOptions`, `SettingInterface`
  - config: `ThemeOptionsKey`（`src/app/config/constant.ts`）
  - grep keywords: `$themesOptions`, `ThemeOptionsKey`, `SettingInterface`, `SettingDrawerComponent`

---

## StyleTheme — 主题风格枚举

- **类别**：枚举
- **结论级别**：事实
- **业务含义**：控制整体皮肤风格，对应 4 套 CSS 文件。
- **关键属性**：`'default' | 'dark' | 'aliyun' | 'compact'`
- **关键状态**：当前激活的主题风格
- **状态迁移**：`SettingDrawerComponent` → `ThemeService.$themeStyle.set()` → `themeStyleChangeEffect` 联动 `$isNightTheme`/`$isCompactTheme` → `ThemeSkinService.loadTheme()` 动态替换 CSS `<link>`
- **关联对象**：`SettingInterface.theme`、`ThemeService.$themeStyle`、`ThemeSkinService`
- **被哪些流程使用**：主题切换流程、应用启动流程（恢复主题）
- **主要落点**：
  - path: `src/app/core/services/store/common-store/theme.service.ts`
  - symbol: `StyleTheme`, `ThemeService.$themeStyle`, `ThemeSkinService.loadTheme`
  - config: `StyleThemeModelKey`（`src/app/config/constant.ts`）
  - grep keywords: `$themeStyle`, `StyleThemeModelKey`, `loadTheme`

---

## ActionCode — 权限码枚举

- **类别**：枚举（配置）
- **结论级别**：事实
- **业务含义**：定义系统中所有按钮级权限的唯一标识符，格式 `default:<模块>:<子模块>:<操作>`。是权限体系的核心配置，连接后端权限分配与前端按钮控制。
- **关键属性**：见 `src/app/config/actionCode.ts`，当前定义了账号/角色/菜单/部门管理的增删改权限，以及两个演示页权限
- **关键状态**：无状态，纯枚举
- **状态迁移**：无
- **关联对象**：`UserInfo.authCode`（运行时权限码集合）、`AuthDirective`（消费）、`Menu.code`（菜单权限码）
- **被哪些流程使用**：登录流程（硬编码注入 `TabsDetail`/`SearchTableDetail`）、路由守卫流程（路由 `data.authCode` 字段）、按钮权限控制
- **主要落点**：
  - path: `src/app/config/actionCode.ts`
  - symbol: `ActionCode`
  - grep keywords: `ActionCode`, `authCode`, `AuthDirective`

---

## PageInfo — 分页响应

- **类别**：DTO（泛型）
- **结论级别**：事实
- **业务含义**：所有列表接口的统一分页响应结构，包含总数、当前页数据、分页元数据。
- **关键属性**：`pageIndex`、`pageSize`、`total`、`list: T[]`
- **关键状态**：无状态
- **状态迁移**：无
- **关联对象**：`SearchCommonVO<T>`（配套入参）、所有列表 HTTP 服务
- **被哪些流程使用**：HTTP 请求流程（响应解包）、所有列表页（`system/account`、`system/dept`、`system/role-manager`、`page-demo/list/*`）
- **主要落点**：
  - path: `src/app/core/services/types.ts`
  - symbol: `PageInfo`, `SearchCommonVO`
  - grep keywords: `PageInfo`, `SearchCommonVO`, `pageIndex`, `pageSize`

---

## ActionResult — HTTP 响应包装

- **类别**：DTO（基础设施）
- **结论级别**：事实
- **业务含义**：所有后端接口的统一响应包装，`code` 字段区分成功/失败/特殊状态。
- **关键属性**：`code: number`、`msg: string`、`data: T`
- **关键状态**：
  - `code 200/201`：成功
  - `code 1010`（`tokenErrorCode`）：Token 错误，需重新登录
  - `code 1012`（`loginTimeOutCode`）：登录超时，弹出登录弹窗
  - 其他非 200/201：业务错误，弹出 `message.error(msg)`
- **状态迁移**：`BaseHttpService.resultHandle()` 处理所有 code 分支
- **关联对象**：`HttpCustomConfig`（请求配置）、`BaseHttpService`（处理逻辑）
- **被哪些流程使用**：HTTP 请求流程（所有接口响应）
- **主要落点**：
  - path: `src/app/core/services/http/base-http.service.ts`
  - symbol: `ActionResult`, `resultHandle`, `handleFilter`
  - config: `loginTimeOutCode=1012`, `tokenErrorCode=1010`（`src/app/config/constant.ts`）
  - grep keywords: `ActionResult`, `resultHandle`, `loginTimeOutCode`, `tokenErrorCode`

---

## HttpCustomConfig — HTTP 请求配置

- **类别**：值对象（配置）
- **结论级别**：事实
- **业务含义**：每次 HTTP 调用时传入的行为配置，控制 Loading 展示、成功提示、URL 拼接策略。
- **关键属性**：`needSuccessInfo`、`showLoading`、`otherUrl`、`loadingText`
- **关键状态**：无状态
- **状态迁移**：无
- **关联对象**：`BaseHttpService`（消费）、`NzMessageService`（Loading/提示）
- **被哪些流程使用**：HTTP 请求流程
- **主要落点**：
  - path: `src/app/core/services/http/base-http.service.ts`
  - symbol: `HttpCustomConfig`
  - grep keywords: `needSuccessInfo`, `showLoading`, `HttpCustomConfig`

---

## User — 账号实体

- **类别**：实体
- **结论级别**：事实
- **业务含义**：系统用户账号，包含基本信息、所属部门、角色、状态。
- **关键属性**：`id`、`userName`、`password`、`available`（启用/禁用）、`roleName[]`、`departmentId`、`sex`、`telephone`、`mobile`、`email`
- **关键状态**：`available: boolean`（启用/禁用）
- **状态迁移**：通过 `AccountService.editAccount()` 修改
- **关联对象**：`Dept`（所属部门）、`Role`（角色）、`UserInfo`（登录后的运行时表示）
- **被哪些流程使用**：登录流程（权限码查询）、系统管理（账号 CRUD）
- **主要落点**：
  - path: `src/app/core/services/http/system/account.service.ts`
  - symbol: `User`, `AccountService`
  - grep keywords: `AccountService`, `User`, `/user/list`

---

## Role — 角色实体

- **类别**：实体
- **结论级别**：事实
- **业务含义**：权限角色，关联一组权限码（菜单/按钮），通过角色分配给用户。
- **关键属性**：`id`、`roleName`、`roleDesc`
- **关键状态**：无显式状态字段
- **状态迁移**：通过 `RoleService.updatePermission()` 更新角色权限码集合
- **关联对象**：`Permission`（权限码集合）、`User`（被分配角色）、`Menu`（权限码来源）
- **被哪些流程使用**：系统管理（角色 CRUD、权限分配）
- **主要落点**：
  - path: `src/app/core/services/http/system/role.service.ts`
  - symbol: `Role`, `Permission`, `RoleService`, `PutPermissionParam`
  - grep keywords: `RoleService`, `/role/list`, `updatePermission`, `assign-role-menu`

---

## Dept — 部门实体

- **类别**：实体（树形）
- **结论级别**：事实
- **业务含义**：组织架构部门，树形结构，通过 `fatherId` 建立父子关系。
- **关键属性**：`id`、`departmentName`、`fatherId`、`state: 1 | 0`（启用/禁用）、`orderNum`
- **关键状态**：`state: 1`（启用）/ `state: 0`（禁用）
- **状态迁移**：通过 `DeptService.editDepts()` 修改
- **关联对象**：`User.departmentId`（用户所属部门）
- **被哪些流程使用**：系统管理（部门 CRUD）
- **主要落点**：
  - path: `src/app/core/services/http/system/dept.service.ts`
  - symbol: `Dept`, `DeptService`
  - grep keywords: `DeptService`, `/department/list`

---

## DynamicComponent — 动态组件容器

- **类别**：值对象（基础设施）
- **结论级别**：事实
- **业务含义**：用于 `AdDirective` 动态插入组件的数据容器，携带组件类型和数据。
- **关键属性**：`component: Type<any>`、`data: any`
- **关键状态**：无
- **状态迁移**：无
- **关联对象**：`AdDirective`（消费）
- **被哪些流程使用**：动态组件插入场景
- **主要落点**：
  - path: `src/app/core/services/types.ts`
  - symbol: `DynamicComponent`, `AdDirective`
  - grep keywords: `DynamicComponent`, `AdDirective`
