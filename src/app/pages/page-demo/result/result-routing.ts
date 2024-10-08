import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'role-manage', pathMatch: 'full' },
  { path: 'success', title: '成功页', data: { key: 'success' }, loadComponent: () => import('./success/success.component').then(m => m.SuccessComponent) },
  { path: 'fail', title: '失败页', data: { key: 'fail' }, loadComponent: () => import('./fail/fail.component').then(m => m.FailComponent) }
] satisfies Route[];
