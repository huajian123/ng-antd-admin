import { Spch00201Component } from './spch00201.component';
import { NgModule } from '@angular/core';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import { Spch00201RoutingModule } from './spch00201-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { SubwindowproductModule } from '@app/widget/modal/subwindowproduct/subwindowproduct.module';
import { SubwindowchiphiModule } from '@app/widget/modal/subwindowchiphi/subwindowchiphi.module';

@NgModule({
  declarations: [
    Spch00201Component
  ],
  imports: [
    Spch00201RoutingModule,
    SharedModule,
    NzHighlightModule,
    SubwindowproductModule,
    SubwindowchiphiModule
  ]

})
export class Spch00201Module { }
