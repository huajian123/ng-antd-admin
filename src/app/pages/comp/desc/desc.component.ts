import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderType } from '@shared/components/page-header/page-header.component';

@Component({
  selector: 'app-desc',
  templateUrl: './desc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '详情组件示例',
    breadcrumb: ['首页', '组件', '详情组件'],
    desc: '一系列详情组件'
  };

  constructor() {}

  ngOnInit(): void {}
}
