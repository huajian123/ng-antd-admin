import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "@core/services/common/window.service";
import {SearchRouteService} from "@widget/common-widget/search-route/search-route.service";
import {ModalOptions} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {LockWidgetService} from "@widget/common-widget/lock-widget/lock-widget.service";
import {LoginOutService} from "@core/services/common/login-out.service";
import {SpinService} from "@store/spin-store/spin.service";
import {ChangePasswordService} from "@widget/biz-widget/change-password/change-password.service";
import {ModalBtnStatus} from "@widget/base-modal";

@Component({
  selector: 'app-layout-head-right-menu',
  templateUrl: './layout-head-right-menu.component.html',
  styleUrls: ['./layout-head-right-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutHeadRightMenuComponent implements OnInit {

  constructor(private router: Router,
              private changePasswordModalService: ChangePasswordService,
              private spinService: SpinService,
              private loginOutService: LoginOutService,
              private lockWidgetService: LockWidgetService,
              private windowServe: WindowService,
              private activatedRoute: ActivatedRoute,
              private searchRouteService: SearchRouteService,
              public message: NzMessageService,) {
  }

  // 锁定屏幕
  lockScreen(): void {
    this.lockWidgetService.show({
      nzTitle: '锁定屏幕',
      nzStyle: {top: '25px'},
      nzWidth: '520px',
      nzFooter: null,
      nzMaskClosable: true
    }).subscribe();
  }

  // 修改密码
  changePassWorld(): void {
    this.changePasswordModalService.show({nzTitle: '修改密码'}).subscribe(({modalValue, status}) => {
      if (status === ModalBtnStatus.Cancel) {
        return;
      }
      this.message.success(`新密码：${modalValue.newPassword},旧密码：${modalValue.oldPassword}`);
      this.spinService.setCurrentGlobalSpinStore(true);
      setTimeout(() => {
        this.spinService.setCurrentGlobalSpinStore(false);
      }, 3000)

      this.loginOutService.loginOut().then();
      this.message.success('修改成功，请重新登录');
    });
  }

  showSearchModal(): void {
    const modalOptions: ModalOptions = {
      nzClosable: false,
      nzMaskClosable: true,
      nzStyle: {top: '48px'},
      nzFooter: null,
      nzBodyStyle: {padding: '0'}
    };
    this.searchRouteService.show(modalOptions)
  }

  goLogin(): void {
    this.loginOutService.loginOut().then();
  }

  clean(): void {
    this.windowServe.clearStorage();
    this.windowServe.clearSessionStorage();
    this.loginOutService.loginOut().then();
    this.message.success('清除成功，请重新登录');
  }

  showMessage(): void {
    this.message.info('切换成功')
  }

  goPage(path: string): void {
    this.router.navigateByUrl(`/default/personal/${path}`);
  }

  ngOnInit(): void {
  }

}
