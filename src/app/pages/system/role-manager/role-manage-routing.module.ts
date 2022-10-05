import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionCode } from '@config/actionCode';

import { RoleManageComponent } from './role-manage.component';
import { SetRoleComponent } from './set-role/set-role.component';

const routes: Routes = [
  {
    path: 'set-role',
    component: SetRoleComponent,
    data: {
      title: '角色管理',
      key: 'set-role',
      authCode: ActionCode.RoleManagerSetRole
    }
  },
  {
    path: '',
    component: RoleManageComponent,
    data: { title: '角色管理', key: 'role-manage' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManageRoutingModule {}
