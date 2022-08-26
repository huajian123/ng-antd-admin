import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { AdvDetailRoutingModule } from './adv-detail-routing.module';
import { AdvDetailComponent } from './adv-detail.component';

@NgModule({
  declarations: [AdvDetailComponent],
  imports: [SharedModule, AdvDetailRoutingModule]
})
export class AdvDetailModule {}
