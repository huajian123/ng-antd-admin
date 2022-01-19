import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutHeadRightMenuComponent} from './layout-head-right-menu.component';
import {HomeNoticeModule} from "../home-notice/home-notice.module";
import {SearchRouteModule} from "@widget/common-widget/search-route/search-route.module";
import {SHARED_ZORRO_MODULES} from "@shared/shared-zorro.module";
import {DirectivesModule} from "@shared/directives/directives.module";
import {LockWidgetModule} from "@widget/common-widget/lock-widget/lock-widget.module";


@NgModule({
  declarations: [
    LayoutHeadRightMenuComponent
  ],
  imports: [
    LockWidgetModule,
    DirectivesModule,
    HomeNoticeModule,
    SearchRouteModule,
    CommonModule,
    SHARED_ZORRO_MODULES,
  ],
  exports: [
    LayoutHeadRightMenuComponent
  ]
})
export class LayoutHeadRightMenuModule {
}
