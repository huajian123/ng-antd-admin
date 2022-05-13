import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild
} from '@angular/router';
import {Observable} from 'rxjs';
import {WindowService} from '../window.service';
import {TokenKey} from "@config/constant";

// 路由守卫，没有TokenKey则跳转登录页
@Injectable({
  providedIn: 'root'
})
export class JudgLoginGuard implements CanActivateChild {
  constructor(private windowSrc: WindowService, private router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isLogin = !!this.windowSrc.getSessionStorage(TokenKey);
    if (isLogin) {
      return true;
    }
    return this.router.parseUrl('/login');
    }
}
