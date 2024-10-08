import { Route } from '@angular/router';

import { JudgeAuthGuard } from '@core/services/common/guard/judgeAuth.guard';
import { JudgeLoginGuard } from '@core/services/common/guard/judgeLogin.guard';

import { DefaultComponent } from './default.component';

export default [
  {
    path: '',
    component: DefaultComponent,
    data: { shouldDetach: 'no', preload: true },
    canActivateChild: [JudgeLoginGuard, JudgeAuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        data: { preload: true },
        loadChildren: () => import('../../pages/dashboard/dashboard-routing')
      },
      {
        path: 'page-demo',
        loadChildren: () => import('../../pages/page-demo/page-demo-routing')
      },
      {
        path: 'feat',
        loadChildren: () => import('../../pages/feat/feat-routing.module')
      },
      {
        path: 'comp',
        loadChildren: () => import('../../pages/comp/comp-routing')
      },
      {
        path: 'level',
        loadChildren: () => import('../../pages/level/level-routing')
      },
      {
        path: 'about',
        title: '关于',
        data: { key: 'about' },
        loadComponent: () => import('../../pages/about/about.component').then(m => m.AboutComponent)
      },
      {
        path: 'system',
        loadChildren: () => import('../../pages/system/system-routing')
      }
    ]
  }
] satisfies Route[];
