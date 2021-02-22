import {NgModule} from '@angular/core';
import {LoginFormRoutingModule} from './login-form-routing.module';
import {LoginFormComponent} from './login-form.component';
import {SharedModule} from '../../../share/shared.module';


@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    SharedModule,
    LoginFormRoutingModule
  ]
})
export class LoginFormModule {
}
