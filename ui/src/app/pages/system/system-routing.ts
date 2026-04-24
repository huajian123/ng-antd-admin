import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'dept', pathMatch: 'full' },
  { path: 'menu', title: 'menu.default:system:menu', data: { key: 'menu' }, loadComponent: () => import('./menu/menu.component').then(m => m.MenuComponent) },
  { path: 'account', title: 'menu.default:system:account', data: { key: 'account' }, loadComponent: () => import('./account/account.component').then(m => m.AccountComponent) },
  { path: 'dept', title: 'menu.default:system:dept', data: { key: 'dept' }, loadComponent: () => import('./dept/dept.component').then(m => m.DeptComponent) },
  { path: 'role-manager', loadChildren: () => import('./role-manager/role-manage-routing') }
] satisfies Route[];
