import { inject, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { ValidatorsRuleService } from './validators-rule.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  private vrService = inject(ValidatorsRuleService);

  // 邮箱校验
  public emailValidator(): ValidatorFn | null {
    return this.commonUtil(this.vrService.emailRule);
  }

  // 手机号码校验
  public mobileValidator(): ValidatorFn | null {
    return this.commonUtil(this.vrService.mobileRule);
  }

  // 密码校验
  public passwordValidator(): ValidatorFn | null {
    return this.commonUtil(this.vrService.passwordRule);
  }

  // 电话号码校验
  public telephoneValidator(): ValidatorFn {
    return this.commonUtil(this.vrService.telPhoneRule);
  }

  private commonUtil(ruleFun: (value: string) => ValidationErrors | null): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return ruleFun(control.value);
    };
  }
}
