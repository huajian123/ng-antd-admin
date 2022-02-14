import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeTableComponent } from './tree-table.component';
import {SHARED_ZORRO_MODULES} from "@shared/shared-zorro.module";
import {PipesModule} from "@shared/pipes/pipes.module";



@NgModule({
  declarations: [
    TreeTableComponent
  ],
  imports: [
    CommonModule,
    SHARED_ZORRO_MODULES,
    PipesModule
  ],
  exports: [
    TreeTableComponent
  ]
})
export class TreeTableModule { }
