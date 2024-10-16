import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'login1', pathMatch: 'full' },
  { path: 'login1', title: '第一种登录', data: { key: 'login1' }, loadComponent: () => import('./login1/login1.component').then(m => m.Login1Component) }
] satisfies Route[];
