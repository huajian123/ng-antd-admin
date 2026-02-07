import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject, DestroyRef, viewChild, effect, computed, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';

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
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
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
  imports: [NzGridModule, NzCardModule, AdDirective_1, NzSwitchModule, FormsModule, NzDropdownModule, NzIconModule, NzButtonModule, NzMenuModule]
})
export class Login1Component {
  private themesService = inject(ThemeService);
  private themeSkinService = inject(ThemeSkinService);
  private windowServe = inject(WindowService);
  private cdr = inject(ChangeDetectorRef);
  private login1StoreService = inject(Login1StoreService);
  private breakpointObserver = inject(BreakpointObserver);

  // Use toSignal to convert BreakpointObserver to Signal
  isOverModel = toSignal(
    this.breakpointObserver.observe(['(max-width: 1200px)']).pipe(
      map(res => res.matches)
    ),
    { initialValue: true }
  );

  $isNightTheme = computed(() => this.themesService.$isNightTheme());
  destroyRef = inject(DestroyRef);
  readonly adHost = viewChild.required(AdDirective);

  formData: LoginFormComponentInterface[] = [
    { type: LoginType.Normal, component: new DynamicComponent(NormalLoginComponent, {}) },
    { type: LoginType.Phone, component: new DynamicComponent(PhoneLoginComponent, {}) },
    { type: LoginType.Qr, component: new DynamicComponent(QrLoginComponent, {}) },
    { type: LoginType.Register, component: new DynamicComponent(RegistLoginComponent, {}) }
  ];

  changePageTypeEffect = effect(() => {
    this.to(this.getCurrentComponent(this.login1StoreService.$loginTypeStore()));
  });

  // Sync isOverModel to store using effect
  syncIsOverModelEffect = effect(() => {
    this.login1StoreService.isLogin1OverModelSignalStore.set(this.isOverModel());
  });

  getCurrentComponent(type: LoginType): LoginFormComponentInterface {
    return this.formData.find(item => item.type === type)!;
  }

  to(adItem: LoginFormComponentInterface): void {
    const viewContainerRef = this.adHost().viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component.component);
    componentRef.instance.data = adItem.component.data;
    // ngZoneEventCoalescing，ngZoneRunCoalescing例子
    this.cdr.detectChanges();
  }

  changeNight(isNight: boolean): void {
    const mode = isNight ? 'dark' : 'default';
    this.windowServe.setStorage(StyleThemeModelKey, mode);
    this.themesService.$themeStyle.set(mode);
    this.themeSkinService.toggleTheme();
  }
}
