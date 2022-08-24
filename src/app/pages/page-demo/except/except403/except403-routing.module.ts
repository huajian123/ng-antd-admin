import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Except403Component } from './except403.component';

const routes: Routes = [{ path: '', component: Except403Component, data: { title: '403', key: 'except403' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Except403RoutingModule {}
