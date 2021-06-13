import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../../core/services/http/login/login.service';
import {WindowService} from '../../../core/services/common/window.service';
import {AuthKey, TokenPre} from '../../../configs/constant';
import {fnCheckForm} from '../../../utils/tools';
import {AuthService} from '../../../core/services/store/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private dataService: LoginService,
              private windowServe: WindowService, private authService: AuthService) {
  }


  submitForm(): void {
    this.windowServe.setStorage(AuthKey, 'TokenPre + token');
    this.router.navigateByUrl('default/dashboard/analysis');
    return;
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
    const param = this.validateForm.getRawValue();
    this.dataService.login(param).subscribe(({token}) => {
      this.windowServe.setStorage(AuthKey, TokenPre + token);
      // this.authService.parsToken(token);
      this.authService.setAuthCode(this.authService.parsToken(TokenPre + token));
      this.router.navigateByUrl('default/dashboard/analysis');
    });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null],
    });
  }

}
