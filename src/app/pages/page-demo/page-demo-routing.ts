import { Route } from '@angular/router';

export default [
  {
    path: 'form',
    loadChildren: () => import('./form/form-routing')
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail-routing')
  },

  {
    path: 'personal',
    loadChildren: () => import('./personal/personal.module').then(m => m.PersonalModule)
  },
  {
    path: 'except',
    loadChildren: () => import('./except/except-routing')
  },
  {
    path: 'result',
    loadChildren: () => import('./result/result-routing')
  },
  {
    path: 'flow',
    data: { title: '流程图', key: 'flow-chat' },
    loadComponent: () => import('./flow/flow-chat/flow-chat.component').then(m => m.FlowChatComponent)
  }
] as Route[];
