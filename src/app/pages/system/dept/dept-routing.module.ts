import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeptComponent } from '@app/pages/system/dept/dept.component';

const routes: Routes = [
  {
    path: '',
    component: DeptComponent,
    data: { title: '部门管理', key: 'dept' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeptRoutingModule {}
