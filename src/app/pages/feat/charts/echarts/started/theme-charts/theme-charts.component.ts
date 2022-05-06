import {Component, ChangeDetectionStrategy} from '@angular/core';
import {EChartsOption} from 'echarts/types/dist/echarts';
import {ThemeOption} from "ngx-echarts";
import {CoolTheme} from './data';

@Component({
  selector: 'app-theme-charts',
  template: `
    <div class="m-b-20" >
      <button class="m-r-8" (click)="theme='dark'" nz-button nzType="default">dark主题</button>
      <button class="m-r-8" (click)="theme='macarons'" nz-button nzType="default">macarons主题</button>
      <button class="m-r-8" (click)="theme=coolTheme" nz-button nzType="default">自定义主题</button>
    </div>
    <div echarts [options]="options" [theme]="theme" class="demo-chart"></div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeChartsComponent {
  theme: string | ThemeOption='dark';
  coolTheme = CoolTheme;

  options: EChartsOption = {
    title: {
      text: 'Nightingale\'s Rose Diagram',
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
          {value: 10, name: 'rose1'},
          {value: 5, name: 'rose2'},
          {value: 15, name: 'rose3'},
          {value: 25, name: 'rose4'},
          {value: 20, name: 'rose5'},
          {value: 35, name: 'rose6'},
          {value: 30, name: 'rose7'},
          {value: 40, name: 'rose8'}
        ]
      }
    ]
  };
}
