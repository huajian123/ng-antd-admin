import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { LoginFormRoutingModule } from './login-form-routing.module';
import { LoginFormComponent } from './login-form.component';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [SharedModule, LoginFormRoutingModule]
})
export class LoginFormModule {}
