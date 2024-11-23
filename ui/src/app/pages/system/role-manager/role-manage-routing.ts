import { Route } from '@angular/router';

import { ActionCode } from '@config/actionCode';

import { RoleManageComponent } from './role-manage.component';
import { SetRoleComponent } from './set-role/set-role.component';

export default [
  {
    path: '',
    component: RoleManageComponent,
    title: '角色管理',
    data: { key: 'role-manage' }
  },
  {
    path: 'set-role',
    component: SetRoleComponent,
    title: '角色管理',
    data: {
      key: 'set-role',
      authCode: ActionCode.RoleManagerSetRole
    }
  }
] satisfies Route[];
