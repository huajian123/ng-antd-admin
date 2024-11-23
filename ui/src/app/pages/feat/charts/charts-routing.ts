import { Route } from '@angular/router';

export default [
  { path: 'gaode-map', title: '高德', data: { key: 'gaode-map' }, loadComponent: () => import('./gaode-map/gaode-map.component').then(m => m.GaodeMapComponent) },
  { path: 'baidu-map', title: '百度', data: { key: 'baidu-map' }, loadComponent: () => import('./baidu-map/baidu-map.component').then(m => m.BaiduMapComponent) },
  { path: 'echarts', title: 'Echarts', data: { key: 'echarts' }, loadComponent: () => import('./echarts/echarts.component').then(m => m.EchartsComponent) },
  { path: '', redirectTo: 'gaode-map', pathMatch: 'full' }
] satisfies Route[];
