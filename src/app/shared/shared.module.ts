import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BizComponentsModule } from './biz-components/biz-components.module';
import { CardTableWrapModule } from './components/card-table-wrap/card-table-wrap.module';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';

const MODULES = [CommonModule, FormsModule, ReactiveFormsModule, PipesModule, ComponentsModule, DirectivesModule, CardTableWrapModule, BizComponentsModule, ...SHARED_ZORRO_MODULES];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES]
})
export class SharedModule {}
