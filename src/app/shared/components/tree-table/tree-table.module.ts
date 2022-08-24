import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PipesModule } from '@shared/pipes/pipes.module';
import { SHARED_ZORRO_MODULES } from '@shared/shared-zorro.module';

import { TreeTableComponent } from './tree-table.component';

@NgModule({
  declarations: [TreeTableComponent],
  imports: [CommonModule, SHARED_ZORRO_MODULES, PipesModule],
  exports: [TreeTableComponent]
})
export class TreeTableModule {}
