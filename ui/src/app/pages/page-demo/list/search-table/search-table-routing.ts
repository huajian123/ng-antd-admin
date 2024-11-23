import { Route } from '@angular/router';

import { ActionCode } from '@config/actionCode';

import { SearchTableDetailComponent } from './search-table-detail/search-table-detail.component';
import { SearchTableComponent } from './search-table.component';

export default [
  {
    path: '',
    component: SearchTableComponent,
    title: '查询表格',
    data: { key: 'search-table' }
  },
  {
    path: 'search-table-detail/:name/:age',
    component: SearchTableDetailComponent,
    title: '查询表格',
    data: {
      authCode: ActionCode.SearchTableDetail,
      key: 'search-table-detail'
    }
  }
] satisfies Route[];
