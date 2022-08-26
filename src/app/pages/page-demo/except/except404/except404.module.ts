import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { Except404RoutingModule } from './except404-routing.module';
import { Except404Component } from './except404.component';

@NgModule({
  declarations: [Except404Component],
  imports: [CommonModule, SharedModule, Except404RoutingModule]
})
export class Except404Module {}
