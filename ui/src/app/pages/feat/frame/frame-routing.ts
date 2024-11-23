import { Route } from '@angular/router';

export default [
  { path: 'zorro-doc', title: 'zorro文档', data: { key: 'zorro-doc' }, loadComponent: () => import('./zorro-doc/zorro-doc.component').then(m => m.ZorroDocComponent) },
  { path: '', redirectTo: 'zorro-doc', pathMatch: 'full' }
] satisfies Route[];
