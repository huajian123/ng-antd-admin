import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'menu1', pathMatch: 'full' },
  { path: 'menu1', loadChildren: () => import('./menu1/menu1-routing') },
  { path: 'menu2', title: 'Menu2', data: { key: 'menu2' }, loadComponent: () => import('./menu2/menu2.component').then(m => m.Menu2Component) }
] satisfies Route[];
