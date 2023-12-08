import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PasswordStrengthMeterComponent } from '@shared/biz-components/password-strength-meter/password-strength-meter.component';
import { fnCheckForm } from '@utils/tools';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, NzFormModule, ReactiveFormsModule, NzGridModule, NzInputModule, NzButtonModule, PasswordStrengthMeterComponent, NzIconModule]
})
export class ChangePasswordComponent {
  passwordVisible = false;
  compirePasswordVisible = false;

  constructor(
    private modalRef: NzModalRef,
    private fb: NonNullableFormBuilder
  ) {}

  get newPassword(): string {
    return this.validateForm.controls.newPassword.value!;
  }

  protected getCurrentValue(): Observable<any> {
    if (!fnCheckForm(this.validateForm)) {
      return of(false);
    }
    return of(this.validateForm.value);
  }

  confirmationValidator = (control: FormControl): { [s: string]: any } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.newPassword.value) {
      return { message: '两次输入密码不一致', error: true };
    }
    return {};
  };
  validateForm = this.fb.group({
    oldPassword: [null, [Validators.required]],
    newPassword: [null, [Validators.required]],
    sureNewPassword: [null, [Validators.required, this.confirmationValidator]]
  });

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.sureNewPassword.updateValueAndValidity());
  }
}
