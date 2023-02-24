import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { SetupRoutingModule } from './setup-routing.module';
import { SetupComponent } from './setup.component';

@NgModule({
    imports: [SharedModule, SetupRoutingModule, SetupComponent]
})
export class SetupModule {}
