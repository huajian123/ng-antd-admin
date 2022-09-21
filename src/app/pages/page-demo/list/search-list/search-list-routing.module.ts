import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationComponent } from './application/application.component';
import { ArticleComponent } from './article/article.component';
import { ProjectComponent } from './project/project.component';
import { SearchListComponent } from './search-list.component';

const routes: Routes = [
  {
    path: '',
    component: SearchListComponent,
    data: { key: 'search-list' },
    children: [
      { path: 'article', component: ArticleComponent, data: { title: 'Danh sách tìm kiếm (Các bài báo)', key: 'article' } },
      { path: 'project', component: ProjectComponent, data: { title: 'danh sách tìm kiếm (mục)', key: 'project' } },
      { path: 'application', component: ApplicationComponent, data: { title: 'Danh sách tìm kiếm (Ứng dụng)', key: 'application' } }
    ]
  },

  { path: '', redirectTo: '/search-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchListRoutingModule {}
