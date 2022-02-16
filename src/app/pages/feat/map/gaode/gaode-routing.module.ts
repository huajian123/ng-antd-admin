import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GaodeComponent} from "@app/pages/feat/map/gaode/gaode.component";

const routes: Routes = [
  {path: '', component: GaodeComponent, data: {title: '高德', key: 'gaode'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GaodeRoutingModule { }
