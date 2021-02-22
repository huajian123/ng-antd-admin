/*
* 通用interface
* */

import {Type} from '@angular/core';

export class DynamicComponent {
  constructor(public component: Type<any>, public data: any) {
  }
}

export interface OptionsInterface {
  value: number | string;
  label: string;
}

export interface SearchCommonVO<T> {
  pageNum: number;
  pageSize: number;
  filters?: T;
}

export interface PageInfo<T> {
  pageNum?: number;
  pageSize?: number;
  size?: number;
  orderBy?: string;
  startRow?: number;
  endRow?: number;
  total?: number;
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

export interface AdComponent {
  data: any;
}

// 级联选择数据结构
export interface CascaderOption {
  value: number | string;
  label: string;
  children?: CascaderOption[];
  isLeaf?: boolean;
}


export interface UserLogin {
  name: string;
  password: string;
}

export interface User extends UserLogin {
  token: string;
}


/*
* 菜单
* */

export interface Menu {
  path?: string;
  title: string;
  icon?: string;
  open?: boolean;
  selected?: boolean;
  children?: Menu[];
  actionCode?: string;
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
* 用户管理
* */

export interface People {
  id?: number;
  password: string;
  userName: string;
  available: boolean;
  departmentName: string;
  departmentId: number | number[];
  firstDepartmentGradeId: number;
  secondDepartmentGradeId: number;
  thirdDepartmentGradeId: number;
  roleName: string[];
  sex: 1 | 0;
  telephone: string;
  mobile: string | number;
  email: string;
  lastLoginTime: Date;
}


/*
*  权限
* */
export interface Permission {
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
*  部门列表
* */
export interface DeptObj {
  id: number;
  departmentName: string;
  departmentDesc: string;
  fatherId: number;
  departmentGrade: number;
  departmentVos: DeptObj[];
  expand: boolean;
}
