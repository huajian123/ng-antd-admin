import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import {Observable, Subject, timer} from "rxjs";
import {map, takeUntil} from "rxjs/operators";
import {getDay} from 'date-fns'
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {fnCheckForm, fnDecrypt, fnEncrypt} from "@utils/tools";
import {LockedKey, salt} from "@config/constant";
import {WindowService} from "@core/services/common/window.service";
import {LockScreenFlag, LockScreenStoreService} from "@store/lock-screen-store/lock-screen-store.service";
import {LoginOutService} from "@core/services/common/login-out.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LockScreenComponent implements OnInit, OnDestroy {
  private destory$ = new Subject<void>();
  public showUnlock = false;
  public time$: Observable<Date> = timer(0, 1000).pipe(map(() => new Date()), takeUntil(this.destory$));
  validateForm!: FormGroup;
  passwordVisible = false;
  lockedState: LockScreenFlag = {
    locked: false,
    password: '',
    beforeLockPath: ''// 锁屏前的页面路由
  }


  constructor(private router: Router, private loginOutService: LoginOutService, private lockScreenStoreService: LockScreenStoreService, private fb: FormBuilder, private windowSrv: WindowService) {
  }

  // 返回登录页面则解锁
  loginOut(): void {
    this.unlock()
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
        this.validateForm.get('password')!.setErrors({notRight: true})
      }
    }
  }

  // 解锁
  unlock(): void {
    const lockedStatus = {locked: false, password: '', beforeLockPath: ''};
    this.lockScreenStoreService.setLockScreenStore(lockedStatus);
    this.windowSrv.setSessionStorage(LockedKey, fnEncrypt(lockedStatus, salt));
  }

  // 点击解锁按钮
  unlockBtn(): void {
    this.validateForm.reset();
    this.showUnlock = true;
  }

  getDays(date: NzSafeAny) {
    return getDay(date);
  }


  initForm(): void {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]],
    });
  }

  subLockedState(): void {
    this.lockScreenStoreService.getLockScreenStore().pipe(takeUntil(this.destory$)).subscribe(res => {
      this.lockedState = res;
    })
  }

  ngOnInit(): void {
    this.subLockedState();
    this.initForm();
  }

  ngOnDestroy() {
    this.destory$.next();
    this.destory$.complete();
  }

}
