/*
* 通用interface
* */

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


export interface UserLogin {
  name: string;
  password: string;
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
