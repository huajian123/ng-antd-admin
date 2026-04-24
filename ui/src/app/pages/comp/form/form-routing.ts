import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'shrink-form', pathMatch: 'full' },
  { path: 'shrink-form', title: 'menu.default:comp:form:shrink-form', data: { key: 'shrink-form' }, loadComponent: () => import('./shrink-form/shrink-form.component').then(m => m.ShrinkFormComponent) },
  { path: 'append-form', title: 'menu.default:comp:form:append-form', data: { key: 'append-form' }, loadComponent: () => import('./append-form/append-form.component').then(m => m.AppendFormComponent) }
] satisfies Route[];
