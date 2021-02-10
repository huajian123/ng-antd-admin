import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Scene, Marker, MarkerLayer} from '@antv/l7';
import {GaodeMap} from '@antv/l7-maps';
import {mapData} from '../../../configs/constant';


@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorComponent implements OnInit, AfterViewInit {
  deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  scene!: Scene;

  getColor(v: any): any {
    const colors = ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#005a32'];
    return v > 50
      ? colors[7]
      : v > 40
        ? colors[6]
        : v > 30
          ? colors[5]
          : v > 20
            ? colors[4]
            : v > 10
              ? colors[3]
              : v > 5
                ? colors[2]
                : v > 0
                  ? colors[1]
                  : colors[0];
  }

  addMarkers(): any {

  }

  constructor(private fb: FormBuilder) {
  }

  ngAfterViewInit(): void {
    this.scene.on('loaded', () => {
      this.addMarkers();
      this.scene.render();
    });

    this.initMap();
    }

  ngOnInit(): void {
    this.scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        style: 'light',
        center: [105.790327, 36.495636],
        pitch: 0,
        zoom: 4
      })
    });
  }

  private initMap(): void {
    const markerLayer = new MarkerLayer();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < mapData.length; i++) {
      if (mapData[i].g !== '1' || mapData[i].v === '') {
        continue;
      }
      const el = document.createElement('label');
      el.className = 'labelclass';
      el.textContent = mapData[i].v + '℃';
      el.style.background = this.getColor(mapData[i].v);
      el.style.borderColor = this.getColor(mapData[i].v);
      const marker = new Marker({
        element: el
      }).setLnglat({lng: Number(mapData[i].x), lat: Number(mapData[i].y)});
      markerLayer.addMarker(marker);
    }
    this.scene.addMarkerLayer(markerLayer);
  }
}
