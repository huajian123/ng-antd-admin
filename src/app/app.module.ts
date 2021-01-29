import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './share/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import interceptors from './core/services/interceptors';
import {StartupService} from './core/startup/startup.service';
import {LoginModalModule} from './widget/biz-widget/login/login-modal.module';


export function StartupServiceFactory(startupService: StartupService): any {
  return () => startupService.load();
}

// 初始化服务
const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
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
    AppRoutingModule,
  ],
  providers: [...interceptors, ...APPINIT_PROVIDES],
  bootstrap: [AppComponent]
})
export class AppModule {
}
