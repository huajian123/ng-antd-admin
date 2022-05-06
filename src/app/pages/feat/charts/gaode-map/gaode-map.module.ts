import { NgModule } from '@angular/core';

import { GaodeMapRoutingModule } from './gaode-map-routing.module';
import {SharedModule} from "@shared/shared.module";
import {GaodeMapComponent} from "@app/pages/feat/charts/gaode-map/gaode-map.component";


@NgModule({
  declarations: [
    GaodeMapComponent
  ],
  imports: [
    SharedModule,
    GaodeMapRoutingModule
  ]
})
export class GaodeMapModule { }
