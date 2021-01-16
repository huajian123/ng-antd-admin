export interface UserLogin {
  name: string;
  password: string;
}
export interface SearchCommonVO<T> {
  pageNum: number;
  pageSize: number;
  filters?: T;
}
