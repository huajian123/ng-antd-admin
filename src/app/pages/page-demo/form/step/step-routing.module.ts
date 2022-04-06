import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StepComponent} from './step.component';

const routes: Routes = [
  {path: '', component: StepComponent, data: {title: '分步表单', key: 'step-form'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepRoutingModule {
}
