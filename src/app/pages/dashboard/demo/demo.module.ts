import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';


@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    SharedModule,
    DemoRoutingModule
  ]
})
export class DemoModule { }
