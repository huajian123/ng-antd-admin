import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'newkh', loadChildren: () => import('./newkh/newkh.module').then(m => m.NewkhModule)},
  { path: '', redirectTo: 'newkh', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KhachhangRoutingModule { }
