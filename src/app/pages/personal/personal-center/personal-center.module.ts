import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PersonalCenterRoutingModule} from './personal-center-routing.module';
import {PersonalCenterComponent} from './personal-center.component';
import {SharedModule} from '../../../share/shared.module';
import {NzNoAnimationModule} from 'ng-zorro-antd/core/no-animation';
import {ArticleComponent} from './article/article.component';
import {ApplicationComponent} from './application/application.component';
import {ProjectsComponent} from './projects/projects.component';


@NgModule({
  declarations: [PersonalCenterComponent, ArticleComponent, ApplicationComponent, ProjectsComponent],
  imports: [
    CommonModule,
    SharedModule,
    PersonalCenterRoutingModule,
    NzNoAnimationModule
  ]
})
export class PersonalCenterModule {
}
