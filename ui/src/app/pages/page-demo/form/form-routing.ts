import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'base-form', pathMatch: 'full' },
  { path: 'base-form', title: 'menu.default:page-demo:form:base-form', data: { key: 'base-form' }, loadComponent: () => import('./base/base.component').then(m => m.BaseComponent) },
  { path: 'step-form', title: 'menu.default:page-demo:form:step-form', data: { key: 'step-form' }, loadComponent: () => import('./step/step.component').then(m => m.StepComponent) },
  { path: 'advanced-form', title: 'menu.default:page-demo:form:advanced-form', data: { key: 'advanced-form' }, loadComponent: () => import('./advanced/advanced.component').then(m => m.AdvancedComponent) }
] satisfies Route[];
