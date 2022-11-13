import { QuanlyComponent } from './quanly.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanlyRoutingModule } from './quanly-routing.module';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    QuanlyComponent
  ],
  imports: [
    SharedModule,
    QuanlyRoutingModule
  ]
})
export class QuanlyModule { }
