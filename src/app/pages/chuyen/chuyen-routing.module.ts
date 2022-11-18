import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'spch00101', loadChildren: () => import('./spch00101/spch00101.module').then(m => m.Spch00101Module)},
  { path: 'spch00201', loadChildren: () => import('./spch00201/spch00201.module').then(m => m.Spch00201Module)},
  { path: '', redirectTo: 'spch00101', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChuyenRoutingModule { }
