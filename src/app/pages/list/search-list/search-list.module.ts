import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchListRoutingModule} from './search-list-routing.module';
import {SearchListComponent} from './search-list.component';
import {ArticleComponent} from './article/article.component';
import {ProjectComponent} from './project/project.component';
import {ApplicationComponent} from './application/application.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [SearchListComponent, ArticleComponent, ProjectComponent, ApplicationComponent],
  imports: [
    SharedModule,
    SearchListRoutingModule
  ]
})
export class SearchListModule {
}
