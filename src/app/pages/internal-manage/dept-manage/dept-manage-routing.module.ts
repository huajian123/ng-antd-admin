import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DeptManageComponent} from './dept-manage.component';

const routes: Routes = [
  {path: '', component: DeptManageComponent, data: {title: '部门管理', key: 'dept-manage'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeptManageRoutingModule { }
