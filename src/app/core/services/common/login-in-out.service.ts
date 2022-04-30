import {Injectable} from '@angular/core';
import {TabService} from "@core/services/common/tab.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "@core/services/common/window.service";
import {TokenKey, TokenPre} from "@config/constant";
import {SimpleReuseStrategy} from "@core/services/common/reuse-strategy";
import {fnFormatePath} from "@utils/tools";
import {MenuStoreService} from "@store/common-store/menu-store.service";
import {UserInfo, UserInfoService} from "@store/common-store/userInfo.service";
import {LoginService} from "@services/login/login.service";
import {Observable} from "rxjs";
import {Menu} from "@core/services/types";

/*
* 退出登录
* */

@Injectable({
  providedIn: 'root'
})
export class LoginInOutService {

  constructor(private activatedRoute: ActivatedRoute,
              private tabService: TabService,
              private loginService: LoginService,
              private router: Router,
              private userInfoService: UserInfoService,
              private menuService: MenuStoreService,
              private windowServe: WindowService) {
  }

  getMenuByUserId(userId: number): Observable<Menu[]> {
    return this.loginService.getMenuByUserId(userId)
  }

  loginIn(token: string): Promise<void> {
    return new Promise(resolve => {
      this.windowServe.setStorage(TokenKey, TokenPre + token);
      const userInfo: UserInfo = this.userInfoService.parsToken(TokenPre);
      this.userInfoService.setUserInfo(userInfo);
      this.getMenuByUserId(userInfo.userId).subscribe(menus => {
        this.menuService.setMenuArrayStore(menus);
        resolve();
      })
    })
  }

  loginOut(): Promise<void> {
    return new Promise(resolve => {
      // 清空tab
      this.tabService.clearTabs();
      this.windowServe.removeStorage(TokenKey);
      SimpleReuseStrategy.handlers = {};
      SimpleReuseStrategy.scrollHandlers = {};
      this.menuService.setMenuArrayStore([]);
      // @ts-ignore
      SimpleReuseStrategy.waitDelete = fnFormatePath(this.activatedRoute.snapshot['_routerState'].url);
      this.router.navigate(['/login/login-form']).then(() => {
        resolve();
      })
    })

  }
}
