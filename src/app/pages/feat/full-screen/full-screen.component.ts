import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { PageHeaderType } from '@shared/components/page-header/page-header.component';
import screenfull from 'screenfull';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullScreenComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '全屏示例',
    breadcrumb: ['首页', '功能', '全屏示例']
  };

  isFullscreenFlag = true;

  constructor(private cdr: ChangeDetectorRef) {}

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
