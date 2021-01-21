import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: 'base-form',  loadChildren: () => import('./base/base.module').then(m => m.BaseModule)},
  {path: 'step-form',  loadChildren: () => import('./step/step.module').then(m => m.StepModule)},
  {path: 'advanced-form',  loadChildren: () => import('./advanced/advanced.module').then(m => m.AdvancedModule)},
  {path: '', redirectTo: 'base-form', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule {
}
