import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: 'search-table', loadChildren: () => import('./search-table/search-table.module').then(m => m.SearchTableModule)},
  {path: 'standard-table', loadChildren: () => import('./standard-table/standard-table.module').then(m => m.StandardTableModule)},
  {path: 'card-table', loadChildren: () => import('./card-table/card-table.module').then(m => m.CardTableModule)},
  {path: '', redirectTo: 'search-table', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule {
}
