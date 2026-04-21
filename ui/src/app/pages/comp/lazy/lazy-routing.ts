import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'lazy-basic', pathMatch: 'full' },
  { path: 'lazy-basic', title: '懒加载基础实例', data: { key: 'lazy-basic' }, loadComponent: () => import('./lazy-basic/lazy-basic.component').then(m => m.LazyBasicComponent) },
  { path: 'lazy-scroll', title: '滚动懒加载', data: { key: 'lazy-scroll' }, loadComponent: () => import('./lazy-scroll/lazy-scroll.component').then(m => m.LazyScrollComponent) },
  { path: 'lazy-defer', title: '组件defer加载', data: { key: 'lazy-defer' }, loadComponent: () => import('./lazy-defer/lazy-defer').then(m => m.LazyDefer) },
  { path: 'dynamic-comp', title: '动态组件', data: { key: 'dynamic-comp' }, loadComponent: () => import('./dynamic-comp/dynamic-comp').then(m => m.DynamicComp) },
  { path: 'lazy-loadscript', title: '懒加载script', data: { key: 'lazy-loadscript' }, loadComponent: () => import('./lazy-loadscript/lazy-loadscript').then(m => m.LazyLoadscript) }
] satisfies Route[];
