import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PipesModule } from '@shared/pipes/pipes.module';
import { SHARED_ZORRO_MODULES } from '@shared/shared-zorro.module';

import { AntTableComponent } from './ant-table.component';

@NgModule({
    imports: [CommonModule, SHARED_ZORRO_MODULES, PipesModule, AntTableComponent],
    exports: [AntTableComponent]
})
export class AntTableModule {}
