import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { NormalLoginComponent } from '@app/pages/other-login/login1/normal-login/normal-login.component';
import { PhoneLoginComponent } from '@app/pages/other-login/login1/phone-login/phone-login.component';
import { QrLoginComponent } from '@app/pages/other-login/login1/qr-login/qr-login.component';
import { RegistLoginComponent } from '@app/pages/other-login/login1/regist-login/regist-login.component';
import { StyleThemeModelKey } from '@config/constant';
import { ThemeSkinService } from '@core/services/common/theme-skin.service';
import { WindowService } from '@core/services/common/window.service';
import { AdComponent, DynamicComponent } from '@core/services/types';
import { AdDirective } from '@shared/directives/ad.directive';
import { Login1StoreService } from '@store/biz-store-service/other-login/login1-store.service';
import { ThemeService } from '@store/common-store/theme.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

import { AdDirective as AdDirective_1 } from '../../../shared/directives/ad.directive';

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
  standalone: true,
  imports: [NzGridModule, NzCardModule, AdDirective_1, NzSwitchModule, FormsModule, NzDropDownModule, NzIconModule, NzButtonModule, NzMenuModule, AsyncPipe]
})
export class Login1Component implements OnInit {
  private themesService = inject(ThemeService);
  private themeSkinService = inject(ThemeSkinService);
  private windowServe = inject(WindowService);
  private cdr = inject(ChangeDetectorRef);
  private login1StoreService = inject(Login1StoreService);
  private breakpointObserver = inject(BreakpointObserver);

  private adHost!: AdDirective;
  isOverModel = true;
  isNightTheme$ = this.themesService.getIsNightTheme();
  destroyRef = inject(DestroyRef);
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
    const mode = isNight ? 'dark' : 'default';
    this.windowServe.setStorage(StyleThemeModelKey, mode);
    this.themesService.setStyleThemeMode(mode);
    this.themeSkinService.toggleTheme().then(() => {
      this.cdr.markForCheck();
    });
  }

  subLoginType(): void {
    this.login1StoreService
      .getLoginTypeStore()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.to(this.getCurrentComponent(res));
      });
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 1200px)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.isOverModel = res.matches;
        this.login1StoreService.setIsLogin1OverModelStore(res.matches);
        this.cdr.detectChanges();
      });
  }
}
