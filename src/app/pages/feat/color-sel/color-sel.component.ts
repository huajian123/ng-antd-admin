import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderType } from '@shared/components/page-header/page-header.component';

@Component({
  selector: 'app-color-sel',
  templateUrl: './color-sel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorSelComponent implements OnInit {
  public color: string = '#2889e9';
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '我突然想到了“你却说花花世界不必当真”这句歌词',
    desc: '所有示例：https://zefoy.github.io/ngx-color-picker/',
    breadcrumb: ['首页', '功能', '颜色选择器']
  };
  constructor() {}

  ngOnInit(): void {}
}
