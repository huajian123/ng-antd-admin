import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Menu2Component } from '@app/pages/level/menu2/menu2.component';

const routes: Routes = [
  {
    path: '',
    component: Menu2Component,
    data: { title: 'Menu2', key: 'menu2' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Menu2RoutingModule {}
