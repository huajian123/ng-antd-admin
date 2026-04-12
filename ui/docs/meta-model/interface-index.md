---
updated: 2026-04-10
---

# Interface Index — 接口索引

> 回答：对外暴露了哪些 HTTP API、契约在哪里定义、谁消费这些契约。

## 认证接口（已确认事实）

| 方法 | 路径 | 入参 | 出参 | 服务文件 | Mock 文件 |
|------|------|------|------|----------|-----------|
| POST | `/auth/signin` | `{ userName, password }` | `string`（JWT token） | `http/login/login.service.ts` | `mocks/business/login.ts` |
| POST | `/auth/signout` | — | `string` | `http/login/login.service.ts` | `mocks/business/login.ts` |
| POST | `/auth/menu` | `string[]`（权限码数组） | `Menu[]` | `http/login/login.service.ts` | `mocks/business/menu.ts` |

---

## 用户/账号接口（已确认事实）

| 方法 | 路径 | 入参 | 出参 | 服务文件 | Mock 文件 |
|------|------|------|------|----------|-----------|
| POST | `/user/list` | `SearchCommonVO<User>` | `PageInfo<User>` | `http/system/account.service.ts` | `mocks/business/user.ts` |
| GET | `/user/:id` | id | `User` | `http/system/account.service.ts` | `mocks/business/user.ts` |
| GET | `/user/auth-code/:id` | userId | `string[]` | `http/system/account.service.ts` | `mocks/business/permission.ts` |
| POST | `/user/create` | `User` | `void` | `http/system/account.service.ts` | `mocks/business/user.ts` |
| POST | `/user/del/` | `{ ids: number[] }` | `void` | `http/system/account.service.ts` | `mocks/business/user.ts` |
| PUT | `/user/update` | `User` | `void` | `http/system/account.service.ts` | `mocks/business/user.ts` |
| PUT | `/user/psd` | `UserPsd` | `void` | `http/system/account.service.ts` | `mocks/business/user.ts` |

---

## 菜单接口（已确认事实）

| 方法 | 路径 | 入参 | 出参 | 服务文件 | Mock 文件 |
|------|------|------|------|----------|-----------|
| POST | `/menu/list` | `SearchCommonVO<any>` | `PageInfo<Menu>` | `http/system/menus.service.ts` | `mocks/business/menu.ts` |
| POST | `/menu/create` | `MenuListObj` | `void` | `http/system/menus.service.ts` | `mocks/business/menu.ts` |
| PUT | `/menu/update` | `MenuListObj` | `void` | `http/system/menus.service.ts` | `mocks/business/menu.ts` |
| POST | `/menu/del` | `{ ids: [id] }` | `void` | `http/system/menus.service.ts` | `mocks/business/menu.ts` |
| GET | `/menu/:id` | id | `MenuListObj` | `http/system/menus.service.ts` | `mocks/business/menu.ts` |

---

## 部门接口（已确认事实）

| 方法 | 路径 | 入参 | 出参 | 服务文件 | Mock 文件 |
|------|------|------|------|----------|-----------|
| POST | `/department/list` | `SearchCommonVO<Dept>` | `PageInfo<Dept>` | `http/system/dept.service.ts` | `mocks/business/department.ts` |
| GET | `/department/:id` | id | `Dept` | `http/system/dept.service.ts` | `mocks/business/department.ts` |
| POST | `/department/create` | `Dept` | `void` | `http/system/dept.service.ts` | `mocks/business/department.ts` |
| POST | `/department/del/` | `{ ids: number[] }` | `void` | `http/system/dept.service.ts` | `mocks/business/department.ts` |
| PUT | `/department/update` | `Dept` | `void` | `http/system/dept.service.ts` | `mocks/business/department.ts` |

---

## 角色/权限接口（已确认事实）

| 方法 | 路径 | 入参 | 出参 | 服务文件 | Mock 文件 |
|------|------|------|------|----------|-----------|
| POST | `/role/list` | `SearchCommonVO<Role>` | `PageInfo<Role>` | `http/system/role.service.ts` | `mocks/business/role.ts` |
| GET | `/role/:id` | id | `Role` | `http/system/role.service.ts` | `mocks/business/role.ts` |
| POST | `/role/create` | `Role` | `void` | `http/system/role.service.ts` | `mocks/business/role.ts` |
| POST | `/role/del` | `{ ids: number[] }` | `void` | `http/system/role.service.ts` | `mocks/business/role.ts` |
| PUT | `/role/update` | `Role` | `void` | `http/system/role.service.ts` | `mocks/business/role.ts` |
| GET | `/permission/list-role-resources/:id` | roleId | `string[]` | `http/system/role.service.ts` | `mocks/business/permission.ts` |
| POST | `/permission/assign-role-menu` | `PutPermissionParam` | `any` | `http/system/role.service.ts` | `mocks/business/permission.ts` |

---

## 接口通用约定（已确认事实）

- **响应包装**：`{ code: number, msg: string, data: T }`
- **成功码**：`200` / `201`
- **分页入参**：`SearchCommonVO<T>` = `{ pageIndex, pageSize, filters? }`
- **分页出参**：`PageInfo<T>` = `{ pageIndex, pageSize, total, list }`
- **认证头**：`Authorization: Bearer <token>`
- **baseUrl**：开发 `/site/api`，生产 `https://huajian123.github.io/site/api`

path: `src/app/core/services/http/base-http.service.ts`, `src/app/core/services/types.ts`

---

## 接口消费关系（已确认事实）

| 接口服务 | 被哪些组件/服务消费 |
|----------|---------------------|
| `LoginService` | `LoginInOutService`（登录/登出/菜单加载） |
| `AccountService` | `UserInfoStoreService`（权限码）、`pages/system/account/`（账号管理页） |
| `MenusService` | `pages/system/menu/`（菜单管理页） |
| `DeptService` | `pages/system/dept/`（部门管理页） |
| `RoleService` | `pages/system/role-manager/`（角色管理页） |
