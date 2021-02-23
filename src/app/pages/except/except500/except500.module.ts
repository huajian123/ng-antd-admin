import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Except500RoutingModule } from './except500-routing.module';
import { Except500Component } from './except500.component';
import {SharedModule} from '../../../share/shared.module';


@NgModule({
  declarations: [Except500Component],
  imports: [
    CommonModule,
    SharedModule,
    Except500RoutingModule
  ]
})
export class Except500Module { }
