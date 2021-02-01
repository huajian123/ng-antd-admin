import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeptManageRoutingModule } from './dept-manage-routing.module';
import { DeptManageComponent } from './dept-manage.component';


@NgModule({
  declarations: [DeptManageComponent],
  imports: [
    CommonModule,
    DeptManageRoutingModule
  ]
})
export class DeptManageModule { }
