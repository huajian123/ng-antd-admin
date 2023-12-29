import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import screenfull from 'screenfull';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzCardModule, NzSpaceModule, NzButtonModule, NzWaveModule]
})
export class FullScreenComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '全屏示例',
    breadcrumb: ['首页', '功能', '全屏示例']
  };

  isFullscreenFlag = true;

  private cdr = inject(ChangeDetectorRef);

  toggle(): void {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

  exitFull(): void {
    if (screenfull.isEnabled) {
      screenfull.exit();
    }
  }

  intoDomFull(dom: HTMLDivElement): void {
    if (screenfull.isEnabled) {
      screenfull.request(dom);
    }
  }

  intoFull(): void {
    if (screenfull.isEnabled) {
      screenfull.request();
    }
  }

  ngOnInit(): void {
    screenfull.onchange(() => {
      setTimeout(() => {
        this.isFullscreenFlag = !this.isFullscreenFlag;
        this.cdr.markForCheck();
      }, 10);
    });
  }
}
