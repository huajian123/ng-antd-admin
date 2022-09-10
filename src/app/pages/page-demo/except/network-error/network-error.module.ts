import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { NetworkErrorRoutingModule } from './network-error-routing.module';
import { NetworkErrorComponent } from './network-error.component';

@NgModule({
  declarations: [NetworkErrorComponent],
  imports: [SharedModule, NetworkErrorRoutingModule]
})
export class NetworkErrorModule {}
