import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoleManageRoutingModule} from './role-manage-routing.module';
import {RoleManageComponent} from './role-manage.component';
import {SharedModule} from '../../../shared/shared.module';
import {SetRoleComponent} from './set-role/set-role.component';
import {InternalManageWidgetModule} from '../../../widget/biz-widget/internal-manage/internal-manage-widget.module';


@NgModule({
  declarations: [RoleManageComponent, SetRoleComponent],
  imports: [
    CommonModule,
    SharedModule,
    InternalManageWidgetModule,
    RoleManageRoutingModule
  ]
})
export class RoleManageModule {
}
