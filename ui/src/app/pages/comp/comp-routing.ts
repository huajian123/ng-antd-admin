import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'transition', pathMatch: 'full' },
  { path: 'transition', title: '动画组件', data: { key: 'transition' }, loadComponent: () => import('./transition/transition.component').then(m => m.TransitionComponent) },
  { path: 'basic', title: '基础组件', data: { key: 'basic' }, loadComponent: () => import('./basic/basic.component').then(m => m.BasicComponent) },
  { path: 'lazy', loadChildren: () => import('./lazy/lazy-routing') },
  { path: 'luckysheet', title: '在线excel', data: { key: 'luckysheet' }, loadComponent: () => import('./luckysheet/luckysheet.component').then(m => m.LuckysheetComponent) },
  { path: 'desc', title: '详情组件', data: { key: 'desc' }, loadComponent: () => import('./desc/desc.component').then(m => m.DescComponent) },
  { path: 'strength-meter', title: '密码强度组件', data: { key: 'strength-meter' }, loadComponent: () => import('./strength-meter/strength-meter.component').then(m => m.StrengthMeterComponent) },
  { path: 'form', loadChildren: () => import('./form/form-routing') },
  {
    path: 'blingbling',
    title: 'blingbling',
    data: { key: 'blingbling' },
    loadComponent: () => import('../../pages/comp/blingbling/blingbling.component').then(m => m.BlingblingComponent)
  }
] satisfies Route[];
