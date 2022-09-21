import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StepComponent } from './step.component';

const routes: Routes = [{ path: '', component: StepComponent, data: { title: 'biểu mẫu từng bước', key: 'step-form' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepRoutingModule {}
