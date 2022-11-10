import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XeComponent } from './xe.component';

const routes: Routes = [
  { path: '', component: XeComponent, data: { title: 'Quản lý xe', key: 'quanlyxe' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XeRoutingModule { }
