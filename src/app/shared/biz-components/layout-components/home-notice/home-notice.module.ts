import {NgModule} from '@angular/core';
import {HomeNoticeComponent} from './home-notice.component';
import {CommonModule} from "@angular/common";
import {SHARED_ZORRO_MODULES} from "@shared/shared-zorro.module";
import {PipesModule} from "@shared/pipes/pipes.module";


@NgModule({
  declarations: [
    HomeNoticeComponent
  ],
  imports: [
    CommonModule,
    SHARED_ZORRO_MODULES,
    PipesModule
  ],
  exports: [HomeNoticeComponent]
})
export class HomeNoticeModule {
}
