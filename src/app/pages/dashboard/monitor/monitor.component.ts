import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Scene} from '@antv/l7';
import {GaodeMap} from '@antv/l7-maps';


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

  ngAfterViewInit(): void {
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
  }

  ngOnInit() {

  }
}
