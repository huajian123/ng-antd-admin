import { NgModule } from '@angular/core';
import { ExDrawerDrawerComponent } from './ex-drawer-drawer.component';
import {SharedModule} from "@shared/shared.module";



@NgModule({
  declarations: [
    ExDrawerDrawerComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ExDrawerDrawerModule { }
