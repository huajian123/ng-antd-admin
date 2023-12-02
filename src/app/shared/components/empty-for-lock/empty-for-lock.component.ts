import { Component, ChangeDetectionStrategy, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { LockScreenFlag, LockScreenStoreService } from '@store/common-store/lock-screen-store.service';

/*此组件为了解决锁屏时f12仍然能查看到被隐藏的页面，而创建的空白页面*/

@Component({
  selector: 'app-empty-for-lock',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class EmptyForLockComponent {
  // 路由的锁屏状态
  routeStatus!: LockScreenFlag;
  destroyRef = inject(DestroyRef);
  private lockScreenStoreService = inject(LockScreenStoreService);

  constructor() {
    this.lockScreenStoreService
      .getLockScreenStore()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.routeStatus = res;
      });
  }
}
