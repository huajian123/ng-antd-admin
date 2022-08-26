import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvDetailComponent } from './adv-detail.component';

const routes: Routes = [{ path: '', component: AdvDetailComponent, data: { title: '高级详情页', key: 'adv-detail' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvDetailRoutingModule {}
