import { Route } from '@angular/router';

export default [
  { path: 'gaode-map', title: 'menu.default:feat:charts:gaode-map', data: { key: 'gaode-map' }, loadComponent: () => import('./gaode-map/gaode-map.component').then(m => m.GaodeMapComponent) },
  { path: 'baidu-map', title: 'menu.default:feat:charts:baidu-map', data: { key: 'baidu-map' }, loadComponent: () => import('./baidu-map/baidu-map.component').then(m => m.BaiduMapComponent) },
  { path: 'echarts', title: 'menu.default:feat:charts:echarts', data: { key: 'echarts' }, loadComponent: () => import('./echarts/echarts.component').then(m => m.EchartsComponent) },
  { path: '', redirectTo: 'gaode-map', pathMatch: 'full' }
] satisfies Route[];
