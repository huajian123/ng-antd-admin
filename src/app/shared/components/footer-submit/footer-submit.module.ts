import {NgModule} from '@angular/core';
import {FooterSubmitComponent} from './footer-submit.component';
import {SHARED_ZORRO_MODULES} from '../../shared-zorro.module';
import {CommonModule} from '@angular/common';

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
