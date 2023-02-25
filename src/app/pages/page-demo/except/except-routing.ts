import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'except403', pathMatch: 'full' },
  { path: 'except403', data: { title: '403', key: 'except403' }, loadComponent: () => import('./except403/except403.component').then(m => m.Except403Component) },
  { path: 'except404', data: { title: '404', key: 'except404' }, loadComponent: () => import('./except404/except404.component').then(m => m.Except404Component) },
  { path: 'except500', data: { title: '500', key: 'except500' }, loadComponent: () => import('./except500/except500.component').then(m => m.Except500Component) },
  { path: 'network-error', data: { title: '网络错误', key: 'network-error' }, loadComponent: () => import('./network-error/network-error.component').then(m => m.NetworkErrorComponent) },
  { path: 'no-data', data: { title: '无数据', key: 'no-data' }, loadComponent: () => import('./no-data/no-data.component').then(m => m.NoDataComponent) }
] as Route[];
