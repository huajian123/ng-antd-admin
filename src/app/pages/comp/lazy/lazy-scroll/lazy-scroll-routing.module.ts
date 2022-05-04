import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LazyScrollComponent} from "@app/pages/comp/lazy/lazy-scroll/lazy-scroll.component";

const routes: Routes = [
  {path: '', component: LazyScrollComponent, data: {title: '滚动懒加载', key: 'lazy-scroll'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyScrollRoutingModule { }
