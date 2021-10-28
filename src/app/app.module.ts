import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {StartupService} from "./core/startup/startup.service";
import {ThemeSkinService} from "./core/services/common/theme-skin.service";
import {SubWindowWithService} from "./core/services/common/sub-window-with.service";
import {InitThemeService} from "./core/services/common/init-theme.service";
import {QuicklinkModule} from "ngx-quicklink";
import {SharedModule} from "./shared/shared.module";
import interceptors from './core/services/interceptors';
import {LoginModalModule} from "./widget/biz-widget/login/login-modal.module";


export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

export function InitThemeServiceFactory(initThemeService: InitThemeService) {
  return async () => await initThemeService.initTheme();
}

export function SubWindowWithServiceFactory(subWindowWithService: SubWindowWithService) {
  return () => subWindowWithService.subWindowWidth();
}


// 初始化服务
const APPINIT_PROVIDES = [
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
  {
    provide: APP_INITIALIZER,
    useFactory: InitThemeServiceFactory,
    deps: [InitThemeService],
    multi: true,
  },
  {
    provide: APP_INITIALIZER,
    useFactory: SubWindowWithServiceFactory,
    deps: [SubWindowWithService],
    multi: true,
  },
  {
    provide: APP_INITIALIZER,
    useFactory: (themeService: ThemeSkinService) => () => {
      return themeService.loadTheme();
    },
    deps: [ThemeSkinService],
    multi: true,
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    LoginModalModule,
    QuicklinkModule,
    AppRoutingModule,
  ],
  providers: [...interceptors, ...APPINIT_PROVIDES],
  bootstrap: [AppComponent]
})
export class AppModule {
}
