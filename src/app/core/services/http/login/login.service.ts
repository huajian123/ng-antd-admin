import {Inject, Injectable} from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import {BaseHttpService} from "@services/base-http.service";
import {Menu, UserToken} from "@core/services/types";
import {MENU_TOKEN} from "@config/menu";

export interface UserLogin {
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: BaseHttpService, @Inject(MENU_TOKEN) public menus: Menu[],) {
  }

  public login(params: UserLogin): Observable<UserToken> {
    return this.http.post('/login', params, {needSuccessInfo: false});
  }

  public getMenuByUserId(userId: number): Observable<Menu[]> {
    // 延迟两秒发送，模拟从接口获取
    return of(this.menus).pipe(delay(1));
  }
}
