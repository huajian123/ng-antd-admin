import { NgModule } from '@angular/core';

import { GaodeRoutingModule } from './gaode-routing.module';
import { GaodeComponent } from './gaode.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    GaodeComponent
  ],
  imports: [
    SharedModule,
    GaodeRoutingModule
  ]
})
export class GaodeModule { }
