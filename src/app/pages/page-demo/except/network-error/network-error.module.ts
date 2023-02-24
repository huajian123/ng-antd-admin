import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { NetworkErrorRoutingModule } from './network-error-routing.module';
import { NetworkErrorComponent } from './network-error.component';

@NgModule({
    imports: [SharedModule, NetworkErrorRoutingModule, NetworkErrorComponent]
})
export class NetworkErrorModule {}
