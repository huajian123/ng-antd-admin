import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { EChartsOption } from 'echarts';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-instance-opts-charts',
  template: `
    <div class="m-b-20">
      <button class="m-r-8 m-b-8" nz-button nzType="default" (click)="callMethod('getWidth')">getWidth()</button>
      <button class="m-r-8 m-b-8" nz-button nzType="default" (click)="callMethod('getHeight')">getHeight()</button>
      <button class="m-r-8 m-b-8" nz-button nzType="default" (click)="callMethod('getDom')">getDom()</button>
      <button class="m-r-8 m-b-8" nz-button nzType="default" (click)="callMethod('getOption')">getOption()</button>
      <button class="m-r-8 m-b-8" nz-button nzType="default" (click)="callMethod('clear')">clear()</button>
    </div>
    <div class="demo-chart" echarts [options]="options" (chartInit)="onChartInit($event)"></div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzButtonModule, NzWaveModule, NgxEchartsModule]
})
export class InstanceOptsChartsComponent {
  private msg = inject(NzMessageService);

  chartInstance: NzSafeAny;

  options: EChartsOption = {
    backgroundColor: '#2c343c',
    title: {
      text: 'Customized Pie',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series: [
      {
        name: 'Counters',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
          { value: 335, name: 'C-1' },
          { value: 310, name: 'C-2' },
          { value: 274, name: 'C-3' },
          { value: 235, name: 'C-4' },
          { value: 400, name: 'C-5' }
        ].sort((a, b) => a.value - b.value),
        roseType: 'radius',
        label: {
          // @ts-ignore
          normal: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            }
          }
        },
        labelLine: {
          // @ts-ignore
          normal: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        itemStyle: {
          // @ts-ignore
          normal: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: () => Math.random() * 200
      }
    ]
  };

  onChartInit(e: NzSafeAny): void {
    this.chartInstance = e;
    console.log('on chart init:', e);
  }

  callMethod(type: string): void {
    if (this.chartInstance) {
      const result = this.chartInstance[type]();
      this.msg.info(`${type}(): ${result || 'void'}`);
      console.log(result);
    }
  }
}
