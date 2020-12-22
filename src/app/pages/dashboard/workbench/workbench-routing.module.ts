import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WorkbenchComponent} from './workbench.component';

const routes: Routes = [
  {path: '', component: WorkbenchComponent, data: {title: '工作台', key: 'workbench'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkbenchRoutingModule {
}
