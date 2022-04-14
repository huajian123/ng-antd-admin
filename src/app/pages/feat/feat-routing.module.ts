import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'ex-modal', loadChildren: () => import('./ex-modal/ex-modal.module').then(m => m.ExModalModule)},
  {path: 'ex-drawer', loadChildren: () => import('./ex-drawer/ex-drawer.module').then(m => m.ExDrawerModule)},
  {path: 'rich-text', loadChildren: () => import('./rich-text/rich-text.module').then(m => m.RichTextModule)},
  {path: 'click-out-side', loadChildren: () => import('./click-out-side/click-out-side.module').then(m => m.ClickOutSideModule)},
  {path: 'color-sel', loadChildren: () => import('./color-sel/color-sel.module').then(m => m.ColorSelModule)},
  {path: 'keep-scroll-page', loadChildren: () => import('./keep-scroll-page/keep-scroll-page.module').then(m => m.KeepScrollPageModule)},
  {path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule)},
  {path: 'map', loadChildren: () => import('./map/map.module').then(m => m.MapModule)},
  {path: 'ripple', loadChildren: () => import('./ripple/ripple.module').then(m => m.RippleModule)},
  {path: 'copy', loadChildren: () => import('./copy/copy.module').then(m => m.CopyModule)},
  {path: '', redirectTo: 'ex-modal', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatRoutingModule {
}
