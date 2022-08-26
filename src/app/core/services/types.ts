/*
 * 通用interface
 * */

import { Type } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

// 动态组件
export class DynamicComponent {
  constructor(public component: Type<NzSafeAny>, public data: NzSafeAny) {}
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
  list: T[];
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
  fatherId: number | string;
  path: string;
  menuName: string;
  menuType: 'C' | 'F'; // c:菜单，f按钮
  icon?: string; // 如果showIcon为false，设置这个为搜索窗口时，最左侧的icon
  alIcon?: string; // 如果showIcon为false，设置这个为搜索窗口时，最左侧的icon
  open?: boolean;
  selected?: boolean; // 是否选中
  children?: Menu[];
  code?: string; // 权限码
  newLinkFlag?: 0 | 1; // 是否是新页
}
