import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewkhComponent } from './newkh.component';

const routes: Routes = [
  {path: '', component: NewkhComponent,data: { title: 'Tạo Mới KH', key: 'newkh' }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NewkhRoutingModule { }

