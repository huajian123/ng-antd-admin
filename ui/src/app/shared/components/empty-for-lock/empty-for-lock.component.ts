import { Component, ChangeDetectionStrategy, inject, DestroyRef, computed } from '@angular/core';

import { LockScreenStoreService } from '@store/common-store/lock-screen-store.service';

/*此组件为了解决锁屏时f12仍然能查看到被隐藏的页面，而创建的空白页面*/
@Component({
  selector: 'app-empty-for-lock',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class EmptyForLockComponent {
  destroyRef = inject(DestroyRef);
  private lockScreenStoreService = inject(LockScreenStoreService);
  // 路由的锁屏状态
  routeStatus = computed(() => {
    return this.lockScreenStoreService.lockScreenSignalStore();
  });
}
