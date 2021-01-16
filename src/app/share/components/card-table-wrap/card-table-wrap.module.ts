import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardTableWrapComponent} from './card-table-wrap.component';
import {SHARED_ZORRO_MODULES} from '../../shared-zorro.module';


@NgModule({
  declarations: [CardTableWrapComponent],
  imports: [
    CommonModule,
    ...SHARED_ZORRO_MODULES
  ],
  exports: [
    CardTableWrapComponent
  ]
})
export class CardTableWrapModule {
}
