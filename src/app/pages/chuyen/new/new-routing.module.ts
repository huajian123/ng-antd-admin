import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewComponent } from './new.component';

const routes: Routes = [
  { path: '', component: NewComponent, data: { title: 'Tạo Mơi', key: 'new' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRoutingModule { }
