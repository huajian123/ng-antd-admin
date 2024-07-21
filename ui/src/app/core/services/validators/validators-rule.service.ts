import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { isEmail, isMobile, isPasswordPass, isTelPhone } from '@utils/validate/validate';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsRuleService {
  mobileRule(value: string): ValidationErrors | null {
    if (!value) {
      return null;
    }
    return isMobile(value) ? null : { message: '请输入正确的手机号' };
  }

  telPhoneRule(value: string): ValidationErrors | null {
    if (!value) {
      return null;
    }
    return isTelPhone(value) ? null : { message: '请输入正确的电话号码' };
  }

  emailRule(value: string): ValidationErrors | null {
    if (!value) {
      return null;
    }
    return isEmail(value) ? null : { message: '请输入正确的邮箱格式' };
  }

  passwordRule(value: string): ValidationErrors | null {
    if (!value) {
      return null;
    }
    return isPasswordPass(value) ? null : { message: '密码由6到20位大小写字母、数字或其他字符组成' };
  }
}
