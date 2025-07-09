import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { ColorPickerDirective } from 'ngx-color-picker';

import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-color-sel',
  templateUrl: './color-sel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, NzCardModule, ColorPickerDirective]
})
export class ColorSelComponent {
  public color = '#2889e9';
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '我突然想到了“你却说花花世界不必当真”这句歌词',
    desc: '也可以选择：https://zefoy.github.io/ngx-color-picker/ 示例代码在v20之前都有提供',
    breadcrumb: ['首页', '功能', '颜色选择器']
  };
}
