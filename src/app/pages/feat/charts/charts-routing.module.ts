import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'gaode-map', data: { title: '高德', key: 'gaode-map' }, loadComponent: () => import('./gaode-map/gaode-map.component').then(m => m.GaodeMapComponent) },
  { path: 'baidu-map', data: { title: '百度', key: 'baidu-map' }, loadComponent: () => import('./baidu-map/baidu-map.component').then(m => m.BaiduMapComponent) },
  { path: 'echarts', data: { title: 'Echarts', key: 'echarts' }, loadComponent: () => import('./echarts/echarts.component').then(m => m.EchartsComponent) },
  { path: '', redirectTo: 'gaode-map', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule {}
