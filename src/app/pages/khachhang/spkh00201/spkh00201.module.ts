import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spkh00201RoutingModule } from './spkh00201-routing.module';
import { Spkh00201Component } from './spkh00201.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    Spkh00201Component
  ],
  imports: [
    CommonModule,
    Spkh00201RoutingModule,
    SharedModule
  ]
})
export class Spkh00201Module { }
