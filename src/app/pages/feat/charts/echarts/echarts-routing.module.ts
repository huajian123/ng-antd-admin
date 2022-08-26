import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EchartsComponent } from '@app/pages/feat/charts/echarts/echarts.component';

const routes: Routes = [{ path: '', component: EchartsComponent, data: { title: 'Echarts', key: 'echarts' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EchartsRoutingModule {}
