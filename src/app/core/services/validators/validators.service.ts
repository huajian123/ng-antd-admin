import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {ValidatorsRuleService} from './validators-rule.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor(private vrService: ValidatorsRuleService) {
  }


  // 手机号码校验
  public mobileValidator(): ValidatorFn | null {
    return this.commonUtil(this.vrService.mobileRule);
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
