import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-keep-scroll-page',
  templateUrl: './keep-scroll-page.component.html',
  styleUrls: ['./keep-scroll-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzCardModule, NzGridModule]
})
export class KeepScrollPageComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '缓存滚动条',
    breadcrumb: ['首页', '拓展功能', '缓存滚动条'],
    desc: '搞了2天终于比较满意了,默认可以被复用的页面都会缓存滚动条。如果该页面设置为无法复用，则滚动条也不会缓存。如果需要某个可以复用的页面，不缓存滚动条，则在路由配置中设置needKeepScroll为no'
  };
}
