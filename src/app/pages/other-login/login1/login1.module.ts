import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { QRCodeModule } from 'angular2-qrcode';

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
