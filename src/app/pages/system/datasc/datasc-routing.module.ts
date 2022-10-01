import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatascComponent } from './datasc.component';

const routes: Routes = [
  {
    path: '',
    component: DatascComponent,
    data: { title: 'Quản ly dữ liệu SC', key: 'datasc' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatascRoutingModule { }
