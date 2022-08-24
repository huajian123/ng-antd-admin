import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'gaode-map', loadChildren: () => import('./gaode-map/gaode-map.module').then(m => m.GaodeMapModule) },
  { path: 'baidu-map', loadChildren: () => import('./baidu-map/baidu-map.module').then(m => m.BaiduMapPageModule) },
  { path: 'echarts', loadChildren: () => import('./echarts/echarts.module').then(m => m.EchartsModule) },
  { path: '', redirectTo: 'gaode-map', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule {}
