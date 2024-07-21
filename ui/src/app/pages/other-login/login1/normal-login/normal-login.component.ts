import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginType } from '@app/pages/other-login/login1/login1.component';
import { TokenKey, TokenPre } from '@config/constant';
import { WindowService } from '@core/services/common/window.service';
import { Login1StoreService } from '@store/biz-store-service/other-login/login1-store.service';
import { SpinService } from '@store/common-store/spin.service';
import { UserInfoService } from '@store/common-store/userInfo.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-normal-login',
  templateUrl: './normal-login.component.html',
  styleUrls: ['./normal-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, NzFormModule, ReactiveFormsModule, NzGridModule, NzInputModule, NzButtonModule, NzIconModule, NzCheckboxModule, NzWaveModule, NzDividerModule]
})
export class NormalLoginComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;
  password?: string;
  typeEnum = LoginType;
  isOverModel = false;
  destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private spinService = inject(SpinService);
  private login1StoreService = inject(Login1StoreService);
  private userInfoService = inject(UserInfoService);
  private cdr = inject(ChangeDetectorRef);
  private windowServe = inject(WindowService);

  submitForm(): void {
    this.spinService.setCurrentGlobalSpinStore(true);
    this.windowServe.setSessionStorage(TokenKey, 'TokenPre + token');
    const userInfo = this.userInfoService.parsToken(TokenPre);
    this.userInfoService.setUserInfo(userInfo);
    // if (!fnCheckForm(this.validateForm)) {
    //   return;
    // }
    setTimeout(() => {
      // 请查看src/app/pages/login/login-form/login-form.component.ts文件中的登录逻辑
      // 这里的登录逻辑只是做个展示示例
      this.router.navigateByUrl('default/dashboard/analysis').then(() => {
        this.spinService.setCurrentGlobalSpinStore(false);
      });
    }, 100);
  }

  goOtherWay(type: LoginType): void {
    this.login1StoreService.setLoginTypeStore(type);
  }

  ngOnInit(): void {
    this.login1StoreService
      .getIsLogin1OverModelStore()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.isOverModel = res;
        this.cdr.markForCheck();
      });
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null]
    });
  }
}
