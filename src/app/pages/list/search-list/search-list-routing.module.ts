import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ArticleComponent} from './article/article.component';
import {ProjectComponent} from './project/project.component';
import {ApplicationComponent} from './application/application.component';
import {SearchTableComponent} from '../search-table/search-table.component';
import {SearchListComponent} from './search-list.component';

const routes: Routes = [
  {
    path: '', component: SearchListComponent, data: {key: 'search-list', title: '搜索列表'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchListRoutingModule {
}
