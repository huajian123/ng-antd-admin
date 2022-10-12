import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';

import { LoginInOutService } from '@core/services/common/login-in-out.service';
import { MenuStoreService } from '@store/common-store/menu-store.service';
import { UserInfoService } from '@store/common-store/userInfo.service';
import { fnGetUUID } from '@utils/tools';
import { NzMessageService } from 'ng-zorro-antd/message';

import { Menu } from '../../types';
import { WindowService } from '../window.service';

// 用于切换路由时判断该用户是否有权限进入该业务页面，如果没有权限则跳转到登录页
@Injectable({
  providedIn: 'root'
})
export class JudgeAuthGuard implements CanActivateChild {
  authCodeArray: string[] = [];
  selMenu!: Menu | null;
  menuNavList: Menu[] = [];

  constructor(
    private windowSrc: WindowService,
    private loginOutService: LoginInOutService,
    private router: Router,
    private userInfoService: UserInfoService,
    private menuStoreService: MenuStoreService,
    private message: NzMessageService
  ) {
    this.menuStoreService.getMenuArrayStore().subscribe(res => {
      this.menuNavList = res;
    });
  }

  // 保存当前的menu到this.selMenu
  getMenu(menu: Menu[], url: string): void {
    for (let i = 0; i < menu.length; i++) {
      if (url === menu[i].path) {
        this.selMenu = menu[i];
        return;
      } else {
        if (menu[i].children && menu[i].children!.length > 0) {
          this.getMenu(menu[i].children!, url);
        }
      }
    }
  }

  getResult(code: string, authCodeArray: string[]): boolean | UrlTree {
    if (authCodeArray.includes(code)) {
      return true;
    } else {
      this.message.error('您没有权限登录该模块');
      this.loginOutService.loginOut();
      return this.router.parseUrl('/login');
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    this.userInfoService.getUserInfo().subscribe(res => (this.authCodeArray = res.authCode));
    while (route.firstChild) {
      route = route.firstChild;
    }
    // 如果有authCode，则表示是页面上点击按钮跳转到新的路由，而不是菜单中的路由
    if (!!route.data['authCode']) {
      return this.getResult(route.data['authCode'], this.authCodeArray);
    }

    // 如果是菜单上的按钮，则走下面
    this.getMenu(this.menuNavList, state.url);
    // 没找到菜单，直接回登录页
    if (!this.selMenu) {
      return this.getResult(fnGetUUID(), this.authCodeArray);
    }
    const selMenuCode = this.selMenu.code;
    this.selMenu = null;
    // 找到了菜单，但是菜单的权限码用户不拥有，则跳转到登录页
    return this.getResult(selMenuCode!, this.authCodeArray);
  }
}
