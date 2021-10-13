import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SHARED_ZORRO_MODULES} from "./shared-zorro.module";
import {PipesModule} from "./pipes/pipes.module";
import {DirectivesModule} from "./directives/directives.module";
import {BizComponentsModule} from "./biz-components/biz-components.module";
import {ComponentsModule} from "./components/components.module";
import {CardTableWrapModule} from "./components/card-table-wrap/card-table-wrap.module";

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  PipesModule,
  ComponentsModule,
  DirectivesModule,
  CardTableWrapModule,
  BizComponentsModule,
  ...SHARED_ZORRO_MODULES
];


@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class SharedModule {
}
