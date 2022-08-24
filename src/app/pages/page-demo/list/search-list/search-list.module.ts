import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { ApplicationComponent } from './application/application.component';
import { ArticleComponent } from './article/article.component';
import { ProjectComponent } from './project/project.component';
import { SearchListRoutingModule } from './search-list-routing.module';
import { SearchListComponent } from './search-list.component';

@NgModule({
  declarations: [SearchListComponent, ArticleComponent, ProjectComponent, ApplicationComponent],
  imports: [SharedModule, SearchListRoutingModule]
})
export class SearchListModule {}
