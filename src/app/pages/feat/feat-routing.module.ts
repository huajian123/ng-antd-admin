import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'ex-modal', loadChildren: () => import('./ex-modal/ex-modal.module').then(m => m.ExModalModule)},
  {path: 'flow', loadChildren: () => import('./flow/flow.module').then(m => m.FlowModule)},
  {path: 'rich-text', loadChildren: () => import('./rich-text/rich-text.module').then(m => m.RichTextModule)},
  {path: 'click-out-side', loadChildren: () => import('./click-out-side/click-out-side.module').then(m => m.ClickOutSideModule)},
  {path: 'map', loadChildren: () => import('./map/map.module').then(m => m.MapModule)},
  {path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule)},
  {path: '', redirectTo: 'ex-modal', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatRoutingModule {
}
