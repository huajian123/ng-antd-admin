import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaiduMapComponent } from '@app/pages/feat/charts/baidu-map/baidu-map.component';

const routes: Routes = [{ path: '', component: BaiduMapComponent, data: { title: 'Baidu', key: 'baidu-map' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaiduMapRoutingModule {}
