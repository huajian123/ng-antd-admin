import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EChartsOption } from 'echarts';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { ThemeOption, NgxEchartsModule } from 'ngx-echarts';

import { CoolTheme } from './data';

@Component({
  selector: 'app-theme-charts',
  template: `
    <div class="m-b-20">
      <button class="m-r-8 m-b-8" nz-button nzType="default" (click)="theme = 'dark'">dark主题</button>
      <button class="m-r-8 m-b-8" nz-button nzType="default" (click)="theme = 'macarons'">macarons主题</button>
      <button class="m-r-8 m-b-8" nz-button nzType="default" (click)="theme = coolTheme">自定义主题</button>
    </div>
    <div class="demo-chart" echarts [options]="options" [theme]="theme"></div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzButtonModule, NzWaveModule, NgxEchartsModule]
})
export class ThemeChartsComponent {
  theme: string | ThemeOption = 'dark';
  coolTheme = CoolTheme;

  options: EChartsOption = {
    title: {
      text: "Nightingale's Rose Diagram",
      subtext: 'Mocking Data',
      // @ts-ignore
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      // @ts-ignore
      x: 'center',
      y: 'bottom',
      data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
    },
    calculable: true,
    series: [
      {
        name: 'area',
        type: 'pie',
        radius: [30, 110],
        roseType: 'area',
        data: [
          { value: 10, name: 'rose1' },
          { value: 5, name: 'rose2' },
          { value: 15, name: 'rose3' },
          { value: 25, name: 'rose4' },
          { value: 20, name: 'rose5' },
          { value: 35, name: 'rose6' },
          { value: 30, name: 'rose7' },
          { value: 40, name: 'rose8' }
        ]
      }
    ]
  };
}
