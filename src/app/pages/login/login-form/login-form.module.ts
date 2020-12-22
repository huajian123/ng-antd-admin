import { NgModule } from '@angular/core';
import { LoginFormRoutingModule } from './login-form-routing.module';
import { LoginFormComponent } from './login-form.component';
import {ShareModule} from '../../../share/share.module';


@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    ShareModule,
    LoginFormRoutingModule
  ]
})
export class LoginFormModule { }
