import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ModalWrapService } from '@widget/base-modal';

import { LoginModalComponent } from './login-modal.component';

@NgModule({
  imports: [SharedModule, LoginModalComponent],
  exports: [LoginModalComponent],
  providers: [ModalWrapService]
})
export class LoginModalModule {}
