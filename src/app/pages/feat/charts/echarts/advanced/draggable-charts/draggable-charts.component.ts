import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { EChartsOption } from 'echarts/types/dist/echarts';
import * as util from 'zrender/lib/core/util';

const SymbolSize = 20;
const Data = [
  [15, 0],
  [-50, 10],
  [-56.5, 20],
  [-46.5, 30],
  [-22.1, 40]
];

@Component({
  selector: 'app-draggable-charts',
  template: ` <div echarts (chartInit)="onChartReady($event)" [options]="options" style="height: 600px;"></div> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableChartsComponent implements OnDestroy {
  updatePosition: (() => void) | undefined;

  options: EChartsOption = {
    title: {
      text: 'Try Dragging these Points'
    },
    // @ts-ignore
    tooltip: {
      triggerOn: 'none',
      formatter: (params: { data: number[] }) => `X: ${params.data[0].toFixed(2)}<br>Y: ${params.data[1].toFixed(2)}`
    },
    grid: {},
    xAxis: {
      min: -100,
      max: 80,
      type: 'value',
      axisLine: { onZero: false }
    },
    yAxis: {
      min: -30,
      max: 60,
      type: 'value',
      axisLine: { onZero: false }
    },
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'empty'
      },
      {
        type: 'slider',
        yAxisIndex: 0,
        filterMode: 'empty'
      },
      {
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'empty'
      },
      {
        type: 'inside',
        yAxisIndex: 0,
        filterMode: 'empty'
      }
    ],
    series: [
      {
        id: 'a',
        type: 'line',
        smooth: true,
        symbolSize: SymbolSize,
        data: Data
      }
    ]
  };

  constructor() {}

  ngOnDestroy(): void {
    if (this.updatePosition) {
      window.removeEventListener('resize', this.updatePosition);
    }
  }

  onChartReady(myChart: any): void {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const onPointDragging = function (dataIndex: string | number) {
      // @ts-ignore
      Data[dataIndex] = myChart.convertFromPixel({ gridIndex: 0 }, this.position) as number[];

      // Update data
      myChart.setOption({
        series: [
          {
            id: 'a',
            data: Data
          }
        ]
      });
    };

    const showTooltip = (dataIndex: any): void => {
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex
      });
    };

    const hideTooltip = (): void => {
      myChart.dispatchAction({
        type: 'hideTip'
      });
    };

    const updatePosition = (): void => {
      myChart.setOption({
        graphic: util.map(Data, item => ({
          position: myChart.convertToPixel({ gridIndex: 0 }, item)
        }))
      });
    };

    window.addEventListener('resize', updatePosition);
    myChart.on('dataZoom', updatePosition);

    // save handler and remove it on destroy
    this.updatePosition = updatePosition;

    setTimeout((): void => {
      myChart.setOption({
        graphic: util.map(Data, (item, dataIndex) => {
          return {
            type: 'circle',
            position: myChart.convertToPixel({ gridIndex: 0 }, item),
            shape: {
              cx: 0,
              cy: 0,
              r: SymbolSize / 2
            },
            invisible: true,
            draggable: true,
            // @ts-ignore
            ondrag: util.curry<(dataIndex: any) => void, number>(onPointDragging, dataIndex),
            // @ts-ignore
            onmousemove: util.curry<(dataIndex: any) => void, number>(showTooltip, dataIndex),
            // @ts-ignore
            onmouseout: util.curry<(dataIndex: any) => void, number>(hideTooltip, dataIndex),
            z: 100
          };
        })
      });
    }, 0);
  }
}
