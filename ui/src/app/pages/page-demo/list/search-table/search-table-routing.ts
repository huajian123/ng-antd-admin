import { Route } from '@angular/router';

import { ActionCode } from '@config/actionCode';

import { SearchTableDetailComponent } from './search-table-detail/search-table-detail.component';
import { SearchTableComponent } from './search-table.component';

export default [
  {
    path: '',
    component: SearchTableComponent,
    title: 'menu.default:page-demo:list:search-table',
    data: { key: 'search-table' }
  },
  {
    path: 'search-table-detail/:name/:age',
    component: SearchTableDetailComponent,
    title: 'menu.default:page-demo:list:search-table',
    data: {
      authCode: ActionCode.SearchTableDetail,
      key: 'search-table-detail'
    }
  }
] satisfies Route[];
