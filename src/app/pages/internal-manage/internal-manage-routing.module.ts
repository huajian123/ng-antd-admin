import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'role',  loadChildren: () => import('./role-manage/role-manage.module').then(m => m.RoleManageModule)},
  {path: '', redirectTo: 'role', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalManageRoutingModule { }
