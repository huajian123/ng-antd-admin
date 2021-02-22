import {NgModule} from '@angular/core';
import {MonitorRoutingModule} from './monitor-routing.module';
import {MonitorComponent} from './monitor.component';
import {SharedModule} from '../../../share/shared.module';


@NgModule({
  declarations: [MonitorComponent],
  imports: [
    SharedModule,
    MonitorRoutingModule
  ]
})
export class MonitorModule {
}
