import {NgModule} from '@angular/core';

import {PageHeaderComponent} from './page-header.component';
import {SharedModule} from '../../shared.module';

@NgModule({
  declarations: [PageHeaderComponent],
  imports: [
    SharedModule
  ],
  exports: [PageHeaderComponent]
})
export class PageHeaderModule {
}
