import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardTableWrapComponent} from './card-table-wrap.component';
import {SHARED_ZORRO_MODULES} from '../../shared-zorro.module';
import {DirectivesModule} from '../../directives/directives.module';


@NgModule({
  declarations: [CardTableWrapComponent],
    imports: [
        CommonModule,
        ...SHARED_ZORRO_MODULES,
        DirectivesModule
    ],
  exports: [
    CardTableWrapComponent
  ]
})
export class CardTableWrapModule {
}
