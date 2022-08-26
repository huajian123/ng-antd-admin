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
      authCode: ActionCode.RoleManagerSetRole,
      relatedLink: ['role-manage', 'set-role']
    }
  },
  {
    path: '',
    component: RoleManageComponent,
    data: { title: '角色管理', key: 'role-manage', relatedLink: ['role-manage', 'set-role'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManageRoutingModule {}
