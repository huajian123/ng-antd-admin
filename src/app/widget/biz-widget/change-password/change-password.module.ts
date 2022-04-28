import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import {SHARED_ZORRO_MODULES} from "@shared/shared-zorro.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PasswordStrengthMeterModule} from "angular-password-strength-meter";



@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SHARED_ZORRO_MODULES,
    PasswordStrengthMeterModule.forChild(),
  ]
})
export class ChangePasswordModule { }
