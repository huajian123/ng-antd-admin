import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'menu1-1-1', loadComponent: () => import('./menu1-1-1/menu1-1-1.module').then(m => m.Menu111Module) },
  { path: 'menu1-1-2', loadChildren: () => import('./menu1-1-2/menu1-1-2.module').then(m => m.Menu112Module) },
  { path: '', redirectTo: 'menu1-1-1', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Menu11RoutingModule {}
