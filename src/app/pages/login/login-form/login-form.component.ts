import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../../core/services/http/login/login.service';
import {WindowService} from '../../../core/services/window.service';
import {AuthKey, TokenPre} from '../../../configs/constant';
import {fnCheckForm} from '../../../utils/tools';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private dataService: LoginService,
              private windowServe: WindowService) {
  }


  submitForm(): void {
    // this.router.navigateByUrl('default');
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
    const param = this.validateForm.getRawValue();
    this.dataService.login(param).subscribe(({token}) => {
      this.windowServe.setStorage(AuthKey, TokenPre + token);
      this.router.navigateByUrl('default');
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
