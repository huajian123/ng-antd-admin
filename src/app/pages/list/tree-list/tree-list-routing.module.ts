import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TreeListComponent} from "@app/pages/list/tree-list/tree-list.component";

const routes: Routes = [
  {path: '', component: TreeListComponent, data: {title: '树状表格', key: 'tree-table'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreeListRoutingModule { }
