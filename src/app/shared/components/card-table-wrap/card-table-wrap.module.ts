import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardTableWrapComponent} from './card-table-wrap.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {SHARED_ZORRO_MODULES} from "@shared/shared-zorro.module";
import {DirectivesModule} from "@shared/directives/directives.module";


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
