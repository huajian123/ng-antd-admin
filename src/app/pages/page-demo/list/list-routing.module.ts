import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'search-table', pathMatch: 'full' },
  { path: 'search-table', loadChildren: () => import('./search-table/search-table.module').then(m => m.SearchTableModule) },
  { path: 'standard-table', loadChildren: () => import('./standard-table/standard-table.module').then(m => m.StandardTableModule) },
  { path: 'tree-list', loadChildren: () => import('./tree-list/tree-list.module').then(m => m.TreeListModule) },
  { path: 'card-table', loadChildren: () => import('./card-table/card-table.module').then(m => m.CardTableModule) },
  { path: 'search-list', loadChildren: () => import('./search-list/search-list.module').then(m => m.SearchListModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule {}
