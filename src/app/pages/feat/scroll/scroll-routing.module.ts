import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'keep-scroll-page', loadChildren: () => import('./keep-scroll-page/keep-scroll-page.module').then(m => m.KeepScrollPageModule) },
  { path: 'play-scroll', loadChildren: () => import('./play-scroll/play-scroll.module').then(m => m.PlayScrollModule) },
  { path: '', redirectTo: 'keep-scroll-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrollRoutingModule {}
