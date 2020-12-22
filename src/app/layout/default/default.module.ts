import { NgModule } from '@angular/core';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import {SharedModule} from '../../share/shared.module';


@NgModule({
  declarations: [DefaultComponent],
  exports: [
    DefaultComponent
  ],
  imports: [
    SharedModule,
    DefaultRoutingModule
  ]
})
export class DefaultModule { }
