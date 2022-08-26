import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PipesModule } from '@shared/pipes/pipes.module';
import { SHARED_ZORRO_MODULES } from '@shared/shared-zorro.module';

import { AntTableComponent } from './ant-table.component';

@NgModule({
  declarations: [AntTableComponent],
  imports: [CommonModule, SHARED_ZORRO_MODULES, PipesModule],
  exports: [AntTableComponent]
})
export class AntTableModule {}
