import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DeptComponent} from "@app/pages/system/dept/dept.component";
import {MenuComponent} from "@app/pages/system/menu/menu.component";

const routes: Routes = [
  {
    path: '', component: MenuComponent, data: {title: '菜单管理', key: 'menu'},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
