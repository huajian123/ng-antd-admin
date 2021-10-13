import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutHeadRightMenuComponent} from './layout-head-right-menu.component';
import {SHARED_ZORRO_MODULES} from "../../../shared-zorro.module";
import {HomeNoticeModule} from "../home-notice/home-notice.module";
import {DirectivesModule} from "../../../directives/directives.module";
import {SearchRouteModule} from "../../../../widget/common-widget/search-route/search-route.module";


@NgModule({
  declarations: [
    LayoutHeadRightMenuComponent
  ],
  imports: [
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
