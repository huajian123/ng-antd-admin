import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginInOutService } from '@core/services/common/login-in-out.service';
import { WindowService } from '@core/services/common/window.service';
import { AccountService, UserPsd } from '@services/system/account.service';
import { SpinService } from '@store/common-store/spin.service';
import { UserInfoService } from '@store/common-store/userInfo.service';
import { ModalBtnStatus } from '@widget/base-modal';
import { ChangePasswordService } from '@widget/biz-widget/change-password/change-password.service';
import { LockWidgetService } from '@widget/common-widget/lock-widget/lock-widget.service';
import { SearchRouteService } from '@widget/common-widget/search-route/search-route.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ModalOptions } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-layout-head-right-menu',
  templateUrl: './layout-head-right-menu.component.html',
  styleUrls: ['./layout-head-right-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutHeadRightMenuComponent implements OnInit {
  user!: UserPsd;

  constructor(
    private router: Router,
    private changePasswordModalService: ChangePasswordService,
    private spinService: SpinService,
    private loginOutService: LoginInOutService,
    private lockWidgetService: LockWidgetService,
    private windowServe: WindowService,
    private activatedRoute: ActivatedRoute,
    private searchRouteService: SearchRouteService,
    public message: NzMessageService,
    private userInfoService: UserInfoService,
    private accountService: AccountService
  ) {}

  // 锁定屏幕
  lockScreen(): void {
    this.lockWidgetService
      .show({
        nzTitle: 'Màn hình khóa',
        nzStyle: { top: '25px' },
        nzWidth: '520px',
        nzFooter: null,
        nzMaskClosable: true
      })
      .subscribe();
  }

  // 修改密码
  changePassWorld(): void {
    this.changePasswordModalService.show({ nzTitle: 'Đổi mật khẩu' }).subscribe(({ modalValue, status }) => {
      if (status === ModalBtnStatus.Cancel) {
        return;
      }
      this.userInfoService.getUserInfo().subscribe(res => {
        this.user = {
          id: res.userId,
          oldPassword: modalValue.oldPassword,
          newPassword: modalValue.newPassword
        };
      });
      this.accountService.editAccountPsd(this.user).subscribe(() => {
        this.loginOutService.loginOut().then();
        this.message.success('Sửa đổi thành công, vui lòng đăng nhập lại');
      });
    });
  }

  showSearchModal(): void {
    const modalOptions: ModalOptions = {
      nzClosable: false,
      nzMaskClosable: true,
      nzStyle: { top: '48px' },
      nzFooter: null,
      nzBodyStyle: { padding: '0' }
    };
    this.searchRouteService.show(modalOptions);
  }

  goLogin(): void {
    this.loginOutService.loginOut().then();
  }

  clean(): void {
    this.windowServe.clearStorage();
    this.windowServe.clearSessionStorage();
    this.loginOutService.loginOut().then();
    this.message.success('Đã xóa thành công, vui lòng đăng nhập lại');
  }

  showMessage(): void {
    this.message.info('Chưa Thiết Lập');
  }

  goPage(path: string): void {
    this.router.navigateByUrl(`/default/page-demo/personal/${path}`);
  }

  ngOnInit(): void {}
}
