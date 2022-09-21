import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StandardTableComponent } from './standard-table.component';

const routes: Routes = [{ path: '', component: StandardTableComponent, data: { title: 'mẫu', key: 'standard-table' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardTableRoutingModule {}
