import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NgxEchartsModule } from 'ngx-echarts';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
@Component({
  selector: 'app-radial-tree',
  template: ` <div class="demo-chart" echarts [options]="options | async"></div> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxEchartsModule, AsyncPipe]
})
export class RadialTreeComponent implements OnInit {
  // @ts-ignore
  options: Observable<NzSafeAny>;
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.options = this.http.get<NzSafeAny>('/data/flare.json', { responseType: 'json' }).pipe(
      map(data => ({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            data: [data],
            top: '18%',
            bottom: '14%',
            layout: 'radial',
            symbol: 'emptyCircle',
            symbolSize: 7,
            initialTreeDepth: 3,
            animationDurationUpdate: 750
          }
        ]
      }))
    );
  }
}
