import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderType } from '@shared/components/page-header/page-header.component';

@Component({
  selector: 'app-strength-meter',
  templateUrl: './strength-meter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StrengthMeterComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '密码强度校验组件',
    breadcrumb: ['首页', '组件', '密码强度校验组件'],
    desc: '看看你密码强度够不够'
  };
  passwordVisible = false;
  newPassword!: string;

  constructor() {}

  ngOnInit(): void {}
}
