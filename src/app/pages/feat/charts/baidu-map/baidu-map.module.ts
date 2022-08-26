import { NgModule } from '@angular/core';

import { BaiduMapComponent } from '@app/pages/feat/charts/baidu-map/baidu-map.component';
import { SharedModule } from '@shared/shared.module';

import { BaiduMapRoutingModule } from './baidu-map-routing.module';

// O7EUG8p2Mp0Ne6bm8HygWspxwjEdPvdY

@NgModule({
  declarations: [BaiduMapComponent],
  imports: [SharedModule, BaiduMapRoutingModule]
})
export class BaiduMapPageModule {}
