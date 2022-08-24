import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Menu12Component } from '@app/pages/level/menu1/menu1-2/menu1-2.component';

const routes: Routes = [
  {
    path: '',
    component: Menu12Component,
    data: { title: 'Menu1-2', key: 'menu1-2' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Menu12RoutingModule {}
