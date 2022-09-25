/* eslint-disable prettier/prettier */
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { isEmail, isMobile, isPasswordPass, isTelPhone } from '@utils/validate/validate';
import * as Const from "src/app/common/const";
import { WebserviceService } from 'src/app/core/services/common/webservice.service';
@Injectable({
  providedIn: 'root'
})
export class ValidatorsRuleService {
  constructor(
    private webService: WebserviceService
  ) {}

  mobileRule(value: string): ValidationErrors | null {
    if (!value) {
      return null;
    }
    return isMobile(value) ? null : { message: 'Vui lòng nhập số điện thoại chính xác' };
  }

  telPhoneRule(value: string): ValidationErrors | null {
    if (!value) {
      return null;
    }
    return isTelPhone(value) ? null : { message: 'Vui lòng nhập zalo chính xác' };
  }

  emailRule(value: string): ValidationErrors | null {
    if (!value) {
      return null;
    }
    return isEmail(value) ? null : { message: 'Vui lòng nhập emali chính xác' };
  }


  passwordRule(value: string): ValidationErrors | null {
    if (!value) {
      return null;
    }
    return isPasswordPass(value) ? null : { message: 'Mật khẩu bao gồm 6 đến 20 chữ cái viết hoa và viết thường, số hoặc các ký tự khác' };
  }
}
