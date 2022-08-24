import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as echarts from 'echarts';
@Component({
  selector: 'app-radial-tree',
  template: ` <div echarts [options]="options | async" class="demo-chart"></div> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadialTreeComponent implements OnInit {
  // @ts-ignore
  options: Observable<any>;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.options = this.http.get<any>('assets/data/flare.json', { responseType: 'json' }).pipe(
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
