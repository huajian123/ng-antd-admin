import { Component, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import AMapLoader from '@amap/amap-jsapi-loader';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { WaterMarkComponent } from '@shared/components/water-mark/water-mark.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-gaode-map',
  templateUrl: './gaode-map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzCardModule, WaterMarkComponent, NzInputModule, FormsModule]
})
export class GaodeMapComponent implements AfterViewInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '高德地图，可不要暴露行踪了哟',
    breadcrumb: ['首页', '功能', '图表', '高德地图']
  };
  marker: [number, number] = [116.437253, 39.935033];
  markerPosition: string = this.marker.join(',');

  private cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    // api地址
    // https://lbs.amap.com/demo/javascript-api/example/map-lifecycle/map-show
    // 自己去申请一个key，别用我这个Key，多谢
    // 申请地址 https://console.amap.com/dev/key/app
    AMapLoader.load({
      key: '1c1b77fae2e59c25eb26ced9a0801103', //首次load必填
      version: '1.4.15',
      AMapUI: {
        version: '1.1',
        plugins: ['overlay/SimpleMarker']
      }
    })
      .then(AMap => {
        const map = new AMap.Map('container', {
          resizeEnable: true,
          zoom: 11,
          center: [116.397428, 39.90923]
        });

        const marker = new AMap.Marker({
          position: new AMap.LngLat(this.marker[0], this.marker[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          /*  title: '南京',*/
          draggable: true
        });
        marker.on('dragend', () => {
          this.marker = [marker.getPosition()['R'], marker.getPosition()['Q']];
          this.markerPosition = this.marker.join(',');
          this.cdr.markForCheck();
          console.log(this.markerPosition);
        });
        marker.setMap(map);
      })
      .catch(e => {
        console.error(e);
      });
  }
}
