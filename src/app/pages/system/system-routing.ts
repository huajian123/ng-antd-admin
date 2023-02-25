import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'dept', pathMatch: 'full' },
  { path: 'menu', data: { title: '菜单管理', key: 'menu' }, loadComponent: () => import('./menu/menu.component').then(m => m.MenuComponent) },
  { path: 'account', data: { title: '账号管理', key: 'account' }, loadComponent: () => import('./account/account.component').then(m => m.AccountComponent) },
  { path: 'dept', data: { title: '部门管理', key: 'dept' }, loadComponent: () => import('./dept/dept.component').then(m => m.DeptComponent) },
  { path: 'role-manager', loadChildren: () => import('./role-manager/role-manage-routing') }
] as Route[];
