import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManageRoutingModule } from './user-manage-routing.module';
import { UserManageComponent } from './user-manage.component';


@NgModule({
  declarations: [UserManageComponent],
  imports: [
    CommonModule,
    UserManageRoutingModule
  ]
})
export class UserManageModule { }
