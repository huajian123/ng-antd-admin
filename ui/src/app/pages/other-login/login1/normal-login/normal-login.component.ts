import { Component, OnInit, ChangeDetectionStrategy, inject, DestroyRef, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginType } from '@app/pages/other-login/login1/login1.component';
import { TokenKey, TokenPre } from '@config/constant';
import { WindowService } from '@core/services/common/window.service';
import { Login1StoreService } from '@store/biz-store-service/other-login/login1-store.service';
import { SpinService } from '@store/common-store/spin.service';
import { UserInfoStoreService } from '@store/common-store/userInfo-store.service';
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
  imports: [FormsModule, NzFormModule, ReactiveFormsModule, NzGridModule, NzInputModule, NzButtonModule, NzIconModule, NzCheckboxModule, NzWaveModule, NzDividerModule]
})
export class NormalLoginComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;
  password?: string;
  typeEnum = LoginType;
  isOverModel = computed(() => {
    return this.login1StoreService.isLogin1OverModelSignalStore();
  });
  destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private spinService = inject(SpinService);
  private login1StoreService = inject(Login1StoreService);
  private userInfoService = inject(UserInfoStoreService);
  private windowServe = inject(WindowService);

  submitForm(): void {
    this.spinService.$globalSpinStore.set(true);
    this.windowServe.setSessionStorage(TokenKey, 'TokenPre + token');
    const userInfo = this.userInfoService.parsToken(TokenPre);
    this.userInfoService.$userInfo.set(userInfo);
    // if (!fnCheckForm(this.validateForm)) {
    //   return;
    // }
    setTimeout(() => {
      // 请查看src/app/pages/login/login-form/login-form.component.ts文件中的登录逻辑
      // 这里的登录逻辑只是做个展示示例
      this.router.navigateByUrl('default/dashboard/analysis').then(() => {
        this.spinService.$globalSpinStore.set(false);
      });
    }, 100);
  }

  goOtherWay(type: LoginType): void {
    this.login1StoreService.$loginTypeStore.set(type);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null]
    });
  }
}
