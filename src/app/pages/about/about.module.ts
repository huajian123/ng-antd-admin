import {NgModule} from '@angular/core';
import {AboutRoutingModule} from './about-routing.module';
import {AboutComponent} from './about.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {SharedModule} from "@shared/shared.module";
import { DragModule } from '@app/widget/biz-widget/drag/drag.module';


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
