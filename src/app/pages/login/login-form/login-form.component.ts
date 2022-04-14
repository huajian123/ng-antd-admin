import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {fnCheckForm} from '@utils/tools';
import {SpinService} from "@core/services/store/spin-store/spin.service";
import {WindowService} from "@core/services/common/window.service";
import {AuthKey, TokenPre} from "@config/constant";
import {LoginService} from "@core/services/http/login/login.service";
import {finalize} from "rxjs/operators";
import {AuthService} from "@core/services/store/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private dataService: LoginService,
              private spinService: SpinService,
              private windowServe: WindowService,
              private authService: AuthService,
              private router: Router) {
  }


  submitForm(): void {
    /*直到43行的 return 都是模拟登录，实际操作可以直接将33-43行删除*/
    this.spinService.setCurrentGlobalSpinStore(true);
    this.windowServe.setStorage(AuthKey, 'TokenPre + token');
    this.authService.setAuthCode(this.authService.parsToken(TokenPre));
    // if (!fnCheckForm(this.validateForm)) {
    //   return;
    // }
    setTimeout(() => {
      this.router.navigateByUrl('default/dashboard/analysis');
      this.spinService.setCurrentGlobalSpinStore(false);
    }, 100);
    return;
    // 校验表单
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
    // 设置全局loading
    this.spinService.setCurrentGlobalSpinStore(true);
    // 获取表单的值
    const param = this.validateForm.getRawValue();
    // 调用登录接口
    this.dataService.login(param).pipe(finalize(() => {
      this.spinService.setCurrentGlobalSpinStore(false);
    })).subscribe((token) => {
      // 从登录接口返回的token设置storage中
      this.windowServe.setStorage(AuthKey, TokenPre + token);
      // 将token中解析出来的该用户拥有的权限码设置于全局状态
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
