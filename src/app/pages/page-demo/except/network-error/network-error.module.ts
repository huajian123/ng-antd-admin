import { NgModule } from '@angular/core';

import { NetworkErrorRoutingModule } from './network-error-routing.module';
import { NetworkErrorComponent } from './network-error.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    NetworkErrorComponent
  ],
  imports: [
    SharedModule,
    NetworkErrorRoutingModule
  ]
})
export class NetworkErrorModule { }
