/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { Menu } from '@core/services/types';
import { BaseHttpService } from '@services/base-http.service';
/*import {MENU_TOKEN} from "@config/menu";*/
import { MenusService } from '@services/system/menus.service';

export interface UserLogin {
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    public http: BaseHttpService,
    // @Inject(MENU_TOKEN) public menus: Menu[],
    private menuService: MenusService
  ) {}

  public login(params: UserLogin): Observable<string> {
    return this.http.post('user/login', params, { needSuccessInfo: false });
  }

  public getMenuByUserId(userId: number): Observable<Menu[]> {
    // 延迟两秒发送，模拟从接口获取
    // return of(this.menus).pipe(delay(1));
    return this.http.get("user/menu");//`/sysPermission/menu/${userId}`
  }
}
