import {NgModule} from '@angular/core';
import {LoginModalComponent} from './login-modal.component';
import {SharedModule} from "@shared/shared.module";
import {ModalWrapService} from "@widget/base-modal";

@NgModule({
  declarations: [LoginModalComponent],
  imports: [
    SharedModule
  ],
  exports: [
    LoginModalComponent
  ],
  providers: [ModalWrapService]
})
export class LoginModalModule {
}
