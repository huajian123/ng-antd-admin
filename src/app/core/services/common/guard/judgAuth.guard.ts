import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {WindowService} from '../window.service';
import {Menu} from "../../types";
import {MenuStoreService} from "@store/common-store/menu-store.service";
import {UserInfoService} from "@store/common-store/userInfo.service";

// 用于切换路由时判断该用户是否有权限进入该业务页面，如果没有权限则跳转到登录页
@Injectable({
  providedIn: 'root'
})
export class JudgAuthGuard implements CanActivate {
  authCodeArray: string[] = [];
  selMenu!: Menu;
  menuNavList: Menu[] = [];

  constructor(private windowSrc: WindowService, private router: Router, private userInfoService: UserInfoService,
              private menuStoreService: MenuStoreService,) {
    this.menuStoreService.getMenuArrayStore().subscribe(res => this.menuNavList = res);
  }

  getMenu(menu: Menu[], url: string): void {
    for (let i = 0; i < menu.length; i++) {
      if (url.includes(menu[i].path)) {
        this.selMenu = menu[i];
        return;
      } else {
        if (menu[i].children && menu[i].children!.length > 0) {
          this.getMenu(menu[i].children!, url);
        }
      }
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userInfoService.getUserInfo().subscribe(res => this.authCodeArray = res.authCode);
    this.getMenu(this.menuNavList, state.url)
    return this.authCodeArray.includes(this.selMenu?.actionCode!) ? true : this.router.parseUrl('/login');
  }
}
