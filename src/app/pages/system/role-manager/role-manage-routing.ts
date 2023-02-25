import { Route } from '@angular/router';

import { ActionCode } from '@config/actionCode';

import { RoleManageComponent } from './role-manage.component';
import { SetRoleComponent } from './set-role/set-role.component';

export default [
  {
    path: '',
    component: RoleManageComponent,
    data: { title: '角色管理', key: 'role-manage' }
  },
  {
    path: 'set-role',
    component: SetRoleComponent,
    data: {
      title: '角色管理',
      key: 'set-role',
      authCode: ActionCode.RoleManagerSetRole
    }
  }
] as Route[];
