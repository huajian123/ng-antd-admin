import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'personal-center', pathMatch: 'full' },
  { path: 'personal-center', title: '个人中心', data: { key: 'personal-center' }, loadComponent: () => import('./personal-center/personal-center.component').then(m => m.PersonalCenterComponent) },
  { path: 'personal-setting', title: '个人设置', data: { key: 'personal-setting' }, loadComponent: () => import('./personal-setting/personal-setting.component').then(m => m.PersonalSettingComponent) }
] satisfies Route[];
