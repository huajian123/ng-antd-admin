import { NgModule } from '@angular/core';

import { PasswordStrengthMeterModule } from '@shared/biz-components/password-strength-meter/password-strength-meter.module';
import { SharedModule } from '@shared/shared.module';
import { QRCodeModule } from 'angularx-qrcode';

import { Login1RoutingModule } from './login1-routing.module';
import { Login1Component } from './login1.component';
import { NormalLoginComponent } from './normal-login/normal-login.component';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import { QrLoginComponent } from './qr-login/qr-login.component';
import { RegistLoginComponent } from './regist-login/regist-login.component';

@NgModule({
  declarations: [Login1Component, NormalLoginComponent, QrLoginComponent, RegistLoginComponent, PhoneLoginComponent],
  imports: [SharedModule, PasswordStrengthMeterModule.forChild(), QRCodeModule, Login1RoutingModule]
})
export class Login1Module {}
