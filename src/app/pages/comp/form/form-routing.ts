import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'shrink-form', pathMatch: 'full' },
  { path: 'shrink-form', data: { title: '可伸缩表单', key: 'shrink-form' }, loadComponent: () => import('./shrink-form/shrink-form.component').then(m => m.ShrinkFormComponent) },
  { path: 'append-form', data: { title: '可增删表单', key: 'append-form' }, loadComponent: () => import('./append-form/append-form.component').then(m => m.AppendFormComponent) }
] as Route[];
