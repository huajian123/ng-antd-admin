import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { EChartsOption } from 'echarts/types/dist/echarts';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-instance-opts-charts',
  template: `
    <div class="m-b-20">
      <button class="m-r-8 m-b-8" (click)="callMethod('getWidth')" nz-button nzType="default">getWidth()</button>
      <button class="m-r-8 m-b-8" (click)="callMethod('getHeight')" nz-button nzType="default">getHeight()</button>
      <button class="m-r-8 m-b-8" (click)="callMethod('getDom')" nz-button nzType="default">getDom()</button>
      <button class="m-r-8 m-b-8" (click)="callMethod('getOption')" nz-button nzType="default">getOption()</button>
      <button class="m-r-8 m-b-8" (click)="callMethod('clear')" nz-button nzType="default">clear()</button>
    </div>
    <div echarts (chartInit)="onChartInit($event)" [options]="options" class="demo-chart"></div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstanceOptsChartsComponent {
  chartInstance: any;

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

  constructor(private msg: NzMessageService) {}

  onChartInit(e: any): void {
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
