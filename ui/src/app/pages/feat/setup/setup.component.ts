import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { DriverService } from '@core/services/common/driver.service';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, NzButtonModule, NzCardModule, NzIconModule]
})
export class SetupComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '引导页',
    breadcrumb: ['首页', '功能', '引导页'],
    desc: '用于给用户的指引操作'
  };

  private driverService = inject(DriverService);

  go(): void {
    this.driverService.load();
  }
}
