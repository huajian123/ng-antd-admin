import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'except403', pathMatch: 'full' },
  { path: 'except403', loadChildren: () => import('./except403/except403.module').then(m => m.Except403Module) },
  { path: 'except404', loadChildren: () => import('./except404/except404.module').then(m => m.Except404Module) },
  { path: 'except500', loadChildren: () => import('./except500/except500.module').then(m => m.Except500Module) },
  { path: 'network-error', loadChildren: () => import('./network-error/network-error.module').then(m => m.NetworkErrorModule) },
  { path: 'no-data', loadChildren: () => import('./no-data/no-data.module').then(m => m.NoDataModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptRoutingModule {}
