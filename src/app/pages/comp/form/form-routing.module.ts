import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'shrink-form', loadChildren: () => import('./shrink-form/shrink-form.module').then(m => m.ShrinkFormModule) },
  { path: '', redirectTo: 'shrink-form', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule {}
