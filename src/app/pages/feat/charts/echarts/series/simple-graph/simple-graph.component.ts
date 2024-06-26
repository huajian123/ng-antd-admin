import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-simple-graph',
  template: `
    <div class="demo-chart" echarts [options]="options"></div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgxEchartsModule]
})
export class SimpleGraphComponent {
  options: EChartsOption = {
    title: {
      text: 'Simple Graph'
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 60,
        roam: true,
        label: {
          // @ts-ignore
          normal: {
            show: true
          }
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          // @ts-ignore
          normal: {
            textStyle: {
              fontSize: 20
            }
          }
        },
        data: [
          {
            name: 'Node 1',
            x: 300,
            y: 300
          },
          {
            name: 'Node 2',
            x: 800,
            y: 300
          },
          {
            name: 'Node 3',
            x: 550,
            y: 100
          },
          {
            name: 'Node 4',
            x: 550,
            y: 500
          }
        ],
        // links: [],
        links: [
          {
            source: 0,
            target: 1,
            symbolSize: [5, 20],
            label: {
              // @ts-ignore
              normal: {
                show: true
              }
            },
            lineStyle: {
              // @ts-ignore
              normal: {
                width: 5,
                curveness: 0.2
              }
            }
          },
          {
            source: 'Node 2',
            target: 'Node 1',
            label: {
              // @ts-ignore
              normal: {
                show: true
              }
            },
            lineStyle: {
              // @ts-ignore
              normal: { curveness: 0.2 }
            }
          },
          {
            source: 'Node 1',
            target: 'Node 3'
          },
          {
            source: 'Node 2',
            target: 'Node 3'
          },
          {
            source: 'Node 2',
            target: 'Node 4'
          },
          {
            source: 'Node 1',
            target: 'Node 4'
          }
        ],
        lineStyle: {
          // @ts-ignore
          normal: {
            opacity: 0.9,
            width: 2,
            curveness: 0
          }
        }
      }
    ]
  };
}
