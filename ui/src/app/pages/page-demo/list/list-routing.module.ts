import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'search-table', pathMatch: 'full' },
  { path: 'search-table', loadChildren: () => import('./search-table/search-table-routing') },
  {
    path: 'standard-table',
    title: 'menu.default:page-demo:list:standard-table',
    data: { key: 'standard-table' },
    loadComponent: () => import('./standard-table/standard-table.component').then(m => m.StandardTableComponent)
  },
  { path: 'tree-list', title: 'menu.default:page-demo:list:tree-list', data: { key: 'tree-list' }, loadComponent: () => import('./tree-list/tree-list.component').then(m => m.TreeListComponent) },
  { path: 'card-table', title: 'menu.default:page-demo:list:card-table', data: { key: 'card-table' }, loadComponent: () => import('./card-table/card-table.component').then(m => m.CardTableComponent) },
  { path: 'search-list', loadChildren: () => import('./search-list/search-list-routing') }
] satisfies Route[];
