import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { NoDataRoutingModule } from './no-data-routing.module';
import { NoDataComponent } from './no-data.component';

@NgModule({
  declarations: [NoDataComponent],
  imports: [SharedModule, NoDataRoutingModule]
})
export class NoDataModule {}
