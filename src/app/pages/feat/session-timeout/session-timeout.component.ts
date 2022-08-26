import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ExampleService } from '@services/example/example.service';
import { PageHeaderType } from '@shared/components/page-header/page-header.component';

@Component({
  selector: 'app-session-timeout',
  templateUrl: './session-timeout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionTimeoutComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '登录过期',
    breadcrumb: ['首页', '功能', '登录过期'],
    desc: '用户登录过期示例。如果redis超时了，则重新弹出登录框，登录成功则将原先的接口重新发送，' + '登录失败，则跳转到登录页面。'
  };

  constructor(private dataService: ExampleService) {}

  go(): void {
    this.dataService.sessionTimeOut().subscribe();
  }

  ngOnInit(): void {}
}
