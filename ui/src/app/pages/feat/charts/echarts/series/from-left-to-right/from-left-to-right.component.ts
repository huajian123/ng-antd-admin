import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NgxEchartsModule } from 'ngx-echarts';
import * as util from 'zrender/lib/core/util';

@Component({
  selector: 'app-from-left-to-right',
  template: `
    <div class="demo-chart" echarts [options]="options | async"></div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgxEchartsModule, AsyncPipe]
})
export class FromLeftToRightComponent implements OnInit {
  // @ts-ignore
  options: Observable<NzSafeAny>;
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.options = this.http.get<NzSafeAny>('/data/flare.json', { responseType: 'json' }).pipe(
      map(data => {
        // @ts-ignore
        util.each(
          // @ts-ignore
          data.children,
          // @ts-ignore
          (datum: NzSafeAny, index: number) => index % 2 === 0 && (datum.collapsed = true)
        );
        return {
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          series: [
            {
              type: 'tree',
              data: [data],
              top: '1%',
              left: '7%',
              bottom: '1%',
              right: '20%',
              symbolSize: 7,
              label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 9
              },
              leaves: {
                label: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left'
                }
              },
              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750
            }
          ]
        };
      })
    );
  }
}
