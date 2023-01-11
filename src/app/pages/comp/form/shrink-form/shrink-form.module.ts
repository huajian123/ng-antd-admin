import { NgModule } from '@angular/core';

import { ShrinkFormRoutingModule } from './shrink-form-routing.module';
import { ShrinkFormComponent } from './shrink-form.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    ShrinkFormComponent
  ],
  imports: [
    SharedModule,
    ShrinkFormRoutingModule
  ]
})
export class ShrinkFormModule { }
