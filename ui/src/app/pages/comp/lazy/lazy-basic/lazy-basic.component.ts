import { Component, ChangeDetectionStrategy, AfterViewInit, inject, viewChild } from '@angular/core';

import { LazyServiceService } from '@app/pages/comp/lazy/lazy-service.service';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { AdDirective } from '@shared/directives/ad.directive';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

@Component({
  selector: 'app-lazy-basic',
  templateUrl: './lazy-basic.component.html',
  styleUrls: ['./lazy-basic.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LazyServiceService],
  imports: [PageHeaderComponent, NzButtonModule, NzWaveModule, AdDirective]
})
export class LazyBasicComponent implements AfterViewInit {
  lazyServiceService = inject(LazyServiceService);
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '懒加载组件示例',
    breadcrumb: ['首页', '组件', '懒加载组件'],
    desc: '懒加载组件,我不再喜欢明星'
  };
  readonly adHost = viewChild.required(AdDirective);
  isStarted = false;

  ngAfterViewInit(): void {
    this.lazyServiceService.adHost = this.adHost();
  }
}
