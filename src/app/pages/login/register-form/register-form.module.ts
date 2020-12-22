import { NgModule } from '@angular/core';
import { RegisterFormRoutingModule } from './register-form-routing.module';
import { RegisterFormComponent } from './register-form.component';
import {ShareModule} from '../../../share/share.module';


@NgModule({
  declarations: [RegisterFormComponent],
  imports: [
    ShareModule,
    RegisterFormRoutingModule
  ]
})
export class RegisterFormModule { }
