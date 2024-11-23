import { Route } from '@angular/router';

import { EmptyForLockComponent } from '@shared/components/empty-for-lock/empty-for-lock.component';

import { BlankComponent } from './blank.component';

export default [
  {
    path: '',
    component: BlankComponent,
    data: { key: 'blank', shouldDetach: 'no' },
    children: [
      {
        path: 'empty-page',
        title: '空页面',
        data: { key: 'empty-page', shouldDetach: 'no' },
        loadComponent: () => import('../../pages/empty/empty.component').then(m => m.EmptyComponent)
      },
      {
        title: '锁屏',
        canDeactivate: [(component: EmptyForLockComponent) => !component.routeStatus.locked],
        data: { key: 'empty-for-lock', shouldDetach: 'no' },
        path: 'empty-for-lock',
        loadComponent: () => import('../../shared/components/empty-for-lock/empty-for-lock.component').then(m => m.EmptyForLockComponent)
      },
      {
        path: 'global-loading',
        title: 'loading',
        data: { key: 'global-loading', shouldDetach: 'no' },
        loadComponent: () => import('../../shared/components/global-loading/global-loading.component').then(m => m.GlobalLoadingComponent)
      },
      {
        path: 'other-login',
        loadChildren: () => import('../../pages/other-login/other-login-routing')
      }
    ]
  }
] satisfies Route[];
