import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'personal-center', pathMatch: 'full' },
  { path: 'personal-center', loadChildren: () => import('./personal-center/personal-center.module').then(m => m.PersonalCenterModule) },
  { path: 'personal-setting', loadChildren: () => import('./personal-setting/personal-setting.module').then(m => m.PersonalSettingModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule {}
