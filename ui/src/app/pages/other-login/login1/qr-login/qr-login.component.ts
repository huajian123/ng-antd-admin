import { Component, OnInit, ChangeDetectionStrategy, inject, DestroyRef, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginType } from '@app/pages/other-login/login1/login1.component';
import { Login1StoreService } from '@store/biz-store-service/other-login/login1-store.service';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-qr-login',
  templateUrl: './qr-login.component.html',
  styleUrls: ['./qr-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzFormModule, ReactiveFormsModule, NzGridModule, NzTypographyModule, NzButtonModule, NzWaveModule, NzQRCodeModule]
})
export class QrLoginComponent implements OnInit {
  validateForm!: FormGroup;
  password?: string;
  typeEnum = LoginType;
  isOverModel = computed(() => {
    return this.login1StoreService.isLogin1OverModelSignalStore();
  });
  destroyRef = inject(DestroyRef);

  private fb = inject(FormBuilder);
  private login1StoreService = inject(Login1StoreService);

  submitForm(): void {}

  goOtherWay(type: LoginType): void {
    this.login1StoreService.$loginTypeStore.set(type);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null]
    });
  }
}
