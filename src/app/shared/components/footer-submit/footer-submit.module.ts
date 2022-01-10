import {NgModule} from '@angular/core';
import {FooterSubmitComponent} from './footer-submit.component';
import {CommonModule} from '@angular/common';
import {SHARED_ZORRO_MODULES} from "@shared/shared-zorro.module";

@NgModule({
  declarations: [FooterSubmitComponent],
  imports: [
    CommonModule,
    SHARED_ZORRO_MODULES,
  ],
  exports: [FooterSubmitComponent]
})
export class FooterSubmitModule {
}
