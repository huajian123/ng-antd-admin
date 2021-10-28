import {Inject, Injectable, OnInit} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {WindowService} from '../window.service';
import {MENU_TOKEN} from "../../../../config/menu";
import {Menu} from "../../types";
import {AuthService} from "../../store/auth.service";

@Injectable({
  providedIn: 'root'
})
export class JudgAuthGuard implements CanActivate{
  authCodeArray: string[] = [];
  selMenu!: Menu;
  constructor(private windowSrc: WindowService, private router: Router, @Inject(MENU_TOKEN) private menuNavList: Menu[], private authService: AuthService) {
  }

  getMenu(menu: Menu[], url: string): void {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].path === url) {
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
    this.authService.getAuthCode().subscribe(res => this.authCodeArray = res);
    this.getMenu(this.menuNavList, state.url)
    return this.authCodeArray.includes(this.selMenu?.actionCode!) ? true : this.router.parseUrl('/login');
  }
}
