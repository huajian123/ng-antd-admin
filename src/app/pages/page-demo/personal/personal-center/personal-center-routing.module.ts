import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalCenterComponent } from './personal-center.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalCenterComponent,
    data: { title: '个人中心', key: 'personal-center' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalCenterRoutingModule {}
