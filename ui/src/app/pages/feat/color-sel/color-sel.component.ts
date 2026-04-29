import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { ColorPickerDirective } from 'ngx-color-picker';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-color-sel',
  templateUrl: './color-sel.component.html',
  styleUrl: './color-sel.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, NzCardModule, NzGridModule, NzIconModule, ColorPickerDirective]
})
export class ColorSelComponent {
  color = '#2889e9';
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '颜色选择器',
    desc: '基于 ngx-color-picker，支持灰度模式、RGBA 输出、吸管工具等多种配置',
    breadcrumb: ['首页', '功能', '颜色选择器']
  };
}
