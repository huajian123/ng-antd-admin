import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { LockScreenFlag, LockScreenStoreService } from '@store/common-store/lock-screen-store.service';

/*守卫锁屏页面*/
@Injectable({
  providedIn: 'root'
})
export class LockLeaveGuard implements CanDeactivate<unknown> {
  private routeStatus!: LockScreenFlag;

  constructor(private router: Router, private lockScreenStoreService: LockScreenStoreService) {
    this.lockScreenStoreService.getLockScreenStore().subscribe(res => {
      this.routeStatus = res;
    });
  }

  canDeactivate(component: unknown, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
    return !this.routeStatus.locked;
  }
}
