import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { HeavyCard } from './heavy-card';

@Component({
  selector: 'app-lazy-defer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, HeavyCard, NzCardModule, NzGridModule, NzButtonModule, NzSpinModule],
  templateUrl: './lazy-defer.html',
  styleUrl: './lazy-defer.less'
})
export class LazyDefer {
  readonly pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Deferrable Views (@defer)',
    breadcrumb: ['首页', '组件', '懒加载', '@defer'],
    desc: '@defer 块将组件推迟到满足触发条件时才加载，有效减少首屏 JS 体积，提升 LCP 性能。'
  };

  readonly showWhen = signal(false);
}
