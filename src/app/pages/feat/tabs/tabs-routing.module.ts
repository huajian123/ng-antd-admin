import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TabsComponent} from "@app/pages/feat/tabs/tabs.component";

const routes: Routes = [
  {path: '', component: TabsComponent, data: {title: '标签页操作', key: 'tabs'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
