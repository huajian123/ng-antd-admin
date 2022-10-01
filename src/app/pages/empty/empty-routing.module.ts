import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmptyComponent } from './empty.component';

const routes: Routes = [
  { path: '', component: EmptyComponent, data: { title: 'Trang trống', key: 'empty-page', shouldDetach: 'no' } },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmptyRoutingModule {}
