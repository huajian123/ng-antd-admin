import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Except404Component } from './except404.component';

const routes: Routes = [{ path: '', component: Except404Component, data: { title: '404', key: 'except404' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Except404RoutingModule {}
