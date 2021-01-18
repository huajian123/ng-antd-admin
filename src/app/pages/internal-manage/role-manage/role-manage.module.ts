import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManageRoutingModule } from './role-manage-routing.module';
import { RoleManageComponent } from './role-manage.component';


@NgModule({
  declarations: [RoleManageComponent],
  imports: [
    CommonModule,
    RoleManageRoutingModule
  ]
})
export class RoleManageModule { }
