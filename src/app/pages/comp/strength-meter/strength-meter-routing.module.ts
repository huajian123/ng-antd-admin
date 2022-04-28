import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TransitionComponent} from "@app/pages/comp/transition/transition.component";
import {BasicComponent} from "@app/pages/comp/basic/basic.component";
import {DescComponent} from "@app/pages/comp/desc/desc.component";
import {StrengthMeterComponent} from "@app/pages/comp/strength-meter/strength-meter.component";

const routes: Routes = [
  {path: '', component: StrengthMeterComponent, data: {title: '密码强度组件', key: 'strength-meter'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class strengthMeterRoutingModule { }
