import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShrinkFormRoutingModule } from './shrink-form-routing.module';
import { ShrinkFormComponent } from './shrink-form.component';


@NgModule({
  declarations: [
    ShrinkFormComponent
  ],
  imports: [
    CommonModule,
    ShrinkFormRoutingModule
  ]
})
export class ShrinkFormModule { }
