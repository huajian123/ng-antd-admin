import { Route } from '@angular/router';

export default [
  { path: 'menu1-1-1', data: { title: 'Menu1-1-1', key: 'menu1-1-1' }, loadComponent: () => import('./menu1-1-1/menu111.component').then(m => m.Menu111Component) },
  { path: 'menu1-1-2', data: { title: 'Menu1-1-2', key: 'menu1-1-2' }, loadComponent: () => import('./menu1-1-2/menu112.component').then(m => m.Menu112Component) },
  { path: '', redirectTo: 'menu1-1-1', pathMatch: 'full' }
] as Route[];
