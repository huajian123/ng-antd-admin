import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AboutRoutingModule} from './about-routing.module';
import {AboutComponent} from './about.component';
import {SharedModule} from "../../shared/shared.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {DragModule} from "../../widget/biz-widget/drag/drag.module";


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    SharedModule,
    DragDropModule,
    DragModule,
    AboutRoutingModule,
  ]
})
export class AboutModule {
}
