import { Component, OnInit, ChangeDetectionStrategy, inject, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import screenfull from 'screenfull';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, NzCardModule, NzSpaceModule, NzButtonModule, NzWaveModule]
})
export class FullScreenComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '全屏示例',
    breadcrumb: ['首页', '功能', '全屏示例']
  };

  isFullscreenFlag = signal(true);
  destroyRef = inject(DestroyRef);

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
      // Use RxJS timer instead of setTimeout
      timer(10).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.isFullscreenFlag.update(v => !v);
        // Signal automatically triggers change detection
      });
    });
  }
}
