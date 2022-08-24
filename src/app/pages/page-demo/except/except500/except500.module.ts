import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { Except500RoutingModule } from './except500-routing.module';
import { Except500Component } from './except500.component';

@NgModule({
  declarations: [Except500Component],
  imports: [CommonModule, SharedModule, Except500RoutingModule]
})
export class Except500Module {}
