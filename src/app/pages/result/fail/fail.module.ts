import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FailRoutingModule } from './fail-routing.module';
import { FailComponent } from './fail.component';


@NgModule({
  declarations: [FailComponent],
  imports: [
    CommonModule,
    FailRoutingModule
  ]
})
export class FailModule { }
