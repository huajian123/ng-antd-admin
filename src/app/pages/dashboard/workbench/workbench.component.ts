import { DecimalPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, inject, NgZone, TemplateRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Radar } from '@antv/g2plot';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { WaterMarkComponent } from '@shared/components/water-mark/water-mark.component';
import { NumberLoopPipe } from '@shared/pipes/number-loop.pipe';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { inNextTick } from 'ng-zorro-antd/core/util';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    PageHeaderComponent,
    NzGridModule,
    WaterMarkComponent,
    NzCardModule,
    NzTypographyModule,
    NzListModule,
    NzButtonModule,
    NzWaveModule,
    NzIconModule,
    NzAvatarModule,
    NzStatisticModule,
    DecimalPipe,
    NumberLoopPipe
  ]
})
export class WorkbenchComponent implements AfterViewInit {
  @ViewChild('pageHeaderContent', { static: false }) pageHeaderContent!: TemplateRef<NzSafeAny>;
  destroyRef = inject(DestroyRef);
  radarData = [
    { item: 'Design', user: 'a', score: 70 },
    { item: 'Design', user: 'b', score: 30 },
    { item: 'Development', user: 'a', score: 60 },
    { item: 'Development', user: 'b', score: 70 },
    { item: 'Marketing', user: 'a', score: 50 },
    { item: 'Marketing', user: 'b', score: 60 },
    { item: 'Users', user: 'a', score: 40 },
    { item: 'Users', user: 'b', score: 50 },
    { item: 'Test', user: 'a', score: 60 },
    { item: 'Test', user: 'b', score: 70 },
    { item: 'Language', user: 'a', score: 70 },
    { item: 'Language', user: 'b', score: 50 },
    { item: 'Technology', user: 'a', score: 50 },
    { item: 'Technology', user: 'b', score: 40 },
    { item: 'Support', user: 'a', score: 30 },
    { item: 'Support', user: 'b', score: 40 },
    { item: 'Sales', user: 'a', score: 60 },
    { item: 'Sales', user: 'b', score: 40 },
    { item: 'UX', user: 'a', score: 50 },
    { item: 'UX', user: 'b', score: 60 }
  ];
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    desc: ''
  };
  private ngZone = inject(NgZone);
  msg = inject(NzMessageService);

  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: '工作台',
      breadcrumb: ['首页', 'Dashboard', '工作台'],
      desc: this.pageHeaderContent
    };
    inNextTick()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.initRadar();
      });
  }

  private initRadar(): void {
    this.ngZone.runOutsideAngular(() => {
      const radarPlot = new Radar('randar', {
        data: this.radarData,
        xField: 'item',
        yField: 'score',
        seriesField: 'user',
        meta: {
          score: {
            alias: '分数',
            min: 0,
            max: 80
          }
        },
        xAxis: {
          line: null,
          tickLine: null,
          grid: {
            line: {
              style: {
                lineDash: null
              }
            }
          }
        },
        // 开启辅助点
        point: {
          size: 2
        }
      });
      radarPlot.render();
    });
  }
}
