import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchTableComponent} from './search-table.component';
import {SearchTableDetailComponent} from './search-table-detail/search-table-detail.component';
import {ActionCode} from "@config/actionCode";

const routes: Routes = [
  {
    path: '',
    component: SearchTableComponent,
    data: {title: '查询表格', key: 'search-table', relatedLink: ['search-table', 'search-table-detail']}
  },
  {
    path: 'search-table-detail', component: SearchTableDetailComponent, data: {
      title: '查询表格',
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
export class SearchTableRoutingModule {
}
