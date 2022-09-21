/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitorComponent } from './monitor.component';

const routes: Routes = [{ path: '', component: MonitorComponent, data: { title: 'Trang giám sát', key: 'monitor' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule {}
