import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginType} from "@app/pages/other-login/login1/login1.component";
import {Login1StoreService} from "@store/biz-store-service/other-login/login1-store.service";
import {takeUntil} from "rxjs/operators";
import {SpinService} from "@store/common-store/spin.service";
import {TokenKey, TokenPre} from "@config/constant";
import {Router} from "@angular/router";
import {WindowService} from "@core/services/common/window.service";
import {DestroyService} from "@core/services/common/destory.service";
import {UserInfoService} from "@store/common-store/userInfo.service";
import {LoginService} from "@services/login/login.service";
import {MenuStoreService} from "@store/common-store/menu-store.service";

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


  constructor(private destroy$: DestroyService, private userInfoService: UserInfoService,
              private router: Router,
              private menuService: MenuStoreService,
              private dataService: LoginService,
              private windowServe: WindowService,
              private spinService: SpinService, private cdr: ChangeDetectorRef, private fb: FormBuilder, private login1StoreService: Login1StoreService,) {
  }

  submitForm(): void {
    this.spinService.setCurrentGlobalSpinStore(true);
    this.windowServe.setStorage(TokenKey, 'TokenPre + token');
    const userInfo = this.userInfoService.parsToken(TokenPre);
    this.userInfoService.setUserInfo(userInfo)
    // if (!fnCheckForm(this.validateForm)) {
    //   return;
    // }
    setTimeout(() => {
      // 这里是模拟的随便写的-1，实际情况请往下看
      this.dataService.getMenuByUserId(-1).subscribe(menus=>{
        this.menuService.setMenuArrayStore(menus);
        this.router.navigateByUrl('default/dashboard/analysis').then(()=>{
          this.spinService.setCurrentGlobalSpinStore(false);
        })
      })
    }, 100);
  }

  goOtherWay(type: LoginType): void {
    this.login1StoreService.setLoginTypeStore(type);
  }

  ngOnInit(): void {
    this.login1StoreService.getIsLogin1OverModelStore().pipe(takeUntil(this.destroy$)).subscribe((res => {
      this.isOverModel = res;
      this.cdr.markForCheck();
    }));
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null],
    });
  }
}
