---
updated: 2026-04-10
---

# Auth & Login Index — 认证与权限索引

## 认证机制（已确认事实）

- **方案**：JWT Bearer Token
- **存储**：`sessionStorage[Authorization]`，格式 `Bearer <token>`
- **解码**：`@auth0/angular-jwt` 的 `JwtHelperService.decodeToken()`，取 `userName`、`sub`（userId）
- **注入**：`httpInterceptorService` 在每个请求头自动注入 `Authorization: Bearer <token>`

---

## 权限码体系（已确认事实）

path: `src/app/config/actionCode.ts`

权限码格式：`default:<模块>:<子模块>:<操作>`

| 权限码 | 说明 |
|--------|------|
| `default:feat:tabs:example-detail` | Tab 演示详情页 |
| `default:page-demo:search-table:example-detail` | 查询表格详情 |
| `default:system:account:add/edit/del` | 账号管理增删改 |
| `default:system:role-manager:add/edit/del/set-role` | 角色管理 |
| `default:system:menu:add/edit/del/addlowlevel` | 菜单管理 |
| `default:system:dept:add/edit/del/addlowlevel` | 部门管理 |

权限码来源：登录后调 `AccountService.getAccountAuthCode(userId)` 从后端获取，存入 `UserInfoStoreService.$userInfo().authCode`

**注意**：`LoginInOutService.loginIn()` 中硬编码了 `TabsDetail` 和 `SearchTableDetail` 两个权限码（临时方案，注释标注 todo）

---

## 路由守卫（已确认事实）

path: `src/app/core/services/common/guard/judgeLogin.guard.ts`

- 类型：`CanActivateChildFn`
- 逻辑：检查 `sessionStorage[TokenKey]` 是否存在
- 无 token → `redirect('/login')`
- 挂载位置：`layout/default/default-routing.ts` 的 `canActivateChild`

---

## 按钮级权限控制（已确认事实）

path: `src/app/shared/directives/auth.directive.ts`

- 指令：`AuthDirective`
- 逻辑：读取 `UserInfoStoreService.$userInfo().authCode`，若不包含目标权限码则移除 DOM 元素
- 路由级权限：路由 `data.authCode` 字段配合守卫使用（如 `set-role`、`example-detail`）

grep: `authCode`, `AuthDirective`, `ActionCode`

---

## 登录超时处理（已确认事实）

- HTTP 响应 `code === 1012`（`loginTimeOutCode`）→ 弹出登录对话框
- HTTP 响应 `code === 1010`（`tokenErrorCode`）→ 重新登录
- 演示页：`feat/session-timeout`

path: `src/app/config/constant.ts`, `src/app/core/services/http/base-http.service.ts`

---

## 锁屏（已确认事实）

- 触发：用户手动锁屏或超时
- 存储：`sessionStorage[LockedKey]`
- 监听：`SubLockedStatusService`（应用启动时初始化）
- 组件：`shared/components/lock-screen/`、`widget/common-widget/lock-widget/`
- 解锁：输入密码，调 `LockWidgetService`

grep: `LockedKey`, `SubLockedStatusService`, `LockWidgetService`

---

## 登录弹窗（已确认事实）

path: `src/app/widget/biz-widget/login/login-modal.component.ts`

- 场景：登录超时后弹出，用户重新输入密码续期，不跳转登录页
- 服务：`LoginModalService`

---

## 修改密码（已确认事实）

path: `src/app/widget/biz-widget/change-password/change-password.component.ts`

- 服务：`ChangePasswordService`（弹窗形式）

---

## Mock 认证接口（已确认事实）

path: `src/mocks/business/login.ts`, `src/mocks/business/permission.ts`

| 接口 | Mock 文件 |
|------|-----------|
| 登录（返回 token） | `login.ts` |
| 登出 | `login.ts` |
| 获取权限码 | `permission.ts` |
| 获取账号信息 | `user.ts` |
