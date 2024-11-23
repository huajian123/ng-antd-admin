import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'lazy-basic', pathMatch: 'full' },
  { path: 'lazy-basic', title: '懒加载基础实例', data: { key: 'lazy-basic' }, loadComponent: () => import('./lazy-basic/lazy-basic.component').then(m => m.LazyBasicComponent) },
  { path: 'lazy-scroll', title: '滚动懒加载', data: { key: 'lazy-scroll' }, loadComponent: () => import('./lazy-scroll/lazy-scroll.component').then(m => m.LazyScrollComponent) }
] satisfies Route[];
