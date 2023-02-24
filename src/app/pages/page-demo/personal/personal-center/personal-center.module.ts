import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';

import { ApplicationComponent } from './application/application.component';
import { ArticleComponent } from './article/article.component';
import { PersonalCenterRoutingModule } from './personal-center-routing.module';
import { PersonalCenterComponent } from './personal-center.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
    imports: [CommonModule, SharedModule, PersonalCenterRoutingModule, NzNoAnimationModule, PersonalCenterComponent, ArticleComponent, ApplicationComponent, ProjectsComponent]
})
export class PersonalCenterModule {}
