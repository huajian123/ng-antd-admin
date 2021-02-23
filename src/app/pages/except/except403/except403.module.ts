import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Except403RoutingModule } from './except403-routing.module';
import { Except403Component } from './except403.component';
import {SharedModule} from '../../../share/shared.module';


@NgModule({
  declarations: [Except403Component],
  imports: [
    CommonModule,
    SharedModule,
    Except403RoutingModule
  ]
})
export class Except403Module { }
