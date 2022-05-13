/*
* 通用interface
* */

import {Type} from '@angular/core';
import {NzSafeAny} from "ng-zorro-antd/core/types";

// 动态组件
export class DynamicComponent {
  constructor(public component: Type<NzSafeAny>, public data: NzSafeAny) {
  }
}

// select下拉
export interface OptionsInterface {
  value: number | string;
  label: string;
}

// 列表搜索
export interface SearchCommonVO<T> {
  pageNum: number;
  pageSize: number;
  filters?: T;
}

// 分页
export interface PageInfo<T> {
  pageNum: number;
  pageSize: number;
  size?: number;
  orderBy?: string;
  startRow?: number;
  endRow?: number;
  total: number;
  pages?: number;
  list: Array<T>;
  firstPage?: number;
  prePage?: number;
  nextPage?: number;
  lastPage?: number;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  navigatePages?: number;
  navigatepageNums?: number[];
}

// 动态组件
export interface AdComponent {
  data: NzSafeAny;
}

// 级联选择数据结构
export interface CascaderOption {
  value: number | string;
  label: string;
  children?: CascaderOption[];
  isLeaf?: boolean;
}

/*
* 菜单
* */

export interface Menu {
  id: number | string;
  parentId: number | string;
  path: string;
  menuName: string;
  menuType: 'C' | 'F'; // c:菜单，f按钮
  icon?: string; // 如果showIcon为false，设置这个为搜索窗口时，最左侧的icon
  alIcon?: string; // 如果showIcon为false，设置这个为搜索窗口时，最左侧的icon
  open?: boolean;
  selected?: boolean; // 是否选中
  children?: Menu[];
  code?: string; // 权限码
  newLinkFlag?: boolean; // 是否是新页
}


/*
*  权限
* */
export interface Permission {
  hasChildren: boolean;
  menuName: string;
  code: string;
  fatherId: number;
  id: number;
  menuGrade: number; // 级别
  permissionVo: Permission[];
  isOpen?: boolean; // 是否折叠
  checked: boolean;
}

// 更新权限参数接口
export interface PutPermissionParam {
  permissionIds: number[];
  roleId: number;
}

/*
* 角色
* */
export interface Role {
  id?: number;
  roleName: string;
  roleDesc?: string;
}

/*
*  部门列表
* */
export interface Dept {
  id?: number;
  departmentName: string;
  fatherId: number;
  state: 1 | 0;
  orderNum: number;
}
/*
* 用户管理
* */

export interface User {
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

/*
* 用户修改密码
* */
export interface UserPsd {
  id: number;
  oldPassword: string;
  newPassword: string;
}





