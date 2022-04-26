import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TransitionComponent} from "@app/pages/comp/transition/transition.component";

const routes: Routes = [
  {path: '', component: TransitionComponent, data: {title: '动画组件', key: 'transition'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransitionRoutingModule { }
