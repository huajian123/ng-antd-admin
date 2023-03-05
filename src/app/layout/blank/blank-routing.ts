import { Route } from '@angular/router';

import { LockLeaveGuard } from '@core/services/common/guard/lock-leave.guard';

import { BlankComponent } from './blank.component';

export default [
  {
    path: '',
    component: BlankComponent,
    data: { key: 'blank', shouldDetach: 'no' },
    children: [
      {
        path: 'empty-page',
        data: { title: '空页面', key: 'empty-page', shouldDetach: 'no' },
        loadComponent: () => import('../../pages/empty/empty.component').then(m => m.EmptyComponent)
      },
      {
        canDeactivate: [LockLeaveGuard],
        data: { title: '空页面', key: 'empty-for-lock', shouldDetach: 'no' },
        path: 'empty-for-lock',
        loadComponent: () => import('../../shared/components/empty-for-lock/empty-for-lock.component').then(m => m.EmptyForLockComponent)
      },
      {
        path: 'other-login',
        loadChildren: () => import('../../pages/other-login/other-login-routing')
      }
    ]
  }
] as Route[];
