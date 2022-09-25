import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormService {

  errorMessages: any;

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    usernameMin: 6,
    passwordMin: 6,
    passwordPattern: '^[a-zA-Z0-9]{6,20}$'
  };

  formErrors = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accept: false,
  };

  constructor() {
    this.errorMessages = {
      name: {
        required: 'Name không được để trống',
        minLength: `Name tối thiểu ${this.formRules.usernameMin} ký tự`,
        pattern: 'Must contain letters and/or numbers, no trailing spaces',
        namedb: "Tên Tài Khoản đã tồn tại."
      },
      text: {
        required: 'Không được để trống.'
      },
      email: {
        required: 'Không được để trống.',
        email: 'Địa chỉ Email không đúng.',
        emaildb: 'Email đã tồn tại.'
      },
      password: {
        required: 'Password không được để trống',
        pattern: 'Password là ký tự đặc biệt, số, chữ hoa và chữ thường',
        minLength: `Password tối thiểu ${this.formRules.passwordMin} ký tự`
      },
      confirmPassword: {
        required: 'Password confirmation is required',
        passwordMismatch: 'Passwords must match'
      },
      accept: {
        requiredTrue: 'You have to accept our Terms and Conditions'
      },
    };
  }
}
