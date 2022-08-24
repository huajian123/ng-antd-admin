import { NgModule } from '@angular/core';

import { GaodeMapComponent } from '@app/pages/feat/charts/gaode-map/gaode-map.component';
import { SharedModule } from '@shared/shared.module';

import { GaodeMapRoutingModule } from './gaode-map-routing.module';

@NgModule({
  declarations: [GaodeMapComponent],
  imports: [SharedModule, GaodeMapRoutingModule]
})
export class GaodeMapModule {}
