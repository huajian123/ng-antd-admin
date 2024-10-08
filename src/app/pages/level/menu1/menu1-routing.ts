import { Route } from '@angular/router';

export default [
  { path: 'menu1-1', loadChildren: () => import('./menu1-1/menu1-1-routing') },
  { path: 'menu1-2', title: 'Menu1-2', data: { key: 'menu1-2' }, loadComponent: () => import('./menu1-2/menu1-2.component').then(m => m.Menu12Component) },
  { path: '', redirectTo: 'menu1-2', pathMatch: 'full' }
] satisfies Route[];
