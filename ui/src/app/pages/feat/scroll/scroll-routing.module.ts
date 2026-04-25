import { Route } from '@angular/router';

export default [
  {
    path: 'keep-scroll-page',
    title: 'menu.default:feat:scroll:keep-scroll-page',
    data: { key: 'keep-scroll-page', scrollContain: ['#div-scroll1', '#div-scroll2'] },
    loadComponent: () => import('./keep-scroll-page/keep-scroll-page.component').then(m => m.KeepScrollPageComponent)
  },
  { path: 'play-scroll', title: 'menu.default:feat:scroll:play-scroll', data: { key: 'play-scroll' }, loadComponent: () => import('./play-scroll/play-scroll.component').then(m => m.PlayScrollComponent) },
  { path: '', redirectTo: 'keep-scroll-page', pathMatch: 'full' }
] satisfies Route[];
