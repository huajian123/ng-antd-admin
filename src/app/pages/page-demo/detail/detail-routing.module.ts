import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'base-detail', pathMatch: 'full' },
  { path: 'base-detail', loadChildren: () => import('./base-detail/base-detail.module').then(m => m.BaseDetailModule) },
  { path: 'adv-detail', loadChildren: () => import('./adv-detail/adv-detail.module').then(m => m.AdvDetailModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailRoutingModule {}
