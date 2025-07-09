import { NgStyle } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, inject, DestroyRef, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginType } from '@app/pages/other-login/login1/login1.component';
import { Login1StoreService } from '@store/biz-store-service/other-login/login1-store.service';
import { EquipmentWidth, WindowsWidthService } from '@store/common-store/windows-width.service';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzFormModule, ReactiveFormsModule, NzGridModule, NzInputModule, NzButtonModule, NzWaveModule, NgStyle]
})
export class PhoneLoginComponent implements OnInit {
  validateForm!: FormGroup;
  password?: string;
  typeEnum = LoginType;
  equipmentWidthEnum = EquipmentWidth;
  isOverModel = computed(() => {
    return this.login1StoreService.isLogin1OverModelSignalStore();
  });
  $currentEquipmentWidth = computed(() => this.windowsWidthService.$windowWidth());
  destroyRef = inject(DestroyRef);

  private fb = inject(FormBuilder);
  private login1StoreService = inject(Login1StoreService);
  private windowsWidthService = inject(WindowsWidthService);

  submitForm(): void {}

  goOtherWay(type: LoginType): void {
    this.login1StoreService.$loginTypeStore.set(type);
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null]
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
