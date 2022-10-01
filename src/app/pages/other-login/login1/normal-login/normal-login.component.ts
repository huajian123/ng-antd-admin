import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { LoginType } from '@app/pages/other-login/login1/login1.component';
import { TokenKey, TokenPre } from '@config/constant';
import { DestroyService } from '@core/services/common/destory.service';
import { WindowService } from '@core/services/common/window.service';
import { LoginService } from '@services/login/login.service';
import { Login1StoreService } from '@store/biz-store-service/other-login/login1-store.service';
import { MenuStoreService } from '@store/common-store/menu-store.service';
import { SpinService } from '@store/common-store/spin.service';
import { UserInfoService } from '@store/common-store/userInfo.service';

@Component({
  selector: 'app-normal-login',
  templateUrl: './normal-login.component.html',
  styleUrls: ['./normal-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class NormalLoginComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;
  password?: string;
  typeEnum = LoginType;
  isOverModel = false;

  constructor(
    private destroy$: DestroyService,
    private userInfoService: UserInfoService,
    private router: Router,
    private menuService: MenuStoreService,
    private dataService: LoginService,
    private windowServe: WindowService,
    private spinService: SpinService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private login1StoreService: Login1StoreService
  ) {}

  submitForm(): void {
    this.spinService.setCurrentGlobalSpinStore(true);
    this.windowServe.setSessionStorage(TokenKey, 'TokenPre + token');
    const userInfo = this.userInfoService.parsToken(TokenPre);
    this.userInfoService.setUserInfo(userInfo);
    setTimeout(() => {
      this.dataService.getMenuByUserId("-1").subscribe(menus => {
        this.menuService.setMenuArrayStore(menus);
        this.router.navigateByUrl('default/dashboard/analysis').then(() => {
          this.spinService.setCurrentGlobalSpinStore(false);
        });
      });
    }, 100);
  }

  goOtherWay(type: LoginType): void {
    this.login1StoreService.setLoginTypeStore(type);
  }

  ngOnInit(): void {
    this.login1StoreService
      .getIsLogin1OverModelStore()
      .pipe(takeUntil(this.destroy$))
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
