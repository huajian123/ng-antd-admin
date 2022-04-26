import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TreeListComponent} from "@app/pages/page-demo/list/tree-list/tree-list.component";

const routes: Routes = [
  {path: '', component: TreeListComponent, data: {title: '树状表格', key: 'tree-list'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreeListRoutingModule { }
