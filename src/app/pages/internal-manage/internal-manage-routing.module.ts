import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'role',  loadChildren: () => import('./role-manage/role-manage.module').then(m => m.RoleManageModule)},
  {path: 'user',  loadChildren: () => import('./user-manage/user-manage.module').then(m => m.UserManageModule)},
  {path: '', redirectTo: 'role', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalManageRoutingModule { }
