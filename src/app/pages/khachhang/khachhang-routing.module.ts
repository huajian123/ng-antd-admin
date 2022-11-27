import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'spkh00101', loadChildren: () => import('./spkh00101/spkh00101.module').then(m => m.Spkh00101Module)},
  { path: 'spkh00201', loadChildren: () => import('./spkh00201/spkh00201.module').then(m => m.Spkh00201Module)},
  { path: '', redirectTo: 'spkh00101', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KhachhangRoutingModule { }
