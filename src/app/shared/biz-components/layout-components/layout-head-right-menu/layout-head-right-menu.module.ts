import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DirectivesModule } from '@shared/directives/directives.module';
import { SHARED_ZORRO_MODULES } from '@shared/shared-zorro.module';
import { ChangePasswordModule } from '@widget/biz-widget/change-password/change-password.module';
import { LockWidgetModule } from '@widget/common-widget/lock-widget/lock-widget.module';
import { SearchRouteModule } from '@widget/common-widget/search-route/search-route.module';

import { HomeNoticeModule } from '../home-notice/home-notice.module';
import { LayoutHeadRightMenuComponent } from './layout-head-right-menu.component';

@NgModule({
  declarations: [LayoutHeadRightMenuComponent],
  imports: [LockWidgetModule, DirectivesModule, HomeNoticeModule, SearchRouteModule, ChangePasswordModule, CommonModule, SHARED_ZORRO_MODULES],
  exports: [LayoutHeadRightMenuComponent]
})
export class LayoutHeadRightMenuModule {}
