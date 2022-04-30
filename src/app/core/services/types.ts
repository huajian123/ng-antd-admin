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

export interface UserToken {
  token: string;
}


/*
* 菜单
* */

export interface Menu {
  path: string;
  title: string;
  icon?: string; // 如果showIcon为false，设置这个为搜索窗口时，最左侧的icon
  alIcon?: string; // 如果showIcon为false，设置这个为搜索窗口时，最左侧的icon
  open?: boolean;
  showIcon: boolean; // 是否展示icon
  selected?: boolean; // 是否选中
  children?: Menu[];
  actionCode?: string; // 权限码
  isNewLink?: boolean; // 是否是新页
}


