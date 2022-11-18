import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spch00101Component } from './spch00101.component';

const routes: Routes = [
  { path: '', component: Spch00101Component, data: { title: 'Quản lý chuyến', key: 'spch00101' } }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class Spch00101RoutingModule { }

