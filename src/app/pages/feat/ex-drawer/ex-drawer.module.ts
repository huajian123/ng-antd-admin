import { NgModule } from '@angular/core';

import { ExDrawerRoutingModule } from './ex-drawer-routing.module';
import { ExDrawerComponent } from './ex-drawer.component';
import {SharedModule} from "@shared/shared.module";
import {ExDrawerDrawerModule} from "@app/drawer/biz-drawer/ex-drawer-drawer/ex-drawer-drawer.module";


@NgModule({
  declarations: [
    ExDrawerComponent
  ],
  imports: [
    SharedModule,
    ExDrawerDrawerModule,
    ExDrawerRoutingModule
  ]
})
export class ExDrawerModule { }
