import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Scene} from '@antv/l7';
import {GaodeMap} from '@antv/l7-maps';
import {Gauge} from '@antv/g2plot';


@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorComponent implements OnInit, AfterViewInit {
  deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  scene!: Scene;

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

  ngAfterViewInit(): void {


    setTimeout(() => {
      this.initDashBoard();
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
