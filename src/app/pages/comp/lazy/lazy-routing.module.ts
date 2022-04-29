import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'lazy-basic', loadChildren: () => import('./lazy-basic/lazy-basic.module').then(m => m.LazyBasicModule)},
  {path: '', redirectTo: 'lazy-basic', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyRoutingModule { }
