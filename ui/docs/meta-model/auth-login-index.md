---
name: auth-login-index
description: ng-antd-admin 认证与权限体系索引，含登录流程、Token 管理、路由守卫、权限码
type: project
---

# 认证与权限索引

## 认证体系概览

| 机制 | 实现 | 证据级别 |
|------|------|---------|
| Token 类型 | JWT（Bearer 前缀） | 事实 |
| Token 存储 | SessionStorage，key=`Authorization` | 事实 |
| Token 解析 | `@auth0/angular-jwt` JwtHelperService | 事实 |
| Token 注入 | HTTP 拦截器自动注入请求头 | 事实 |
| 权限模型 | 基于权限码字符串数组（authCode[]） | 事实 |
| 菜单权限 | 后端按权限码过滤菜单，前端渲染 | 事实 |
| 按钮权限 | ActionCode 枚举 + 前端条件渲染 | 事实 |

---

## 登录流程

```
用户输入账号密码
  → LoginFormComponent 提交
  → LoginService.login() POST /auth/signin
  → 返回 JWT token 字符串
  → LoginInOutService.loginIn(token)
      ├─ SessionStorage.set('Authorization', 'Bearer ' + token)
      ├─ JwtHelperService.decodeToken() → 解析 userId、userName
      ├─ AccountService.getAccountAuthCode(userId) GET /user/auth-code/{id}
      │     → 返回 authCode[]（权限码数组）
      ├─ 手动追加 TabsDetail、SearchTableDetail 权限码
      ├─ UserInfoStoreService.$userInfo.set(userInfo)
      ├─ LoginService.getMenuByUserAuthCode(authCode) POST /auth/menu
      │     → 返回 Menu[]（后端按权限码过滤）
      ├─ 过滤 menuType === 'C'（菜单项，排除按钮）
      ├─ fnFlatDataHasParentToTree() 扁平转树形
      └─ MenuStoreService.setMenuArrayStore(menus)
  → Router.navigate(['/default/dashboard'])
```

**关键文件**：
- `src/app/pages/login/login-form/login-form.component.ts`
- `src/app/core/services/common/login-in-out.service.ts`
- `src/app/core/services/http/login/login.service.ts`
- `src/app/core/services/store/common-store/userInfo-store.service.ts`
- `src/app/core/services/store/common-store/menu-store.service.ts`

---

## 登出流程

```
用户点击登出
  → LoginInOutService.loginOut()
  → LoginService.loginOut() POST /auth/signout（fire-and-forget）
  → Router.navigate(['/login/login-form'])
  → SimpleReuseStrategy.deleteAllRouteSnapshot() 清除路由缓存
  → TabService.clearTabs() 清空 Tab
  → SessionStorage.remove('Authorization')
  → MenuStoreService.setMenuArrayStore([]) 清空菜单
```

---

## 应用启动时的 Token 恢复

```
StartupService.load()
  → SessionStorage.get('Authorization')
  → 若存在 token → LoginInOutService.loginIn(token)（重走登录后流程）
  → 若不存在 → resolve()（跳转登录页）
```

**文件**：`src/app/core/startup/startup.service.ts`

---

## 路由守卫

| 守卫 | 文件 | 触发条件 | 行为 |
|------|------|---------|------|
| JudgeLoginGuard | `guard/judgeLogin.guard.ts` | 进入 default 布局子路由 | 检查 SessionStorage 中是否有 Token，无则跳转 `/login` |
| JudgeAuthGuard | `guard/judgeAuth.guard.ts` | 进入需要权限的路由 | 检查用户 authCode 是否包含路由 data.code |

**注意**：`default-routing.ts` 中 `canActivateChild: []` 当前为空数组（**推断**：守卫未在顶层路由挂载，可能在子路由或组件内部做权限控制）。

---

## HTTP 拦截器

**文件**：`src/app/core/services/interceptors/http-interceptor.ts`

功能：
1. 从 SessionStorage 读取 Token
2. 若存在，注入请求头 `Authorization: Bearer <token>`
3. 过滤 `type === 0` 的事件（进度事件）
4. 统一错误处理（0/3xx/4xx/5xx → 中文错误信息）

**登录超时处理**：`login-expired.service.ts`（监听特定错误码 1012/1010，弹出重新登录对话框）

---

## 权限码体系

**文件**：`src/app/config/actionCode.ts`

权限码格式：`default:模块:子模块:操作`

| 权限码 | 说明 |
|--------|------|
| `default:system:account:add` | 账号管理-新增 |
| `default:system:account:edit` | 账号管理-编辑 |
| `default:system:account:del` | 账号管理-删除 |
| `default:system:role-manager:add` | 角色管理-新增 |
| `default:system:role-manager:edit` | 角色管理-编辑 |
| `default:system:role-manager:del` | 角色管理-删除 |
| `default:system:role-manager:set-role` | 角色管理-设置权限 |
| `default:system:menu:add` | 菜单管理-新增 |
| `default:system:menu:edit` | 菜单管理-编辑 |
| `default:system:menu:del` | 菜单管理-删除 |
| `default:system:menu:addlowlevel` | 菜单管理-添加下级 |
| `default:system:dept:add` | 部门管理-新增 |
| `default:system:dept:edit` | 部门管理-编辑 |
| `default:system:dept:del` | 部门管理-删除 |
| `default:system:dept:addlowlevel` | 部门管理-添加下级 |
| `default:feat:tabs:example-detail` | Tab 示例-详情（静态追加） |
| `default:page-demo:search-table:example-detail` | 查询表格-详情（静态追加） |

---

## 用户信息 Store

**文件**：`src/app/core/services/store/common-store/userInfo-store.service.ts`

```typescript
interface UserInfo {
  userName: string;
  userId: number;
  authCode: string[];  // 权限码数组，登录后填充
}

$userInfo = signal<UserInfo>({ userId: -1, userName: '', authCode: [] });
```

---

## 菜单 Store

**文件**：`src/app/core/services/store/common-store/menu-store.service.ts`

```typescript
$menuArray = signal<Menu[]>([]);  // 树形菜单数组，登录后填充
```

菜单数据结构（`Menu` 接口，`core/services/types.ts`）：

| 字段 | 类型 | 说明 |
|------|------|------|
| id | number/string | 菜单 ID |
| fatherId | number/string | 父菜单 ID |
| path | string | 路由路径 |
| menuName | string | 菜单名称 |
| menuType | 'C'/'F' | C=菜单，F=按钮 |
| code | string | 权限码 |
| icon/alIcon | string | 图标 |
| visible | boolean | 是否可见 |
| status | boolean | 是否启用 |
| newLinkFlag | 0/1 | 是否新窗口打开 |

---

## 锁屏机制

**文件**：`core/services/store/common-store/lock-screen-store.service.ts`  
**常量**：`LockedKey`（localStorage）  
**初始化**：`SubLockedStatusService.initLockedStatus()`（应用启动时订阅锁屏状态）  
**组件**：`shared/components/lock-screen/`、`widget/common-widget/lock-widget/`

---

## API 接口汇总（认证相关）

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 登录 | POST | `/auth/signin` | 返回 JWT token |
| 登出 | POST | `/auth/signout` | 无返回值 |
| 获取菜单 | POST | `/auth/menu` | body: authCode[]，返回 Menu[] |
| 获取权限码 | GET | `/user/auth-code/{id}` | 返回 string[] |
