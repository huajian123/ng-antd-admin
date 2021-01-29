import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginModalComponent} from './login-modal.component';
import {SharedModule} from '../../../share/shared.module';


@NgModule({
  declarations: [LoginModalComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LoginModalComponent
  ]
})
export class LoginModalModule {
}
