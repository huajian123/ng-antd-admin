import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LuckysheetComponent} from "@app/pages/comp/luckysheet/luckysheet.component";

const routes: Routes = [
  {path: '', component: LuckysheetComponent, data: {title: '在线excel', key: 'luckysheet'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LuckysheetRoutingModule { }
