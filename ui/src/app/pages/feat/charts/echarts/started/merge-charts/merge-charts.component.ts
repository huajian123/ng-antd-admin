import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, inject } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-merge-charts',
  template: `
    <div class="demo-chart" echarts [merge]="updateOptions" [options]="options"></div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgxEchartsModule]
})
export class MergeChartsComponent implements OnInit, OnDestroy {
  options: NzSafeAny;
  updateOptions: NzSafeAny;

  private oneDay = 24 * 3600 * 1000;
  private now: Date | undefined;
  private value: number | undefined;
  private data: NzSafeAny[] = [];
  private timer: NzSafeAny;

  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // generate some random testing data:
    this.data = [];
    this.now = new Date(1997, 9, 3);
    this.value = Math.random() * 1000;

    for (let i = 0; i < 1000; i++) {
      this.data.push(this.randomData());
    }

    // initialize chart options:
    this.options = {
      title: {
        text: 'Dynamic Data + Time Axis'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: NzSafeAny[]) => {
          params = params[0];
          // @ts-ignore
          const date = new Date(params.name);
          // @ts-ignore
          return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} : ${params.value[1]}`;
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: 'Mocking Data',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.data
        }
      ]
    };

    // Mock dynamic data:
    this.timer = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        this.data.shift();
        this.data.push(this.randomData());
      }

      // update series data:
      this.updateOptions = {
        series: [
          {
            data: this.data
          }
        ]
      };
      this.cdr.detectChanges();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  randomData(): { name: string; value: Array<string | number> } {
    // @ts-ignore
    this.now = new Date(this.now.getTime() + this.oneDay);
    // @ts-ignore
    this.value = this.value + Math.random() * 21 - 10;
    return {
      name: this.now.toString(),
      value: [[this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'), Math.round(this.value)]
    };
  }
}
