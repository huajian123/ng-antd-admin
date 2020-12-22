import { NgModule } from '@angular/core';
import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor.component';
import {SharedModule} from '../../../share/shared.module';
import {ComponentsModule} from '../../../share/components/components.module';


@NgModule({
  declarations: [MonitorComponent],
  imports: [
    SharedModule,
    ComponentsModule,
    MonitorRoutingModule
  ]
})
export class MonitorModule { }
