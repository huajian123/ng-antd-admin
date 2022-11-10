import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'new', loadChildren: () => import('./new/new.module').then(m => m.NewModule)},
  { path: 'quanlychuyen', loadChildren: () => import('./quanly/quanly.module').then(m => m.QuanlyModule)},
  { path: '', redirectTo: 'new', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChuyenRoutingModule { }
