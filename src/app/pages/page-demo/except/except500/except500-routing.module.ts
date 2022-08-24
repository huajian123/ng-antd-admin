import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Except500Component } from './except500.component';

const routes: Routes = [{ path: '', component: Except500Component, data: { title: '500', key: 'except500' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Except500RoutingModule {}
