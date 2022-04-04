import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'menu1-1', loadChildren: () => import('./menu1-1/menu1-1.module').then(m => m.Menu11Module)},
  {path: 'menu1-2', loadChildren: () => import('./menu1-2/menu1-2.module').then(m => m.Menu12Module)},
  {path: '', redirectTo: 'menu1-2', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Menu1RoutingModule { }
