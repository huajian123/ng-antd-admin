import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StrengthMeterComponent } from '@app/pages/comp/strength-meter/strength-meter.component';

const routes: Routes = [{ path: '', component: StrengthMeterComponent, title: '密码强度组件', data: { key: 'strength-meter' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrengthMeterRoutingModule {}
