import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
  ViewChild,
  AfterViewInit, ElementRef
} from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";
import {DOCUMENT} from "@angular/common";
import {fromEvent, merge, Observable} from "rxjs";
import {fnStopMouseEvent} from "@utils/tools";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-click-out-side',
  templateUrl: './click-out-side.component.html',
  styleUrls: ['./click-out-side.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClickOutSideComponent implements OnInit, AfterViewInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '点内外部触发事件，点一点总会有好运',
    breadcrumb: ['首页', '功能', 'ClickOutSide'],
  };
  text: string = '点击内部或者外部';
  winClick$!: Observable<Event>; // 绑定window的click事件
  @ViewChild('targetHtml') targetHtml!: ElementRef;
  targetHtmlClick$!: Observable<any>;

  constructor(private cdr: ChangeDetectorRef, @Inject(DOCUMENT) private doc: Document) {
  }

  ngAfterViewInit(): void {
    this.targetHtmlClick$ = fromEvent(this.targetHtml.nativeElement, 'click').pipe(tap(e => {
      fnStopMouseEvent(<MouseEvent>e);
      this.text = '刀斩肉身';
    }));
    this.winClick$ = fromEvent(this.doc, 'click').pipe(tap(() => {
      this.text = '心斩灵魂'
    }));
    merge(this.targetHtmlClick$, this.winClick$).subscribe(res => {
        this.cdr.markForCheck();
    })
  }

  ngOnInit(): void {
  }

}
