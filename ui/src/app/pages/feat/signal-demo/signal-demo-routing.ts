import { Route } from '@angular/router';

export default [
  {
    path: 'basic-advanced',
    title: 'menu.default:feat:signal-demo:basic-advanced',
    data: { key: 'basic-advanced' },
    loadComponent: () => import('./basic-advanced/basic-advanced').then(m => m.BasicAdvanced)
  },
  {
    path: 'linked-signal-demo',
    title: 'menu.default:feat:signal-demo:linked-signal-demo',
    data: { key: 'linked-signal-demo' },
    loadComponent: () => import('./linked-signal-demo/linked-signal-demo').then(m => m.LinkedSignalDemo)
  },
  {
    path: 'performance-optimization',
    title: 'menu.default:feat:signal-demo:performance-optimization',
    data: { key: 'performance-optimization' },
    loadComponent: () => import('./performance-optimization/performance-optimization').then(m => m.PerformanceOptimization)
  },
  {
    path: 'resource',
    title: 'menu.default:feat:signal-demo:resource',
    data: { key: 'resource' },
    loadComponent: () => import('./resource/resource').then(m => m.Resource)
  },
  {
    path: 'cross-comp-communication',
    title: 'menu.default:feat:signal-demo:cross-comp-communication',
    data: { key: 'cross-comp-communication' },
    loadComponent: () => import('./cross-comp-communication/cross-comp-communication').then(m => m.CrossCompCommunication)
  },
  {
    path: 'change-to-observable',
    title: 'menu.default:feat:signal-demo:change-to-observable',
    data: { key: 'change-to-observable' },
    loadComponent: () => import('./change-to-observable/change-to-observable').then(m => m.ChangeToObservable)
  },
  {
    path: 'signal-reactive-forms',
    title: 'menu.default:feat:signal-demo:signal-reactive-forms',
    data: { key: 'signal-reactive-forms' },
    loadComponent: () => import('./signal-reactive-forms/signal-reactive-forms').then(m => m.SignalReactiveForms)
  },
  {
    path: 'signal-comprehensive-practical',
    title: 'menu.default:feat:signal-demo:signal-comprehensive-practical',
    data: { key: 'signal-comprehensive-practical' },
    loadComponent: () => import('./signal-comprehensive-practical/signal-comprehensive-practical').then(m => m.SignalComprehensivePractical)
  },
  { path: '', redirectTo: 'basic-advanced', pathMatch: 'full' }
] satisfies Route[];

