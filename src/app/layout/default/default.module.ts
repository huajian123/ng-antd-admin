import { NgModule } from '@angular/core';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import {ShareModule} from '../../share/share.module';


@NgModule({
  declarations: [DefaultComponent],
  exports: [
    DefaultComponent
  ],
  imports: [
    ShareModule,
    DefaultRoutingModule
  ]
})
export class DefaultModule { }
