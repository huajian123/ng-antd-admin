import { NgModule } from '@angular/core';
import { WorkbenchRoutingModule } from './workbench-routing.module';
import { WorkbenchComponent } from './workbench.component';
import {SharedModule} from '../../../share/shared.module';


@NgModule({
  declarations: [WorkbenchComponent],
    imports: [
        SharedModule,
        WorkbenchRoutingModule,
    ]
})
export class WorkbenchModule { }
