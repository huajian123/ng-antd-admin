import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DirectivesModule } from '@shared/directives/directives.module';
import { SHARED_ZORRO_MODULES } from '@shared/shared-zorro.module';

import { CardTableWrapComponent } from './card-table-wrap.component';

@NgModule({
    imports: [CommonModule, ...SHARED_ZORRO_MODULES, DirectivesModule, DragDropModule, CardTableWrapComponent],
    exports: [CardTableWrapComponent]
})
export class CardTableWrapModule {}
