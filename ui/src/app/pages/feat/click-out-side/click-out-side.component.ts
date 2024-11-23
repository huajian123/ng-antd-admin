import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, AfterViewInit, ElementRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, merge, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { fnStopMouseEvent } from '@utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-click-out-side',
  templateUrl: './click-out-side.component.html',
  styleUrls: ['./click-out-side.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent]
})
export class ClickOutSideComponent implements AfterViewInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '点内外部触发事件，点一点总会有好运',
    breadcrumb: ['首页', '功能', 'ClickOutSide']
  };
  destroyRef = inject(DestroyRef);
  text = '点击内部或者外部';
  winClick$!: Observable<Event>; // 绑定window的click事件
  @ViewChild('targetHtml') targetHtml!: ElementRef;
  targetHtmlClick$!: Observable<NzSafeAny>;

  private cdr = inject(ChangeDetectorRef);
  private doc = inject(DOCUMENT);

  ngAfterViewInit(): void {
    this.targetHtmlClick$ = fromEvent(this.targetHtml.nativeElement, 'click').pipe(
      tap(e => {
        fnStopMouseEvent(e as MouseEvent);
        this.text = '刀斩肉身';
      })
    );
    this.winClick$ = fromEvent(this.doc, 'click').pipe(
      tap(() => {
        this.text = '心斩灵魂';
      })
    );
    merge(this.targetHtmlClick$, this.winClick$)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }
}
