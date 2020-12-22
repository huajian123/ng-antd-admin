import { NgModule } from '@angular/core';
import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor.component';
import {ShareModule} from '../../../share/share.module';


@NgModule({
  declarations: [MonitorComponent],
  imports: [
    ShareModule,
    MonitorRoutingModule
  ]
})
export class MonitorModule { }
