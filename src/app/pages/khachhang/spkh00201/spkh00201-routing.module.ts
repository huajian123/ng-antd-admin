import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spkh00201Component } from './spkh00201.component';

const routes: Routes = [
  {path: '', component: Spkh00201Component,data: { title: 'Chi tiết công nợ', key: 'spkh00201' }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Spkh00201RoutingModule { }
