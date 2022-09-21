import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from '@app/pages/system/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    data: { title: 'Quản lý menu', key: 'menu' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule {}
