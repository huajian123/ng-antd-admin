import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-desc',
    templateUrl: './desc.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [PageHeaderComponent, NzGridModule, NzCardModule, NzDescriptionsModule, NzToolTipModule, NzIconModule, NzButtonModule]
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
