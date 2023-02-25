import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'base-form', pathMatch: 'full' },
  { path: 'base-form', data: { title: '基础表单', key: 'base-form' }, loadComponent: () => import('./base/base.component').then(m => m.BaseComponent) },
  { path: 'step-form', data: { title: '分步表单', key: 'step-form' }, loadComponent: () => import('./step/step.component').then(m => m.StepComponent) },
  { path: 'advanced-form', data: { title: '高级表单', key: 'advanced-form' }, loadComponent: () => import('./advanced/advanced.component').then(m => m.AdvancedComponent) }
] as Route[];
