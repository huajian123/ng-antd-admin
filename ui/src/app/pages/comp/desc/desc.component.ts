import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-desc',
  templateUrl: './desc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzGridModule, NzCardModule, NzDescriptionsModule, NzToolTipModule, NzIconModule, NzButtonModule]
})
export class DescComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '详情组件示例',
    breadcrumb: ['首页', '组件', '详情组件'],
    desc: '一系列详情组件'
  };
}
