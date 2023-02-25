import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { enableProdMode, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import interceptors from '@app/core/services/interceptors';
import { CoreModule } from '@core/core.module';
import { InitThemeService } from '@core/services/common/init-theme.service';
import { LoadAliIconCdnService } from '@core/services/common/load-ali-icon-cdn.service';
import { SubLockedStatusService } from '@core/services/common/sub-locked-status.service';
import { SubWindowWithService } from '@core/services/common/sub-window-with.service';
import { ThemeSkinService } from '@core/services/common/theme-skin.service';
import { StartupService } from '@core/startup/startup.service';
import { environment } from '@env/environment';
import { PasswordStrengthMeterModule } from '@shared/biz-components/password-strength-meter/password-strength-meter.module';
import { SharedModule } from '@shared/shared.module';
import { LoginModalModule } from '@widget/biz-widget/login/login-modal.module';

export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

export function LoadAliIconCdnFactory(loadAliIconCdnService: LoadAliIconCdnService) {
  return () => loadAliIconCdnService.load();
}

export function InitThemeServiceFactory(initThemeService: InitThemeService) {
  return async () => await initThemeService.initTheme();
}

export function InitLockedStatusServiceFactory(subLockedStatusService: SubLockedStatusService) {
  return () => subLockedStatusService.initLockedStatus();
}

export function SubWindowWithServiceFactory(subWindowWithService: SubWindowWithService) {
  return () => subWindowWithService.subWindowWidth();
}

const APPINIT_PROVIDES = [
  // 项目启动
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true
  },
  // load阿里图标库cdn
  {
    provide: APP_INITIALIZER,
    useFactory: LoadAliIconCdnFactory,
    deps: [LoadAliIconCdnService],
    multi: true
  },
  // 初始化锁屏服务
  {
    provide: APP_INITIALIZER,
    useFactory: InitLockedStatusServiceFactory,
    deps: [SubLockedStatusService],
    multi: true
  },
  // 初始化主题
  {
    provide: APP_INITIALIZER,
    useFactory: InitThemeServiceFactory,
    deps: [InitThemeService],
    multi: true
  },
  // 初始化监听屏幕宽度服务
  {
    provide: APP_INITIALIZER,
    useFactory: SubWindowWithServiceFactory,
    deps: [SubWindowWithService],
    multi: true
  },
  // 初始化暗黑模式还是default模式的css
  {
    provide: APP_INITIALIZER,
    useFactory: (themeService: ThemeSkinService) => () => {
      return themeService.loadTheme();
    },
    deps: [ThemeSkinService],
    multi: true
  }
];

if (environment.production) {
  enableProdMode();
}
/*
 * https://netbasal.com/reduce-change-detection-cycles-with-event-coalescing-in-angular-c4037199859f
 * ngZoneEventCoalescing: true，ngZoneRunCoalescing: true
 * 第一个表示事件冒泡的变更检测合并，第二个表示事件循环的变更检测合并,可以提高性能，
 * 目前我观察到涉及到动态组件切换，或者一些关于视图销毁到操作，会让路由后面加个？，例如：localhost:4200/?#/blank/other-login/login1
 * 解决方法是 手动触发一次变更检测。项目内全文搜索"ngZoneEventCoalescing，ngZoneRunCoalescing例子,请查看main.ts"，我会将因为这个导致的变更检测问题，全部标记这个注释。
 * 如果你把握不住，可以删除{ ngZoneEventCoalescing: true, ngZoneRunCoalescing: true }，也无所谓
 * 如果你发现任何运行结果与你想象中的结果不一样时，请尝试使用this.cdr.detectChanges();手动触发一次变更检测,典型例子在"分步表单"中，点击"下一步"切换组件会有体现
 *
 * */
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, CoreModule, SharedModule, LoginModalModule, PasswordStrengthMeterModule.forRoot(), AppRoutingModule),
    ...interceptors,
    ...APPINIT_PROVIDES,
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
  ]
}).catch(err => console.error(err));
