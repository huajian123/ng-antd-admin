
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { ViewTransitionDirective } from '@shared/directives/view-transition.directive';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { TECH_ITEMS, TechItem } from './transitions';
import { NzCardComponent } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-transitions-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, RouterLink, ViewTransitionDirective, NzButtonModule, NzIconModule, NzTagModule, NzGridModule, NzCardComponent],
  templateUrl: './transitions-detail.html',
  styleUrl: './transitions.less'
})
export class TransitionsDetail {
  readonly id = input<string>();

  readonly item = computed(() => {
    const id = Number(this.id());
    return TECH_ITEMS.find((i: TechItem) => i.id === id) ?? TECH_ITEMS[0];
  });

  readonly pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'View Transition API',
    breadcrumb: ['首页', '功能', 'View Transition API', '详情'],
    desc: '共享元素从列表页平滑过渡到此详情页。'
  };
}
