import { Route } from '@angular/router';
export default [
  { path: '', redirectTo: 'base-detail', pathMatch: 'full' },
  { path: 'base-detail', title: 'menu.default:page-demo:detail:base-detail', data: { key: 'base-detail' }, loadComponent: () => import('./base-detail/base-detail.component').then(m => m.BaseDetailComponent) },
  { path: 'adv-detail', title: 'menu.default:page-demo:detail:adv-detail', data: { key: 'adv-detail' }, loadComponent: () => import('./adv-detail/adv-detail.component').then(m => m.AdvDetailComponent) }
] satisfies Route[];
