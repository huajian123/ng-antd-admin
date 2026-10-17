import { inject, resource } from '@angular/core';
import { Route } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { ActionCode } from '@config/actionCode';
import { RoleService } from '@services/system/role.service';

import { RoleManageComponent } from './role-manage.component';
import { SetRoleComponent } from './set-role/set-role.component';

export default [
  {
    path: '',
    component: RoleManageComponent,
    title: 'menu.default:system:role-manager',
    data: { key: 'role-manage' }
  },
  {
    path: 'set-role/:id',
    component: SetRoleComponent,
    title: 'menu.default:system:role-manager',
    data: {
      key: 'set-role',
      authCode: ActionCode.RoleManagerSetRole
    },
    resources: ctx => {
      const roleService = inject(RoleService);

      return {
        authCodes: resource({
          params: () => {
            const id = ctx.params()['id'];
            return typeof id === 'string' ? id : undefined;
          },
          loader: ({ params: id }) => firstValueFrom(roleService.getPermissionById(id))
        })
      };
    }
  }
] satisfies Route[];
