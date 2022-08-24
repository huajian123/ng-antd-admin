import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { LockedKey, salt } from '@config/constant';
import { DestroyService } from '@core/services/common/destory.service';
import { LoginInOutService } from '@core/services/common/login-in-out.service';
import { WindowService } from '@core/services/common/window.service';
import { LockScreenFlag, LockScreenStoreService } from '@store/common-store/lock-screen-store.service';
import { fnCheckForm, fnEncrypt } from '@utils/tools';
import { getDay } from 'date-fns';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class LockScreenComponent implements OnInit {
  public showUnlock = false;
  public time$: Observable<Date> = timer(0, 1000).pipe(
    map(() => new Date()),
    takeUntil(this.destroy$)
  );
  validateForm!: FormGroup;
  passwordVisible = false;
  lockedState: LockScreenFlag = {
    locked: false,
    password: '',
    beforeLockPath: '' // 锁屏前的页面路由
  };

  constructor(
    private destroy$: DestroyService,
    private router: Router,
    private loginOutService: LoginInOutService,
    private lockScreenStoreService: LockScreenStoreService,
    private fb: FormBuilder,
    private windowSrv: WindowService
  ) {}

  // 返回登录页面则解锁
  loginOut(): void {
    this.unlock();
    this.loginOutService.loginOut().then();
  }

  // 进入系统
  intoSys(): void {
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
    if (this.lockedState.locked) {
      // 密码正确则解锁
      if (this.lockedState.password === this.validateForm.get('password')!.value) {
        this.router.navigateByUrl(this.lockedState.beforeLockPath);
        this.unlock();
      } else {
        this.validateForm.get('password')!.setErrors({ notRight: true });
      }
    }
  }

  // 解锁
  unlock(): void {
    const lockedStatus = { locked: false, password: '', beforeLockPath: '' };
    this.lockScreenStoreService.setLockScreenStore(lockedStatus);
    this.windowSrv.setSessionStorage(LockedKey, fnEncrypt(lockedStatus, salt));
  }

  // 点击解锁按钮
  unlockBtn(): void {
    this.validateForm.reset();
    this.showUnlock = true;
  }

  getDays(date: NzSafeAny): 0 | 1 | 2 | 3 | 4 | 5 | 6 {
    return getDay(date);
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]]
    });
  }

  subLockedState(): void {
    this.lockScreenStoreService
      .getLockScreenStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.lockedState = res;
      });
  }

  ngOnInit(): void {
    this.subLockedState();
    this.initForm();
  }
}
