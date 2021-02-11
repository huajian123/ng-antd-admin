import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Scene} from '@antv/l7';
import {GaodeMap} from '@antv/l7-maps';
import {Gauge, TinyArea} from '@antv/g2plot';


@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorComponent implements OnInit, AfterViewInit {
  deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  scene!: Scene;
  miniAreaData =[
    264,
    274,
    284,
    294,
    300,
    310,
    320,
    330,
    340,
    350,
    360,
    370,
    380,
    390,
    400,
    410,
    420,
    430,
    440,
    450,
    460,
    470,
  ];

  constructor(private fb: FormBuilder) {
  }

  initDashBoard(): void {
    const gauge = new Gauge('dashBoard', {
      percent: 0.75,
      autoFit: true,
      height: 180,
      range: {
        color: '#30BF78',
      },
      indicator: {
        pointer: {
          style: {
            stroke: '#D0D0D0',
          },
        },
        pin: {
          style: {
            stroke: '#D0D0D0',
          },
        },
      },
      axis: {
        label: {
          formatter(v) {
            return Number(v) * 100;
          },
        },
        subTickLine: {
          count: 3,
        },
      },
      statistic: {
        content: {
          formatter: () => `87 %`,
        },
      },
    });
    gauge.render();
  }

  initArea(): void {
    const tinyArea = new TinyArea('miniArea', {
      height: 120,
      autoFit: true,
      data:this.miniAreaData,
      smooth: true,
      areaStyle: {
        fill: '#d6e3fd',
      },
      annotations: [
        // 平均值
        {
          type: 'line',
          start: ['min', 'mean'],
          end: ['max', 'mean'],
          text: {
            content: '400亿元',
            offsetY: -2,
            style: {
              textAlign: 'left',
              fontSize: 10,
             // fill: 'rgba(44, 53, 66, 0.45)',
              textBaseline: 'bottom',
            },
          },
          style: {
         //   stroke: 'rgba(0, 0, 0, 0.25)',
          },
        },
        // 目标值
        {
          type: 'line',
          start: ['min', 800],
          end: ['max', 800],
          text: {
            content: '1400亿元',
            offsetY: -2,
            style: {
              textAlign: 'left',
              fontSize: 10,
             // fill: 'rgba(44, 53, 66, 0.45)',
              textBaseline: 'bottom',
            },
          },
          style: {
           // stroke: 'rgba(0, 0, 0, 0.55)',
          },
        },
      ],
    });
    tinyArea.render();

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initDashBoard();
      this.initArea();
      // 地图
      const scene = new Scene({
        id: "map",
        logoPosition: 'bottomright',
        antialias: false,
        map: new GaodeMap({
          pitch: 0,
          style: "dark",
          center: [112, 23.69],
          zoom: 2.5
        })
      });
    });
  }

  ngOnInit() {

  }
}
