import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PipesModule } from '@shared/pipes/pipes.module';
import { SHARED_ZORRO_MODULES } from '@shared/shared-zorro.module';

import { HomeNoticeComponent } from './home-notice.component';

@NgModule({
  declarations: [HomeNoticeComponent],
  imports: [CommonModule, SHARED_ZORRO_MODULES, PipesModule],
  exports: [HomeNoticeComponent]
})
export class HomeNoticeModule {}
