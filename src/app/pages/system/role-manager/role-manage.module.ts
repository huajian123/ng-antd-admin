import { NgModule } from '@angular/core';

import { RoleManageRoutingModule } from '@app/pages/system/role-manager/role-manage-routing.module';
import { SharedModule } from '@shared/shared.module';
import { RoleManageModalModule } from '@widget/biz-widget/system/role-manage-modal/role-manage-modal.module';

import { RoleManageComponent } from './role-manage.component';
import { SetRoleComponent } from './set-role/set-role.component';

@NgModule({
  declarations: [RoleManageComponent, SetRoleComponent],
  imports: [SharedModule, RoleManageModalModule, RoleManageRoutingModule]
})
export class RoleManageModule {}
