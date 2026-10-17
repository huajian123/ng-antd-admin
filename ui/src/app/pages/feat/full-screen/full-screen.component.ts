import { Component, inject } from '@angular/core';

import { FullscreenService } from '@core/services/common/fullscreen.service';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrl: './full-screen.component.less',

  imports: [PageHeaderComponent, NzCardModule, NzButtonModule, NzTagModule, NzIconModule]
})
export class FullScreenComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '全屏示例',
    breadcrumb: ['首页', '功能', '全屏示例']
  };

  private readonly fullscreenService = inject(FullscreenService);
  readonly isFullscreenFlag = this.fullscreenService.isFullscreen;

  toggle(): void {
    this.fullscreenService.toggle();
  }

  exitFull(): void {
    this.fullscreenService.exit();
  }

  intoDomFull(dom: HTMLDivElement): void {
    this.fullscreenService.request(dom);
  }

  intoFull(): void {
    this.fullscreenService.request();
  }
}
