import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Menu112Component} from "@app/pages/level/menu1/menu1-1/menu1-1-2/menu112.component";

const routes: Routes = [
  { path: '', component: Menu112Component, data: {title: 'Menu1-1-2', key: 'menu1-1-2'},}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Menu112RoutingModule { }
