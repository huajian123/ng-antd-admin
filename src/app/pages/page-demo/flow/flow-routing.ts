import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'flow-chat', pathMatch: 'full' },
  { path: 'flow-chat', title: '流程图', data: { key: 'flow-chat' }, loadComponent: () => import('./flow-chat/flow-chat.component').then(m => m.FlowChatComponent) }
] satisfies Route[];
