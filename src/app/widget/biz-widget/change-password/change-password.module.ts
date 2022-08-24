import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SHARED_ZORRO_MODULES } from '@shared/shared-zorro.module';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';

import { ChangePasswordComponent } from './change-password.component';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SHARED_ZORRO_MODULES, PasswordStrengthMeterModule.forChild()]
})
export class ChangePasswordModule {}
