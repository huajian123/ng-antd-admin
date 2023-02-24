import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base.component';

@NgModule({
    imports: [SharedModule, BaseRoutingModule, BaseComponent]
})
export class BaseModule {}
