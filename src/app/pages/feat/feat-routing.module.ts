import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'ex-modal', loadChildren: () => import('./ex-modal/ex-modal.module').then(m => m.ExModalModule)},
  {path: 'rich-text', loadChildren: () => import('./rich-text/rich-text.module').then(m => m.RichTextModule)},
  {path: 'click-out-side', loadChildren: () => import('./click-out-side/click-out-side.module').then(m => m.ClickOutSideModule)},
  {path: 'color-sel', loadChildren: () => import('./color-sel/color-sel.module').then(m => m.ColorSelModule)},
  {path: 'keep-scroll-page', loadChildren: () => import('./keep-scroll-page/keep-scroll-page.module').then(m => m.KeepScrollPageModule)},
  {path: 'map', loadChildren: () => import('./map/map.module').then(m => m.MapModule)},
  {path: '', redirectTo: 'ex-modal', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatRoutingModule {
}
