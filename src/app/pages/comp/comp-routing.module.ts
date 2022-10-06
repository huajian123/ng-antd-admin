import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'transition', pathMatch: 'full' },
  { path: 'transition', loadChildren: () => import('./transition/transition.module').then(m => m.TransitionModule) },
  { path: 'basic', loadChildren: () => import('./basic/basic.module').then(m => m.BasicModule) },
  { path: 'lazy', loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule) },
  { path: 'luckysheet', loadChildren: () => import('./luckysheet/luckysheet.module').then(m => m.LuckysheetModule) },
  { path: 'desc', loadChildren: () => import('./desc/desc.module').then(m => m.DescModule) },
  { path: 'strength-meter', loadChildren: () => import('./strength-meter/strength-meter.module').then(m => m.StrengthMeterModule) },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompRoutingModule {}
