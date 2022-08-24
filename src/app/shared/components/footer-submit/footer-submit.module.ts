import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SHARED_ZORRO_MODULES } from '@shared/shared-zorro.module';

import { FooterSubmitComponent } from './footer-submit.component';

@NgModule({
  declarations: [FooterSubmitComponent],
  imports: [CommonModule, SHARED_ZORRO_MODULES],
  exports: [FooterSubmitComponent]
})
export class FooterSubmitModule {}
