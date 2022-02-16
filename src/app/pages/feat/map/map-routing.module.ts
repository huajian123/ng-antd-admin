import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'gaode', loadChildren: () => import('./gaode/gaode.module').then(m => m.GaodeModule)},
  {path: '', redirectTo: 'gaode', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule {
}
