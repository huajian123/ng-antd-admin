---
name: domain-model
description: ng-antd-admin 领域对象索引，核心实体、接口、枚举、状态机
type: project
---

# 领域对象索引

## 核心领域对象

### 1. UserInfo — 用户信息

**文件**：`src/app/core/services/store/common-store/userInfo-store.service.ts`

```typescript
interface UserInfo {
  userName: string;
  userId: number;
  authCode: string[];  // 权限码数组
}
```

**生命周期**：登录时由 JWT 解析填充，登出时重置为 `{ userId: -1, userName: '', authCode: [] }`  
**存储**：`UserInfoStoreService.$userInfo` (Signal)

---

### 2. Menu — 菜单

**文件**：`src/app/core/services/types.ts`

```typescript
interface Menu {
  id: number | string;
  fatherId: number | string;
  path: string;
  orderNum?: number;
  menuName: string;
  menuType: 'C' | 'F';   // C=菜单项, F=按钮/功能
  icon?: string;
  alIcon?: string;
  code: string;           // 权限码
  visible?: boolean;
  status?: boolean;
  open?: boolean;
  selected?: boolean;
  children?: Menu[];
  newLinkFlag?: 0 | 1;   // 是否新窗口打开
}
```

**生命周期**：登录后从后端获取，存入 `MenuStoreService.$menuArray`（树形结构）  
**转换**：后端返回扁平数组 → `fnFlatDataHasParentToTree()` → 树形

---

### 3. User — 系统用户

**文件**：`src/app/core/services/http/system/account.service.ts`

```typescript
interface User {
  id: number;
  password: string;
  userName?: string;
  available?: boolean;
  roleName?: string[];
  sex?: 1 | 0;
  telephone?: string;
  mobile?: string | number;
  email?: string;
  lastLoginTime?: Date;
  oldPassword?: string;
  departmentId?: number;
  departmentName?: string;
}
```

**API**：`/user/list`（分页查询）、`/user/{id}`（详情）、`/user/create`、`/user/update`、`/user/del/`

---

### 4. Role — 角色

**文件**：`src/app/core/services/http/system/role.service.ts`

```typescript
interface Role {
  id?: number;
  roleName: string;
  roleDesc?: string;
}
```

**API**：`/role/list`、`/role/{id}`、`/role/create`、`/role/update`、`/role/del`

---

### 5. Permission — 权限（菜单权限树）

**文件**：`src/app/core/services/http/system/role.service.ts`

```typescript
interface Permission {
  hasChildren: boolean;
  menuName: string;
  code: string;
  fatherId: number;
  id: number;
  menuGrade: number;       // 层级
  permissionVo: Permission[];
  isOpen?: boolean;
  checked: boolean;
}

interface PutPermissionParam {
  permCodes: string[];
  roleId: number;
}
```

**API**：`/permission/list-role-resources/{roleId}`（查询角色权限）、`/permission/assign-role-menu`（分配权限）

---

### 6. Dept — 部门

**文件**：`src/app/core/services/http/system/dept.service.ts`

```typescript
interface Dept {
  id?: number;
  departmentName: string;
  fatherId: number;        // 父部门 ID（树形结构）
  state: 1 | 0;
  orderNum: number;
}
```

**API**：`/department/list`、`/department/{id}`、`/department/create`、`/department/update`、`/department/del/`

---

### 7. MenuListObj — 菜单管理表单对象

**文件**：`src/app/core/services/http/system/menus.service.ts`

```typescript
interface MenuListObj {
  menuName: string;
  code: string;
  alIcon: string;
  icon: string;
  orderNum: number;
  menuType: 'C' | 'F';
  path: string;
  visible: 0 | 1;
  status: boolean;
  newLinkFlag: 0 | 1;
}
```

**API**：`/menu/list`、`/menu/{id}`、`/menu/create`、`/menu/update`、`/menu/del`

---

### 8. UserPsd — 修改密码

**文件**：`src/app/core/services/http/system/account.service.ts`

