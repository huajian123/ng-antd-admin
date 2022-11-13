import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanlyComponent } from './quanly.component';

const routes: Routes = [
  { path: '', component: QuanlyComponent, data: { title: 'Kế hoạch bóc hàng', key: 'quanly' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlyRoutingModule { }
