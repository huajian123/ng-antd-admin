import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchTableComponent} from "./search-table.component";

const routes: Routes = [
  {path: '', component: SearchTableComponent, data: {title: '查询表格', key: 'search-table'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchTableRoutingModule { }
