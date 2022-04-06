import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdvancedComponent} from './advanced.component';

const routes: Routes = [
  {path: '', component: AdvancedComponent, data: {title: '高级表单', key: 'advanced-form'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancedRoutingModule {
}
