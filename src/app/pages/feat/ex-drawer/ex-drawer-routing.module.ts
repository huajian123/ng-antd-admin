import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExDrawerComponent } from '@app/pages/feat/ex-drawer/ex-drawer.component';

const routes: Routes = [{ path: '', component: ExDrawerComponent, data: { title: '封装抽屉', key: 'ex-drawer' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExDrawerRoutingModule {}
