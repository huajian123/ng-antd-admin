
import { DOCUMENT, registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { ScrollService } from '@core/services/common/scroll.service';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';

import { SimpleReuseStrategy } from './services/common/reuse-strategy';
import { StoreModule } from '@ngrx/store';
import { xeReducer } from './store/xe/xe.reducer';

registerLocaleData(vi);

@NgModule({
  imports: [
    StoreModule.forFeature('feature_xe', xeReducer)
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy, deps: [DOCUMENT, ScrollService] },
    { provide: NZ_I18N, useValue: vi_VN }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
