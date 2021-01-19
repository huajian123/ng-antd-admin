import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManageRoutingModule } from './role-manage-routing.module';
import { RoleManageComponent } from './role-manage.component';
import {SharedModule} from '../../../share/shared.module';
import { SetRoleComponent } from './set-role/set-role.component';


@NgModule({
  declarations: [RoleManageComponent, SetRoleComponent],
  imports: [
    CommonModule,
    SharedModule,
    RoleManageRoutingModule
  ]
})
export class RoleManageModule { }
