import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {WindowService} from '../window.service';
import {AuthKey} from "@config/constant";

@Injectable({
  providedIn: 'root'
})
export class JudgLoginGuard implements CanActivate {
  constructor(private windowSrc: WindowService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogin = !!this.windowSrc.getStorage(AuthKey);
    if (isLogin) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}
