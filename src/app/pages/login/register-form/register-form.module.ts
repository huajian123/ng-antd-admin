import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { RegisterFormRoutingModule } from './register-form-routing.module';
import { RegisterFormComponent } from './register-form.component';

@NgModule({
  declarations: [RegisterFormComponent],
  imports: [SharedModule, RegisterFormRoutingModule]
})
export class RegisterFormModule {}