```typescript
interface UserPsd {
  id: number;
  oldPassword: string;
  newPassword: string;
}
```

**API**：`/user/psd`（PUT）

---

## 通用数据结构

### PageInfo — 分页响应

**文件**：`src/app/core/services/types.ts`

```typescript
interface PageInfo<T> {
  pageIndex: number;
  pageSize: number;
  total: number;
  list: T[];
  // 可选：size, orderBy, startRow, endRow, pages, firstPage, prePage, nextPage, lastPage...
}
```

### SearchCommonVO — 分页查询请求

```typescript
interface SearchCommonVO<T> {
  pageIndex: number;
  pageSize: number;
  filters?: T;
}
```

### ActionResult — HTTP 响应包装

**文件**：`src/app/core/services/http/base-http.service.ts`

```typescript
interface ActionResult<T> {
  code: number;   // 200/201=成功，其他=失败
  msg: string;
  data: T;
}
```

### OptionsInterface — 下拉选项

```typescript
interface OptionsInterface {
  value: number | string;
  label: string;
}
```

### CascaderOption — 级联选择

```typescript
interface CascaderOption {
  value: number | string;
  label: string;
  children?: CascaderOption[];
  isLeaf?: boolean;
}
```

---

## UI 状态对象

### SettingInterface — 主题设置

**文件**：`src/app/core/services/store/common-store/theme.service.ts`

```typescript
interface SettingInterface {
  theme: 'dark' | 'light';
  color: string;
  mode: 'side' | 'top' | 'mixin';
  colorWeak: boolean;
  greyTheme: boolean;
  fixedHead: boolean;
  splitNav: boolean;
  fixedLeftNav: boolean;
  isShowTab: boolean;
  fixedTab: boolean;
  hasTopArea: boolean;
  hasFooterArea: boolean;
  hasNavArea: boolean;
  hasNavHeadArea: boolean;
}
```

### TabModel — 多页签

**文件**：`src/app/core/services/common/tab.service.ts`

```typescript
interface TabModel {
  title: string;
  path: string;
  snapshotArray: ActivatedRouteSnapshot[];
}
```

### AntTableConfig — 表格配置

**文件**：`src/app/shared/components/ant-table/ant-table.component.ts`

```typescript
interface AntTableConfig {
  pageIndex: number;
  pageSize: number;
  total: number;
  loading: boolean;
  headers: TableHeader[];
  showCheckbox?: boolean;
  needNoScroll?: boolean;
  xScroll?: number;
  yScroll?: number;
}
```

---

## 枚举与常量

### ModalBtnStatus

**文件**：`src/app/widget/base-modal.ts`

```typescript
enum ModalBtnStatus {
  Cancel = 0,
  Ok = 1
}
```

### StyleTheme

**文件**：`src/app/core/services/store/common-store/theme.service.ts`

```typescript
type StyleTheme = 'default' | 'dark' | 'aliyun' | 'compact';
```

### 错误码常量

**文件**：`src/app/config/constant.ts`

| 常量 | 值 | 说明 |
|------|-----|------|
| `loginTimeOutCode` | 1012 | 登录超时，弹出登录对话框 |
| `tokenErrorCode` | 1010 | Token 错误，重新登录 |

---

## 跨模块共享对象

| 对象 | 共享范围 | 文件 |
|------|---------|------|
| `Menu` | core → layout(side-nav) → pages(system/menu) | `core/services/types.ts` |
| `UserInfo` | core → layout(tool-bar) → pages(system/account) | `userInfo-store.service.ts` |
| `PageInfo<T>` | 所有分页列表页 | `core/services/types.ts` |
| `SearchCommonVO<T>` | 所有分页查询 | `core/services/types.ts` |
| `AntTableConfig` | 所有使用 ant-table 的页面 | `shared/components/ant-table/` |
| `SettingInterface` | layout(default) → setting-drawer | `theme.service.ts` |
| `TabModel` | layout(tab) ↔ tab.service | `tab.service.ts` |
