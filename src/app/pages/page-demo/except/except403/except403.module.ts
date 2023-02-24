import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { Except403RoutingModule } from './except403-routing.module';
import { Except403Component } from './except403.component';

@NgModule({
    imports: [CommonModule, SharedModule, Except403RoutingModule, Except403Component]
})
export class Except403Module {}
