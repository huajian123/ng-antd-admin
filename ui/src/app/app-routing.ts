import { Route } from '@angular/router';

export const appRoutes = [
  { path: '', redirectTo: '/login/login-form', pathMatch: 'full' },
  { path: 'blank', loadChildren: () => import('./layout/blank/blank-routing') },
  { path: 'login', data: { preload: true }, loadChildren: () => import('./pages/login/login-routing') },
  { path: 'default', data: { preload: true }, loadChildren: () => import('./layout/default/default-routing') },
  { path: '**', redirectTo: '/login/login-form' }
] satisfies Route[];
