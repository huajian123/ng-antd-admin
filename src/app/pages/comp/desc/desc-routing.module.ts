import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DescComponent} from "@app/pages/comp/desc/desc.component";

const routes: Routes = [
  {path: '', component: DescComponent, data: {title: '详情组件', key: 'desc'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DescRoutingModule {
}
