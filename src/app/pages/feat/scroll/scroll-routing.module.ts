import { Route } from '@angular/router';

export default [
  {
    path: 'keep-scroll-page',
    title: '缓存滚动条',
    data: { key: 'keep-scroll-page', scrollContain: ['#div-scroll1', '#div-scroll2'] },
    loadComponent: () => import('./keep-scroll-page/keep-scroll-page.component').then(m => m.KeepScrollPageComponent)
  },
  { path: 'play-scroll', title: '玩弄滚动条', data: { key: 'play-scroll' }, loadComponent: () => import('./play-scroll/play-scroll.component').then(m => m.PlayScrollComponent) },
  { path: '', redirectTo: 'keep-scroll-page', pathMatch: 'full' }
] satisfies Route[];
