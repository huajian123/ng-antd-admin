import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoleManageComponent} from './role-manage.component';

const routes: Routes = [
  {path: '', component: RoleManageComponent, data: {title: '角色管理', key: 'role-manage'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManageRoutingModule { }
