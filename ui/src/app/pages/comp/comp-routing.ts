import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'transition', pathMatch: 'full' },
  { path: 'transition', title: 'menu.default:comp:transition', data: { key: 'transition' }, loadComponent: () => import('./transition/transition.component').then(m => m.TransitionComponent) },
  { path: 'basic', title: 'menu.default:comp:basic', data: { key: 'basic' }, loadComponent: () => import('./basic/basic.component').then(m => m.BasicComponent) },
  { path: 'lazy', loadChildren: () => import('./lazy/lazy-routing') },
  { path: 'luckysheet', title: 'menu.default:comp:luckysheet', data: { key: 'luckysheet' }, loadComponent: () => import('./luckysheet/luckysheet.component').then(m => m.LuckysheetComponent) },
  { path: 'desc', title: 'menu.default:comp:desc', data: { key: 'desc' }, loadComponent: () => import('./desc/desc.component').then(m => m.DescComponent) },
  { path: 'strength-meter', title: 'menu.default:comp:strength-meter', data: { key: 'strength-meter' }, loadComponent: () => import('./strength-meter/strength-meter.component').then(m => m.StrengthMeterComponent) },
  { path: 'form', loadChildren: () => import('./form/form-routing') },
  {
    path: 'blingbling',
    title: 'menu.default:comp:blingbling',
    data: { key: 'blingbling' },
    loadComponent: () => import('../../pages/comp/blingbling/blingbling.component').then(m => m.BlingblingComponent)
  }
] satisfies Route[];
