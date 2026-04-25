import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, inject, DestroyRef, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { LockedKey, salt } from '@config/constant';
import { LoginInOutService } from '@core/services/common/login-in-out.service';
import { WindowService } from '@core/services/common/window.service';
import { LockScreenStoreService } from '@store/common-store/lock-screen-store.service';
import { fnCheckForm, fnEncrypt } from '@utils/tools';
import { getDay } from 'date-fns';

import { TranslateModule } from '@ngx-translate/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrl: './lock-screen.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzIconModule, NzButtonModule, NzGridModule, NzAvatarModule, FormsModule, NzFormModule, ReactiveFormsModule, NzInputModule, AsyncPipe, DatePipe, TranslateModule]
})
export class LockScreenComponent implements OnInit {
  public showUnlock = false;
  public time$: Observable<Date> = timer(0, 1000).pipe(
    map(() => new Date()),
    takeUntilDestroyed() // 这里没加  this.destroyRef 是因为在生命周期中https://stackoverflow.com/questions/76264067/takeuntildestroyed-can-only-be-used-within-an-injection-context
  );
  validateForm!: FormGroup;
  passwordVisible = false;
  lockedState = computed(() => {
    return this.lockScreenStoreService.lockScreenSignalStore();
  });
  destroyRef = inject(DestroyRef);

  private lockScreenStoreService = inject(LockScreenStoreService);
  private router = inject(Router);
  private loginOutService = inject(LoginInOutService);
  private fb = inject(FormBuilder);
  private windowSrv = inject(WindowService);

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
    if (this.lockedState().locked) {
      // 密码正确则解锁
      if (this.lockedState().password === this.validateForm.get('password')!.value) {
        this.router.navigateByUrl(this.lockedState().beforeLockPath);
        this.unlock();
      } else {
        this.validateForm.get('password')!.setErrors({ notRight: true });
      }
    }
  }

  // 解锁
  unlock(): void {
    const lockedStatus = { locked: false, password: '', beforeLockPath: '' };
    this.lockScreenStoreService.lockScreenSignalStore.set(lockedStatus);
    this.windowSrv.setSessionStorage(LockedKey, fnEncrypt(lockedStatus, salt));
  }

  // 点击解锁按钮
  unlockBtn(): void {
    this.validateForm.reset();
    this.showUnlock = true;
  }

  getWeekdayKey(date: NzSafeAny): string {
    return `lockScreen.weekday.${getDay(date)}`;
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
