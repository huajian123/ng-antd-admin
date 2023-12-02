import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PageInfo, SearchCommonVO } from '../../types';
import { BaseHttpService } from '../base-http.service';

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

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  http = inject(BaseHttpService);

  public getAccount(param: SearchCommonVO<User>): Observable<PageInfo<User>> {
    return this.http.post('/user/list/', param);
  }

  public getAccountDetail(id: number): Observable<User> {
    return this.http.get(`/user/${id}/`);
  }

  public addAccount(param: User): Observable<void> {
    return this.http.post('/user/', param);
  }

  public delAccount(ids: number[]): Observable<void> {
    return this.http.post('/user/del/', { ids });
  }

  public editAccount(param: User): Observable<void> {
    return this.http.put('/user/', param);
  }

  public editAccountPsd(param: UserPsd): Observable<void> {
    return this.http.put('/user/psd', param);
  }
}
