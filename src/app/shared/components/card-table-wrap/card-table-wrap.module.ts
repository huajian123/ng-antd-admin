import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardTableWrapComponent} from './card-table-wrap.component';
import {SHARED_ZORRO_MODULES} from '../../shared-zorro.module';
import {DirectivesModule} from '../../directives/directives.module';
import {DragDropModule} from "@angular/cdk/drag-drop";


@NgModule({
  declarations: [CardTableWrapComponent],
    imports: [
        CommonModule,
        ...SHARED_ZORRO_MODULES,
        DirectivesModule,
        DragDropModule
    ],
  exports: [
    CardTableWrapComponent
  ]
})
export class CardTableWrapModule {
}
