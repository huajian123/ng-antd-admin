import { NgModule } from '@angular/core';

import { LayoutHeadRightMenuModule } from './layout-components/layout-head-right-menu/layout-head-right-menu.module';

const MODULES = [LayoutHeadRightMenuModule];

@NgModule({
  declarations: [],
  imports: [...MODULES],
  exports: [...MODULES]
})
export class BizComponentsModule {}
