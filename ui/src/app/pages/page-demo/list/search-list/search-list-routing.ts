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
      { path: 'article', component: ArticleComponent, title: 'menu.default:page-demo:list:search-list:article', data: { key: 'article' } },
      { path: 'project', component: ProjectComponent, title: 'menu.default:page-demo:list:search-list:project', data: { key: 'project' } },
      { path: 'application', component: ApplicationComponent, title: 'menu.default:page-demo:list:search-list:application', data: { key: 'application' } }
    ]
  },

  { path: '', redirectTo: '/search-list', pathMatch: 'full' }
] satisfies Route[];
