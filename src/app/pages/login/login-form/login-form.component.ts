import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {fnCheckForm} from '@utils/tools';
import {SpinService} from "@store/common-store/spin.service";
import {WindowService} from "@core/services/common/window.service";
import {TokenKey, TokenPre} from "@config/constant";
import {LoginService} from "@core/services/http/login/login.service";
import {UserInfoService} from "@store/common-store/userInfo.service";
import {MenuStoreService} from "@store/common-store/menu-store.service";
import {LoginInOutService} from "@core/services/common/login-in-out.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private loginInOutService: LoginInOutService,
              private menuService: MenuStoreService,
              private dataService: LoginService,
              private spinService: SpinService,
              private windowServe: WindowService,
              private userInfoService: UserInfoService,
              private router: Router) {
  }

  submitForm(): void {
    /*直到51行的 return 都是模拟登录，实际操作可以直接将33-50行删除*/
    this.spinService.setCurrentGlobalSpinStore(true);
    this.windowServe.setStorage(TokenKey, 'TokenPre + token');
    const userInfo = this.userInfoService.parsToken(TokenPre);
    this.userInfoService.setUserInfo(userInfo)
    // if (!fnCheckForm(this.validateForm)) {
    //   return;
    // }
    setTimeout(() => {
      // 这里是模拟的随便写的-1，实际情况请往下看
      this.dataService.getMenuByUserId(-1).subscribe(menus => {
        this.menuService.setMenuArrayStore(menus);
        this.router.navigateByUrl('default/dashboard/analysis').then(() => {
          this.spinService.setCurrentGlobalSpinStore(false);
        })
      })
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
    // 登录后台返回统一模式为,如果code不为0，会自动被拦截，如果需要修改，请在src/app/core/services/http/base-http.service.ts中进行修改
    // {
    //   code:number,
    //   data:any,
    //   msg：string
    // }

    this.dataService.login(param).subscribe(userToken => {
      this.loginInOutService.loginIn(userToken.token).then(() => {
        this.router.navigateByUrl('default/dashboard/analysis');
      }).finally(()=>{
        this.spinService.setCurrentGlobalSpinStore(false);
      })
    })
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null],
    });
  }

}
