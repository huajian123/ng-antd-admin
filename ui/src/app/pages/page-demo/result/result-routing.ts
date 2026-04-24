import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'role-manage', pathMatch: 'full' },
  { path: 'success', title: 'menu.default:page-demo:result:success', data: { key: 'success' }, loadComponent: () => import('./success/success.component').then(m => m.SuccessComponent) },
  { path: 'fail', title: 'menu.default:page-demo:result:fail', data: { key: 'fail' }, loadComponent: () => import('./fail/fail.component').then(m => m.FailComponent) }
] satisfies Route[];
