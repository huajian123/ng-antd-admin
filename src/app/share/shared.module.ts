import {NgModule} from '@angular/core';
import {SHARED_ZORRO_MODULES} from './shared-zorro.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PipesModule} from './pipes/pipes.module';
import {ComponentsModule} from './components/components.module';
import {QuicklinkModule} from 'ngx-quicklink';
import {CardTableWrapModule} from "./components/card-table-wrap/card-table-wrap.module";

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  PipesModule,
  ComponentsModule,
  QuicklinkModule,
  CardTableWrapModule,
  ...SHARED_ZORRO_MODULES
];

@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class SharedModule {
}
