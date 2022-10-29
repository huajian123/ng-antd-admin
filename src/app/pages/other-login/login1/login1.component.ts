import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { NormalLoginComponent } from '@app/pages/other-login/login1/normal-login/normal-login.component';
import { PhoneLoginComponent } from '@app/pages/other-login/login1/phone-login/phone-login.component';
import { QrLoginComponent } from '@app/pages/other-login/login1/qr-login/qr-login.component';
import { RegistLoginComponent } from '@app/pages/other-login/login1/regist-login/regist-login.component';
import { IsNightKey } from '@config/constant';
import { DestroyService } from '@core/services/common/destory.service';
import { ThemeSkinService } from '@core/services/common/theme-skin.service';
import { WindowService } from '@core/services/common/window.service';
import { AdComponent, DynamicComponent } from '@core/services/types';
import { AdDirective } from '@shared/directives/ad.directive';
import { Login1StoreService } from '@store/biz-store-service/other-login/login1-store.service';
import { ThemeService } from '@store/common-store/theme.service';

export enum LoginType {
  Normal,
  Phone,
  Qr,
  Register
}

interface LoginFormComponentInterface {
  type: LoginType;
  component: DynamicComponent;
}

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class Login1Component implements OnInit {
  private adHost!: AdDirective;
  isOverModel = true;
  isNightTheme$ = this.themesService.getIsNightTheme();

  @ViewChild(AdDirective) set adHost1(content: AdDirective) {
    if (content) {
      this.adHost = content;
      this.subLoginType();
      this.cdr.detectChanges();
    }
  }

  formData: LoginFormComponentInterface[] = [
    { type: LoginType.Normal, component: new DynamicComponent(NormalLoginComponent, {}) },
    { type: LoginType.Phone, component: new DynamicComponent(PhoneLoginComponent, {}) },
    { type: LoginType.Qr, component: new DynamicComponent(QrLoginComponent, {}) },
    { type: LoginType.Register, component: new DynamicComponent(RegistLoginComponent, {}) }
  ];

  constructor(
    private destroy$: DestroyService,
    private themeSkinService: ThemeSkinService,
    private windowServe: WindowService,
    private cdr: ChangeDetectorRef,
    private login1StoreService: Login1StoreService,
    private breakpointObserver: BreakpointObserver,
    private themesService: ThemeService
  ) {}

  getCurrentComponent(type: LoginType): LoginFormComponentInterface {
    return this.formData.find(item => item.type === type)!;
  }

  to(adItem: LoginFormComponentInterface): void {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component.component);
    componentRef.instance.data = adItem.component.data;
    // ngZoneEventCoalescing，ngZoneRunCoalescing例子
    this.cdr.detectChanges();
  }

  changeNight(isNight: boolean): void {
    this.windowServe.setStorage(IsNightKey, `${isNight}`);
    this.themesService.setIsNightTheme(isNight);
    this.themeSkinService.toggleTheme().then(() => {
      this.cdr.markForCheck();
    });
  }

  subLoginType(): void {
    this.login1StoreService
      .getLoginTypeStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.to(this.getCurrentComponent(res));
      });
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 1200px)'])
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.isOverModel = res.matches;
        this.login1StoreService.setIsLogin1OverModelStore(res.matches);
        this.cdr.detectChanges();
      });
  }
}
