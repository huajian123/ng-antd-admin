import {NgModule, Optional, SkipSelf} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd/i18n';
import {throwIfAlreadyLoaded} from './module-import-guard';


registerLocaleData(zh);


@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}],
  exports: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
