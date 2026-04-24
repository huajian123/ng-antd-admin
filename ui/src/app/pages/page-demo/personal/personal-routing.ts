import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'personal-center', pathMatch: 'full' },
  { path: 'personal-center', title: 'menu.default:page-demo:personal:personal-center', data: { key: 'personal-center' }, loadComponent: () => import('./personal-center/personal-center.component').then(m => m.PersonalCenterComponent) },
  {
    path: 'personal-setting',
    title: 'menu.default:page-demo:personal:personal-setting',
    data: { key: 'personal-setting' },
    loadComponent: () => import('./personal-setting/personal-setting.component').then(m => m.PersonalSettingComponent)
  }
] satisfies Route[];
