import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { LoginInOutService } from '@core/services/common/login-in-out.service';
import { WindowService } from '@core/services/common/window.service';
import { LoginService } from '@core/services/http/login/login.service';
import { MenuStoreService } from '@store/common-store/menu-store.service';
import { SpinService } from '@store/common-store/spin.service';
import { UserInfoService } from '@store/common-store/userInfo.service';
import { fnCheckForm } from '@utils/tools';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, NzFormModule, ReactiveFormsModule, NzTabsModule, NzGridModule, NzButtonModule, NzInputModule, NzWaveModule, NzCheckboxModule, NzIconModule, RouterLink]
})
export class LoginFormComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginInOutService: LoginInOutService,
    private menuService: MenuStoreService,
    private dataService: LoginService,
    private spinService: SpinService,
    private windowServe: WindowService,
    private userInfoService: UserInfoService,
    private router: Router
  ) {}

  submitForm(): void {
    // 校验表单
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
    // 设置全局loading
    this.spinService.setCurrentGlobalSpinStore(true);
    // 获取表单的值
    const param = this.validateForm.getRawValue();
    // 调用登录接口
    // todo 登录后台返回统一模式为,如果code不为0，会自动被拦截，如果需要修改，请在src/app/core/services/http/base-http.service.ts中进行修改
    // {
    //   code:number,
    //   data:any,
    //   msg：string
    // }
    this.dataService
      .login(param)
      .pipe(
        // 无论如何设置全局loading为false
        finalize(() => {
          this.spinService.setCurrentGlobalSpinStore(false);
        })
      )
      .subscribe(userToken => {
        // 这里后台登录成功以后，只会返回一套由jwt加密的token，下面需要对token进行解析
        this.loginInOutService
          .loginIn(userToken)
          .then(() => {
            this.router.navigateByUrl('default/dashboard/analysis');
          })
          .finally(() => {
            this.spinService.setCurrentGlobalSpinStore(false);
          });
      });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null]
    });
  }
}
