import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then(m => m.FormModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule)
  },

  {
    path: 'personal',
    loadChildren: () => import('./personal/personal.module').then(m => m.PersonalModule)
  },
  {
    path: 'except',
    loadChildren: () => import('./except/except.module').then(m => m.ExceptModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./result/result.module').then(m => m.ResultModule)
  },
  {
    path: 'flow',
    loadChildren: () => import('./flow/flow.module').then(m => m.FlowModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageDemoRoutingModule {}
