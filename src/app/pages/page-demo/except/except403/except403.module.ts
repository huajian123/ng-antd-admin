import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { Except403RoutingModule } from './except403-routing.module';
import { Except403Component } from './except403.component';

@NgModule({
  declarations: [Except403Component],
  imports: [CommonModule, SharedModule, Except403RoutingModule]
})
export class Except403Module {}
