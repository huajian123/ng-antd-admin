import { Route } from '@angular/router';

import { ActionCode } from '@config/actionCode';

export default [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'tabs', data: { title: '标签页操作', key: 'tabs' }, loadComponent: () => import('./tabs.component').then(m => m.TabsComponent) },
  {
    path: 'example-detail',
    data: { newTab: 'true', authCode: ActionCode.TabsDetail, title: '演示详情', key: 'example-detail' },
    loadComponent: () => import('./detail/detail.component').then(m => m.DetailComponent)
  }
] as Route[];
