import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';

import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-blingbling',
  imports: [PageHeaderComponent, NzCardComponent, NzIconModule],
  templateUrl: './blingbling.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './blingbling.component.less'
})
export class BlingblingComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Bling Bling 闪光效果',
    breadcrumb: ['首页', '组件', 'Bling Bling'],
    desc: '基于 CSS 渐变动画实现的扫光效果，适用于文字、卡片、头像等场景'
  };
}
