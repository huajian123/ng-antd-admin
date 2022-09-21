import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionCode } from '@config/actionCode';

import { SearchTableDetailComponent } from './search-table-detail/search-table-detail.component';
import { SearchTableComponent } from './search-table.component';

const routes: Routes = [
  {
    path: '',
    component: SearchTableComponent,
    data: { title: 'Mẫu yêu cầu', key: 'search-table', relatedLink: ['search-table', 'search-table-detail'] }
  },
  {
    path: 'search-table-detail',
    component: SearchTableDetailComponent,
    data: {
      title: 'Mẫu yêu cầu',
      authCode: ActionCode.SearchTableDetail,
      key: 'search-table-detail',
      relatedLink: ['search-table', 'search-table-detail']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchTableRoutingModule {}
