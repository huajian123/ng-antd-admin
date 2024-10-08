import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'except403', pathMatch: 'full' },
  { path: 'except403', title: '403', data: { key: 'except403' }, loadComponent: () => import('./except403/except403.component').then(m => m.Except403Component) },
  { path: 'except404', title: '404', data: { key: 'except404' }, loadComponent: () => import('./except404/except404.component').then(m => m.Except404Component) },
  { path: 'except500', title: '500', data: { key: 'except500' }, loadComponent: () => import('./except500/except500.component').then(m => m.Except500Component) },
  { path: 'network-error', title: '网络错误', data: { key: 'network-error' }, loadComponent: () => import('./network-error/network-error.component').then(m => m.NetworkErrorComponent) },
  { path: 'no-data', title: '无数据', data: { key: 'no-data' }, loadComponent: () => import('./no-data/no-data.component').then(m => m.NoDataComponent) }
] satisfies Route[];
