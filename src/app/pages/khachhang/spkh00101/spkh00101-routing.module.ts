import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spkh00101Component } from './spkh00101.component';

const routes: Routes = [
  {path: '', component: Spkh00101Component,data: { title: 'Công nợ khách hàng', key: 'spkh00101' }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class Spkh00101RoutingModule { }

