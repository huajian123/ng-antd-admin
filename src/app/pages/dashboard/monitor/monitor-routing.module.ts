import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitorComponent } from './monitor.component';

const routes: Routes = [{ path: '', component: MonitorComponent, data: { title: '监控页', key: 'monitor' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule {}
