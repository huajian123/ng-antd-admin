import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TransitionComponent} from "@app/pages/comp/transition/transition.component";
import {BasicComponent} from "@app/pages/comp/basic/basic.component";

const routes: Routes = [
  {path: '', component: BasicComponent, data: {title: '基础组件', key: 'basic'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule { }
