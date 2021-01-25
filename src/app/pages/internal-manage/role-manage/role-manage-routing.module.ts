import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoleManageComponent} from './role-manage.component';
import {SetRoleComponent} from './set-role/set-role.component';

const routes: Routes = [
  {path: 'set-role/:id', component: SetRoleComponent, data: {title: '角色管理', key: 'set-role', relatedLink: ['role', 'set-role']}},
  {path: '', component: RoleManageComponent, data: {title: '角色管理', key: 'role', relatedLink: ['role', 'set-role']}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManageRoutingModule {
}
