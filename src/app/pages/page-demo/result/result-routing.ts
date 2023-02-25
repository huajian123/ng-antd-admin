import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'role-manage', pathMatch: 'full' },
  { path: 'success', data: { title: '成功页', key: 'success' }, loadComponent: () => import('./success/success.component').then(m => m.SuccessComponent) },
  { path: 'fail', data: { title: '失败页', key: 'fail' }, loadComponent: () => import('./fail/fail.component').then(m => m.FailComponent) }
] as Route[];
