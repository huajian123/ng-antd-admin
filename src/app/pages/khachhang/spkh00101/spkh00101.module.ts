import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spkh00101RoutingModule } from './spkh00101-routing.module';
import { Spkh00101Component } from './spkh00101.component';
import { SharedModule } from '@app/shared/shared.module';
import { SubwindowkhachhangModule } from '@app/widget/modal/subwindowkhachhang/subwindowkhachhang.module';


@NgModule({
  declarations: [
    Spkh00101Component
  ],
  imports: [
    CommonModule,
    Spkh00101RoutingModule,
    SubwindowkhachhangModule,
    SharedModule
  ]
})
export class Spkh00101Module { }
