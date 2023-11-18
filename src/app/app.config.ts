import { DOCUMENT, registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, RouteReuseStrategy, withComponentInputBinding, withHashLocation, withInMemoryScrolling, withPreloading } from '@angular/router';

import { DashboardOutline, FormOutline, MenuFoldOutline, MenuUnfoldOutline } from '@ant-design/icons-angular/icons';
import { appRoutes } from '@app/app-routing';
import interceptors from '@app/core/services/interceptors';
import { InitThemeService } from '@core/services/common/init-theme.service';
import { LoadAliIconCdnService } from '@core/services/common/load-ali-icon-cdn.service';
import { SimpleReuseStrategy } from '@core/services/common/reuse-strategy';
import { ScrollService } from '@core/services/common/scroll.service';
import { SelectivePreloadingStrategyService } from '@core/services/common/selective-preloading-strategy.service';
import { SubLockedStatusService } from '@core/services/common/sub-locked-status.service';
import { SubWindowWithService } from '@core/services/common/sub-window-with.service';
import { ThemeSkinService } from '@core/services/common/theme-skin.service';
import { StartupService } from '@core/startup/startup.service';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';

const icons = [MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, FormOutline];

registerLocaleData(zh);

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

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy, deps: [DOCUMENT, ScrollService] },
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_ICONS, useValue: icons },
    provideRouter(
      appRoutes,
      withPreloading(SelectivePreloadingStrategyService),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      }),
      withHashLocation(),
      withComponentInputBinding() // 开启路由参数绑定到组件的输入属性,ng16新增特性
    ),
    importProvidersFrom(NzDrawerModule, NzModalModule),
    ...interceptors,
    ...APPINIT_PROVIDES,
    provideAnimationsAsync(), // 开启延迟加载动画，ng17新增特性，如果想要项目启动时就加载动画，可以使用provideAnimations()
    provideHttpClient(withInterceptorsFromDi())
  ]
};
