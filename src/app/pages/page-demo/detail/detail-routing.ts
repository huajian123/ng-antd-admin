import { Route } from '@angular/router';
export default [
  { path: '', redirectTo: 'base-detail', pathMatch: 'full' },
  { path: 'base-detail', data: { title: '基础详情页', key: 'base-detail' }, loadComponent: () => import('./base-detail/base-detail.component').then(m => m.BaseDetailComponent) },
  { path: 'adv-detail', data: { title: '高级详情页', key: 'adv-detail' }, loadComponent: () => import('./adv-detail/adv-detail.component').then(m => m.AdvDetailComponent) }
] as Route[];
