import { Route } from '@angular/router';

export default [
  {
    path: '',
    title: 'View Transitions',
    data: {
      key: 'transitions',
      shouldDetach: 'no' // 禁用路由复用
    },
    loadComponent: () => import('./transitions').then(m => m.Transitions)
  },
  {
    path: 'transitions-detail',
    title: 'View Transitions',
    data: {
      key: 'transitions-detail',
      shouldDetach: 'no' // 禁用路由复用
    },
    loadComponent: () => import('./transitions-detail').then(m => m.TransitionsDetail)
  }
] satisfies Route[];
