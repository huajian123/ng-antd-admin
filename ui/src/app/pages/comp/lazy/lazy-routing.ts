import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'lazy-basic', pathMatch: 'full' },
  { path: 'lazy-basic', title: 'menu.default:comp:lazy:lazy-basic', data: { key: 'lazy-basic' }, loadComponent: () => import('./lazy-basic/lazy-basic.component').then(m => m.LazyBasicComponent) },
  { path: 'lazy-scroll', title: 'menu.default:comp:lazy:lazy-scroll', data: { key: 'lazy-scroll' }, loadComponent: () => import('./lazy-scroll/lazy-scroll.component').then(m => m.LazyScrollComponent) },
  { path: 'lazy-defer', title: 'menu.default:comp:lazy:lazy-defer', data: { key: 'lazy-defer' }, loadComponent: () => import('./lazy-defer/lazy-defer').then(m => m.LazyDefer) },
  { path: 'dynamic-comp', title: 'menu.default:comp:lazy:dynamic-comp', data: { key: 'dynamic-comp' }, loadComponent: () => import('./dynamic-comp/dynamic-comp').then(m => m.DynamicComp) },
  { path: 'lazy-loadscript', title: 'menu.default:comp:lazy:lazy-loadscript', data: { key: 'lazy-loadscript' }, loadComponent: () => import('./lazy-loadscript/lazy-loadscript').then(m => m.LazyLoadscript) }
] satisfies Route[];
