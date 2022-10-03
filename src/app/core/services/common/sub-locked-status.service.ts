import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

import { LockedKey, salt } from '@config/constant';
import { WindowService } from '@core/services/common/window.service';
import { LockScreenStoreService } from '@store/common-store/lock-screen-store.service';
import { fnDecrypt, fnEncrypt } from '@utils/tools';

// 监听锁屏状态
@Injectable({
  providedIn: 'root'
})
export class SubLockedStatusService {
  constructor(private windowSer: WindowService, private lockScreenStoreService: LockScreenStoreService) {}

  initLockedStatus(): void {
    // 判断是否有缓存
    const hasCash = this.windowSer.getSessionStorage(LockedKey);
    if (hasCash) {
      this.lockScreenStoreService.setLockScreenStore(fnDecrypt(hasCash, salt));
    } else {
      this.lockScreenStoreService
        .getLockScreenStore()
        .pipe(first())
        .subscribe(res => this.windowSer.setSessionStorage(LockedKey, fnEncrypt(JSON.stringify(res), salt)));
    }
  }
}
