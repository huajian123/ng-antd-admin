import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzCardComponent } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-blingbling',
  standalone: true,
  imports: [PageHeaderComponent, NzCardComponent, NgOptimizedImage],
  templateUrl: './blingbling.component.html',
  styleUrl: './blingbling.component.less'
})
export class BlingblingComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '不灵不灵',
    breadcrumb: ['首页', '组件', 'blingbling'],
    desc: '抄了一个样式 https://mp.weixin.qq.com/s/CaMKgC4EwBGkmsGK9yh0hA'
  };
}
