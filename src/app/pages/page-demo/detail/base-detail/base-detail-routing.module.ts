import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseDetailComponent } from './base-detail.component';

const routes: Routes = [{ path: '', component: BaseDetailComponent, data: { title: 'Trang chi tiết cơ bản', key: 'base-detail' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseDetailRoutingModule {}
