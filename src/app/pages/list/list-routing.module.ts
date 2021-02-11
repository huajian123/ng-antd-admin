import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'search-table',  loadChildren: () => import('./search-table/search-table.module').then(m => m.SearchTableModule)},
  {path: '', redirectTo: 'search-table', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
