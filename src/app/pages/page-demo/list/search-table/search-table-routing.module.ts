import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionCode } from '@config/actionCode';

import { SearchTableDetailComponent } from './search-table-detail/search-table-detail.component';
import { SearchTableComponent } from './search-table.component';

const routes: Routes = [
  {
    path: '',
    component: SearchTableComponent,
    data: { title: '查询表格', key: 'search-table' }
  },
  {
    path: 'search-table-detail/:name/:age',
    component: SearchTableDetailComponent,
    data: {
      title: '查询表格',
      authCode: ActionCode.SearchTableDetail,
      key: 'search-table-detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchTableRoutingModule {}
