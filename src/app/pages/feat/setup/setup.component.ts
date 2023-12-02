import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { DriverService } from '@core/services/common/driver.service';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzButtonModule, NzWaveModule]
})
export class SetupComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '引导页',
    breadcrumb: ['首页', '引导页'],
    desc: '用于给用户的指引操作'
  };

  private driverService = inject(DriverService);

  go(): void {
    this.driverService.load();
  }
}
