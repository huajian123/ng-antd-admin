import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "@core/services/common/window.service";
import {SearchRouteService} from "@widget/common-widget/search-route/search-route.service";
import {ModalOptions} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {LockWidgetService} from "@widget/common-widget/lock-widget/lock-widget.service";
import {LoginOutService} from "@core/services/common/login-out.service";

@Component({
  selector: 'app-layout-head-right-menu',
  templateUrl: './layout-head-right-menu.component.html',
  styleUrls: ['./layout-head-right-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutHeadRightMenuComponent implements OnInit {

  constructor(private router: Router,
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
    }).subscribe(res => {
      console.log(res);
    })
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

  showMessage(): void {
    this.message.info('切换成功')
  }

  goPage(path: string): void {
    this.router.navigateByUrl(`/default/personal/${path}`);
  }

  ngOnInit(): void {
  }

}
