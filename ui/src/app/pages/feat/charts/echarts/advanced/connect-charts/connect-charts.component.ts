import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';

import { getInstanceByDom, connect, EChartsOption } from 'echarts';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-connect-charts',
  template: `
    <div nz-row>
      <div nz-col nzSpan="12">
        <h5>id=chart1</h5>
        <div id="chart1" class="demo-chart" echarts theme="macarons" [options]="options"></div>
      </div>
      <div nz-col nzSpan="12">
        <h5>id=chart2</h5>
        <div id="chart2" class="demo-chart" echarts theme="macarons" [options]="options"></div>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzGridModule, NgxEchartsModule]
})
export class ConnectChartsComponent implements AfterViewInit {
  options: EChartsOption = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Counters',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      const chartElement1 = document.getElementById('chart1');
      const chartElement2 = document.getElementById('chart2');
      const chart1 = getInstanceByDom(chartElement1!);
      const chart2 = getInstanceByDom(chartElement2!);
      connect([chart1!, chart2!]);
    });
  }
}
