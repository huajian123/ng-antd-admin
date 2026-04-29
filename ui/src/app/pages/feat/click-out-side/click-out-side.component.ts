import { Component, ChangeDetectionStrategy, AfterViewInit, ElementRef, inject, DestroyRef, viewChild, DOCUMENT, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, merge, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { fnStopMouseEvent } from '@utils/tools';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-click-out-side',
  templateUrl: './click-out-side.component.html',
  styleUrl: './click-out-side.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, NzCardModule, NzIconModule]
})
export class ClickOutSideComponent implements AfterViewInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '点击区域检测',
    breadcrumb: ['首页', '功能', 'clickOutSide'],
    desc: '通过监听 document click 与目标元素 click 的冒泡差异，区分点击内部与外部'
  };
  destroyRef = inject(DestroyRef);
  text = signal('点击内部或者外部');
  winClick$!: Observable<Event>; // 绑定window的click事件
  readonly targetHtml = viewChild.required<ElementRef>('targetHtml');
  targetHtmlClick$!: Observable<NzSafeAny>;

  private doc = inject(DOCUMENT);

  ngAfterViewInit(): void {
    this.targetHtmlClick$ = fromEvent(this.targetHtml().nativeElement, 'click').pipe(
      tap(e => {
        fnStopMouseEvent(e as MouseEvent);
        this.text.set('刀斩肉身');
      })
    );
    this.winClick$ = fromEvent(this.doc, 'click').pipe(
      tap(() => {
        this.text.set('心斩灵魂');
      })
    );
    merge(this.targetHtmlClick$, this.winClick$)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
