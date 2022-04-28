import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompRoutingModule } from './comp-routing.module';
import { DescComponent } from './desc/desc.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CompRoutingModule
  ]
})
export class CompModule { }
