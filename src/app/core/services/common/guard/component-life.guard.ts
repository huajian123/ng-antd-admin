import {ComponentRef, Injectable} from '@angular/core';
import {CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {fnFormatePath} from '../../../../utils/tools';
import {SimpleReuseStrategy} from '../reuse-strategy';

@Injectable({
  providedIn: 'root'
})
export class ComponentLifeGuard implements CanActivate, CanDeactivate<unknown> {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (fnFormatePath(nextState!.url) === 'role' && fnFormatePath(currentState.url) === 'set-role') {
      SimpleReuseStrategy.waitDelete = 'set-role';
      SimpleReuseStrategy.deleteRouteSnapshot('set-role');
    }
    return true;
  }
}
