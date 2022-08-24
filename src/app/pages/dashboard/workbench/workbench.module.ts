import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { WorkbenchRoutingModule } from './workbench-routing.module';
import { WorkbenchComponent } from './workbench.component';

@NgModule({
  declarations: [WorkbenchComponent],
  imports: [SharedModule, WorkbenchRoutingModule]
})
export class WorkbenchModule {}
