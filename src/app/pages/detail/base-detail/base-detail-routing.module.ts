import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BaseDetailComponent} from './base-detail.component';

const routes: Routes = [
  {path: '', component: BaseDetailComponent, data: {title: '基础详情页', key: 'base-detail'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseDetailRoutingModule { }
