import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardTableComponent } from './card-table.component';

const routes: Routes = [{ path: '', component: CardTableComponent, data: { title: 'danh sách thẻ', key: 'card-table' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardTableRoutingModule {}
