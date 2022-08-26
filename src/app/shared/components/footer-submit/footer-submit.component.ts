import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef, Renderer2, ElementRef } from '@angular/core';
import { merge } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { DestroyService } from '@core/services/common/destory.service';
import { Menu } from '@core/services/types';
import { SplitNavStoreService } from '@store/common-store/split-nav-store.service';
import { ThemeService } from '@store/common-store/theme.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-footer-submit',
  templateUrl: './footer-submit.component.html',
  styleUrls: ['./footer-submit.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class FooterSubmitComponent implements OnInit {
  @Input() leftTpl!: TemplateRef<NzSafeAny>;
  themesOptions$ = this.themesService.getThemesMode();
  isNightTheme$ = this.themesService.getIsNightTheme();
  isCollapsed$ = this.themesService.getIsCollapsed();
  isOverMode$ = this.themesService.getIsOverMode();
  leftMenuArray$ = this.splitNavStoreService.getSplitLeftNavArrayStore();
  isCollapsed = false;
  isOverMode = false;
  hasLeftNav = false;
  isTopMode = false;
  leftMenuArray: Menu[] = [];
  isMixMode = false;

  constructor(private destroy$: DestroyService, private splitNavStoreService: SplitNavStoreService, private themesService: ThemeService, private rd2: Renderer2, private el: ElementRef) {}

  setWidth(width: number): void {
    const dom = this.el.nativeElement.querySelector('.ant-pro-footer-bar');
    this.rd2.setStyle(dom, 'width', `calc(100% - ${width}px)`);
  }

  subTheme(): void {
    const sub1$ = this.themesOptions$.pipe(
      tap(themesOptions => {
        this.hasLeftNav = themesOptions.hasNavArea;
        this.isTopMode = themesOptions.mode === 'top';
        this.isMixMode = themesOptions.mode === 'mixi';
      })
    );
    const sub2$ = this.isCollapsed$.pipe(
      tap(isCollapsed => {
        this.isCollapsed = isCollapsed;
      })
    );
    const sub3$ = this.isOverMode$.pipe(
      tap(res => {
        this.isOverMode = res;
      })
    );
    const sub4$ = this.leftMenuArray$.pipe(
      tap(res => {
        this.leftMenuArray = res;
      })
    );
    merge(sub1$, sub2$, sub3$, sub4$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.isOverMode || this.isTopMode || (this.isMixMode && !this.leftMenuArray)) {
          this.setWidth(0);
        } else {
          let width = 0;
          if (this.hasLeftNav) {
            width = this.isCollapsed ? 48 : 208;
          }
          this.setWidth(width);
        }
      });
  }

  ngOnInit(): void {
    this.subTheme();
  }
}
