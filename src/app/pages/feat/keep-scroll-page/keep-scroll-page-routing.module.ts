import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {KeepScrollPageComponent} from "@app/pages/feat/keep-scroll-page/keep-scroll-page.component";

const routes: Routes = [
  {path: '', component: KeepScrollPageComponent, data: {title: '缓存滚动条', key: 'keep-scroll-page',scrollContain:['#div-scroll1','#div-scroll2']}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeepScrollPageRoutingModule { }
