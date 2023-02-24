import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { RegisterFormRoutingModule } from './register-form-routing.module';
import { RegisterFormComponent } from './register-form.component';

@NgModule({
    imports: [SharedModule, RegisterFormRoutingModule, RegisterFormComponent]
})
export class RegisterFormModule {}
