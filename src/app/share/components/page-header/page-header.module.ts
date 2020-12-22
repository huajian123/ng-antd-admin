import {NgModule} from '@angular/core';

import {PageHeaderComponent} from './page-header.component';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';

@NgModule({
  declarations: [PageHeaderComponent],
  imports: [
    NzPageHeaderModule,
    NzBreadCrumbModule
  ],
  exports: [PageHeaderComponent]
})
export class PageHeaderModule {
}
