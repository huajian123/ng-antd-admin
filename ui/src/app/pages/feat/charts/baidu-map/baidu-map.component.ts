import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';

import { LazyService } from '@core/services/common/lazy.service';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

declare let BMap: NzSafeAny;
@Component({
  selector: 'app-baidu-map',
  templateUrl: './baidu-map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzCardModule]
})
export class BaiduMapComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '百度地图，可不要暴露行踪了哟',
    breadcrumb: ['首页', '功能', '图表', '百度地图']
  };
  private lazyService = inject(LazyService);

  ngOnInit(): void {
    this.lazyService.loadScript('http://api.map.baidu.com/getscript?v=2.0&ak=RD5HkkjTa6uAIDpw7GRFtR83Fk7Wdk0j').then(() => {
      const map = new BMap.Map('map'); //创建地图实例
      const point = new BMap.Point(116.404, 39.915); //创建点坐标
      map.centerAndZoom(point, 15); //初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    });
  }
}
