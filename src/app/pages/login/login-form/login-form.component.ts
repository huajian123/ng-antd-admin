import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../../core/services/http/login/login.service';
import {WindowService} from '../../../core/services/common/window.service';
import {AuthKey, TokenPre} from '../../../configs/constant';
import {fnCheckForm} from '../../../utils/tools';
import {AuthService} from '../../../core/services/store/auth.service';
import {SpinService} from '../../../core/services/store/spin/spin.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private spinService: SpinService, private router: Router, private dataService: LoginService,
              private windowServe: WindowService, private authService: AuthService) {
  }


  submitForm(): void {
    this.spinService.setCurrentGlobalSpinStore(true);
    this.windowServe.setStorage(AuthKey, 'TokenPre + token');
    setTimeout(() => {
      this.router.navigateByUrl('default/dashboard/analysis');
    }, 100);

    return;
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
    this.spinService.setCurrentGlobalSpinStore(true);
    const param = this.validateForm.getRawValue();
    this.dataService.login(param).pipe(finalize(() => {
      this.spinService.setCurrentGlobalSpinStore(false);
    })).subscribe((token) => {
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
