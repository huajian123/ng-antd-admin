import { NgModule } from '@angular/core';

import { BaiduMapRoutingModule } from './baidu-map-routing.module';
import {SharedModule} from "@shared/shared.module";
import {BaiduMapComponent} from "@app/pages/feat/charts/baidu-map/baidu-map.component";

// O7EUG8p2Mp0Ne6bm8HygWspxwjEdPvdY

@NgModule({
  declarations: [BaiduMapComponent],
  imports: [
    SharedModule,
    BaiduMapRoutingModule
  ]
})
export class BaiduMapPageModule { }
