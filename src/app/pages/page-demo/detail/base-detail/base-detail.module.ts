import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { BaseDetailRoutingModule } from './base-detail-routing.module';
import { BaseDetailComponent } from './base-detail.component';

@NgModule({
    imports: [SharedModule, BaseDetailRoutingModule, BaseDetailComponent]
})
export class BaseDetailModule {}
