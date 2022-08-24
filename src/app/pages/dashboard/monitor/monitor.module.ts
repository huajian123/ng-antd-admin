import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor.component';

@NgModule({
  declarations: [MonitorComponent],
  imports: [SharedModule, MonitorRoutingModule]
})
export class MonitorModule {}
