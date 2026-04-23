import { Route } from '@angular/router';

export default [
  {
    path: 'basic-advanced',
    title: '基础与进阶',
    data: { key: 'basic-advanced' },
    loadComponent: () => import('./basic-advanced/basic-advanced').then(m => m.BasicAdvanced)
  },
  {
    path: 'linked-signal-demo',
    title: 'linkedSignal演示',
    data: { key: 'linked-signal-demo' },
    loadComponent: () => import('./linked-signal-demo/linked-signal-demo').then(m => m.LinkedSignalDemo)
  },
  {
    path: 'performance-optimization',
    title: '性能优化',
    data: { key: 'performance-optimization' },
    loadComponent: () => import('./performance-optimization/performance-optimization').then(m => m.PerformanceOptimization)
  },
  {
    path: 'resource',
    title: 'resource演示',
    data: { key: 'resource' },
    loadComponent: () => import('./resource/resource').then(m => m.Resource)
  },
  {
    path: 'cross-comp-communication',
    title: '跨组件通信',
    data: { key: 'cross-comp-communication' },
    loadComponent: () => import('./cross-comp-communication/cross-comp-communication').then(m => m.CrossCompCommunication)
  },
  {
    path: 'change-to-observable',
    title: '与Observable互转',
    data: { key: 'change-to-observable' },
    loadComponent: () => import('./change-to-observable/change-to-observable').then(m => m.ChangeToObservable)
  },
  {
    path: 'signal-reactive-forms',
    title: 'Signal&Reactive Forms',
    data: { key: 'signal-reactive-forms' },
    loadComponent: () => import('./signal-reactive-forms/signal-reactive-forms').then(m => m.SignalReactiveForms)
  },
  {
    path: 'signal-comprehensive-practical',
    title: '综合实战',
    data: { key: 'signal-comprehensive-practical' },
    loadComponent: () => import('./signal-comprehensive-practical/signal-comprehensive-practical').then(m => m.SignalComprehensivePractical)
  },
  { path: '', redirectTo: 'basic-advanced', pathMatch: 'full' }
] satisfies Route[];

