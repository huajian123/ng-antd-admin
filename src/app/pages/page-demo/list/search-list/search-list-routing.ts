import { Route } from '@angular/router';

import { ApplicationComponent } from './application/application.component';
import { ArticleComponent } from './article/article.component';
import { ProjectComponent } from './project/project.component';
import { SearchListComponent } from './search-list.component';

export default [
  {
    path: '',
    component: SearchListComponent,
    data: { key: 'search-list' },
    children: [
      { path: 'article', component: ArticleComponent, data: { title: '搜索列表(文章)', key: 'article' } },
      { path: 'project', component: ProjectComponent, data: { title: '搜索列表(项目)', key: 'project' } },
      { path: 'application', component: ApplicationComponent, data: { title: '搜索列表(应用)', key: 'application' } }
    ]
  },

  { path: '', redirectTo: '/search-list', pathMatch: 'full' }
] as Route[];
