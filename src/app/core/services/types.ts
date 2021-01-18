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



export interface Role {
  roleName: string;
  roleDesc?: string;
}
