import {NgModule} from '@angular/core';
import {PageHeaderComponent} from './page-header.component';
import {SHARED_ZORRO_MODULES} from '../../shared-zorro.module';
import {CommonModule} from '@angular/common';
import {NzOutletModule} from "ng-zorro-antd/core/outlet";

@NgModule({
  declarations: [PageHeaderComponent],
  imports: [
    CommonModule,
    SHARED_ZORRO_MODULES,
    NzOutletModule,
  ],
  exports: [PageHeaderComponent]
})
export class PageHeaderModule {
}
