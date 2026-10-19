import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ScreenLessHiddenDirective } from '@shared/directives/screen-less-hidden.directive';
import { NumberLoopPipe } from '@shared/pipes/number-loop.pipe';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

interface DataItem {
  name: string;
  chinese: number;
  math: number;
  english: number;
}

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.less',

  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzBreadCrumbModule,
    NzGridModule,
    NzIconModule,
    NzButtonModule,
    NzTooltipModule,
    NzDividerModule,
    NzTabsModule,
    NzTagModule,
    NzBadgeModule,
    NzRadioModule,
    NzRateModule,
    NzDatePickerModule,
    NzTypographyModule,
    NzTableModule,
    NzStatisticModule,
    NzProgressModule,
    NzListModule,
    NzDescriptionsModule,
    NumberLoopPipe,
    ScreenLessHiddenDirective
  ]
})
export class AnalysisComponent {
  readonly cardPadding = { padding: '20px 24px 8px' };
  histogramData = [
    { type: '1月', value: 769 },
    { type: '2月', value: 769 },
    { type: '3月', value: 861 },
    { type: '4月', value: 442 },
    { type: '5月', value: 555 },
    { type: '6月', value: 439 }
  ];
  ringData = [
    { type: '分类一', value: 27 },
    { type: '分类二', value: 25 },
    { type: '分类三', value: 18 },
    { type: '分类四', value: 15 },
    { type: '分类五', value: 10 },
    { type: '分类六', value: 25 },
    { type: '分类七', value: 18 },
    { type: '其他', value: 5 }
  ];

  listOfColumn = [
    {
      title: '排名',
      compare: null,
      priority: false
    },
    {
      title: '搜索关键词',
      compare: (a: DataItem, b: DataItem) => a.chinese - b.chinese,
      priority: 3
    },
    {
      title: '用户数',
      compare: (a: DataItem, b: DataItem) => a.math - b.math,
      priority: 2
    },
    {
      title: '周涨幅',
      compare: (a: DataItem, b: DataItem) => a.english - b.english,
      priority: 1
    }
  ];
  listOfData: DataItem[] = [
    {
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70
    },
    {
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70
    },
    {
      name: 'Jim Green',
      chinese: 98,
      math: 66,
      english: 89
    },
    {
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70
    },
    {
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89
    }
  ];
  constructor() {}

  // 为环图项目获取颜色
  getColorForItem(item: any): string {
    const colors = ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E8684A', '#6DC8EC'];
    const index = this.ringData.indexOf(item);
    return colors[index % colors.length];
  }
}
