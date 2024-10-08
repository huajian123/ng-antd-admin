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
      { path: 'article', component: ArticleComponent, title: '搜索列表(文章)', data: { key: 'article' } },
      { path: 'project', component: ProjectComponent, title: '搜索列表(项目)', data: { key: 'project' } },
      { path: 'application', component: ApplicationComponent, title: '搜索列表(应用)', data: { key: 'application' } }
    ]
  },

  { path: '', redirectTo: '/search-list', pathMatch: 'full' }
] satisfies Route[];
