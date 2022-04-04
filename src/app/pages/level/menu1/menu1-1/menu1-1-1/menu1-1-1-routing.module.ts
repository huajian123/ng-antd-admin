import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Menu111Component} from "@app/pages/level/menu1/menu1-1/menu1-1-1/menu111.component";

const routes: Routes = [
  { path: '', component: Menu111Component, data: {title: 'Menu1-1-1', key: 'menu1-1-1'},}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Menu111RoutingModule { }
