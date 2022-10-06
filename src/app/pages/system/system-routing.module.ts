import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dept', pathMatch: 'full' },
  { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'dept', loadChildren: () => import('./dept/dept.module').then(m => m.DeptModule) },
  { path: 'role-manager', loadChildren: () => import('./role-manager/role-manage.module').then(m => m.RoleManageModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
