import { NgStyle } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { LoginType } from '@app/pages/other-login/login1/login1.component';
import { PasswordStrengthMeterComponent } from '@shared/biz-components/password-strength-meter/password-strength-meter.component';
import { Login1StoreService } from '@store/biz-store-service/other-login/login1-store.service';
import { EquipmentWidth, WindowsWidthService } from '@store/common-store/windows-width.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

/*https://www.npmjs.com/package/angular-password-strength-meter*/
@Component({
  selector: 'app-regist-login',
  templateUrl: './regist-login.component.html',
  styleUrls: ['./regist-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, NzFormModule, ReactiveFormsModule, NzGridModule, NzInputModule, NzButtonModule, NzWaveModule, NgStyle, PasswordStrengthMeterComponent, NzIconModule, NzCheckboxModule]
})
export class RegistLoginComponent implements OnInit {
  validateForm!: FormGroup;
  typeEnum = LoginType;
  passwordVisible = false;
  compirePasswordVisible = false;

  isOverModel = false;
  equipmentWidthEnum = EquipmentWidth;
  currentEquipmentWidth: EquipmentWidth = EquipmentWidth.md;
  get password(): AbstractControl | null {
    return this.validateForm.get('password');
  }
  destroyRef = inject(DestroyRef);

  private fb = inject(FormBuilder);
  private login1StoreService = inject(Login1StoreService);
  private windowsWidthService = inject(WindowsWidthService);
  private cdr = inject(ChangeDetectorRef);

  subScreenWidth(): void {
    this.windowsWidthService.getWindowWidthStore().subscribe(res => {
      this.currentEquipmentWidth = res;
      this.cdr.markForCheck();
    });
  }

  submitForm(): void {}

  goOtherWay(type: LoginType): void {
    this.login1StoreService.setLoginTypeStore(type);
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): Record<string, boolean> => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  initForm(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      remember: [null]
    });
  }

  subLogin1Store(): void {
    this.login1StoreService
      .getIsLogin1OverModelStore()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.isOverModel = res;
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.subScreenWidth();
    this.initForm();
    this.subLogin1Store();
  }
}
