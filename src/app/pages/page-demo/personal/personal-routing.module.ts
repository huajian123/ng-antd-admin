import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'personal-center', pathMatch: 'full' },
  { path: 'personal-center', data: { title: '个人中心', key: 'personal-center' }, loadComponent: () => import('./personal-center/personal-center.component').then(m => m.PersonalCenterComponent) },
  { path: 'personal-setting', data: { title: '个人设置', key: 'personal-setting' }, loadComponent: () => import('./personal-setting/personal-setting.component').then(m => m.PersonalSettingComponent) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule {}
