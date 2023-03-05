import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'transition', pathMatch: 'full' },
  { path: 'transition', data: { title: '动画组件', key: 'transition' }, loadComponent: () => import('./transition/transition.component').then(m => m.TransitionComponent) },
  { path: 'basic', data: { title: '基础组件', key: 'basic' }, loadComponent: () => import('./basic/basic.component').then(m => m.BasicComponent) },
  { path: 'lazy', loadChildren: () => import('./lazy/lazy-routing') },
  { path: 'luckysheet', data: { title: '在线excel', key: 'luckysheet' }, loadComponent: () => import('./luckysheet/luckysheet.component').then(m => m.LuckysheetComponent) },
  { path: 'desc', data: { title: '详情组件', key: 'desc' }, loadComponent: () => import('./desc/desc.component').then(m => m.DescComponent) },
  { path: 'strength-meter', data: { title: '密码强度组件', key: 'strength-meter' }, loadComponent: () => import('./strength-meter/strength-meter.component').then(m => m.StrengthMeterComponent) },
  { path: 'form', loadChildren: () => import('./form/form-routing') }
] as Route[];
