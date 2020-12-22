import { NgModule } from '@angular/core';
import { WorkbenchRoutingModule } from './workbench-routing.module';
import { WorkbenchComponent } from './workbench.component';
import {ShareModule} from '../../../share/share.module';


@NgModule({
  declarations: [WorkbenchComponent],
  imports: [
    ShareModule,
    WorkbenchRoutingModule
  ]
})
export class WorkbenchModule { }
