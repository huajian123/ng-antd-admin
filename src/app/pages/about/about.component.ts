import { DatePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { DateFormat } from '@shared/pipes/map.pipe';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzCardModule, NzDescriptionsModule, NzTagModule, DatePipe]
})
export class AboutComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '关于',
    breadcrumb: ['首页', '拓展功能', '关于'],
    desc: 'ng-antd-admin 是一个基于Angular和ng-zorro的后台解决方案，目标是为中大型项目开发，提供现成的开箱解决方案以及丰富的示例，不限制任何代码用于商用'
  };
  data = new Date();
  dateFormat = DateFormat.DateTime;
}
