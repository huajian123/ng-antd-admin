import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ModalWrapService } from '@widget/base-modal';

import { LoginModalComponent } from './login-modal.component';

@NgModule({
  declarations: [LoginModalComponent],
  imports: [SharedModule],
  exports: [LoginModalComponent],
  providers: [ModalWrapService]
})
export class LoginModalModule {}
