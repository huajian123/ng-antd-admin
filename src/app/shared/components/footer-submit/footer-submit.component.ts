import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef, Renderer2, ElementRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CollapsedNavWidth, SideNavWidth } from '@app/config/constant';
import { Menu } from '@core/services/types';
import { SplitNavStoreService } from '@store/common-store/split-nav-store.service';
import { ThemeService } from '@store/common-store/theme.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-footer-submit',
  templateUrl: './footer-submit.component.html',
  styleUrls: ['./footer-submit.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzCardModule, NgTemplateOutlet]
})
export class FooterSubmitComponent implements OnInit {
  private splitNavStoreService = inject(SplitNavStoreService);
  private themesService = inject(ThemeService);
  private rd2 = inject(Renderer2);
  private el = inject(ElementRef);

  @Input() leftTpl: TemplateRef<NzSafeAny> | undefined;
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
  destroyRef = inject(DestroyRef);

  setWidth(width: number): void {
    const dom = this.el.nativeElement.querySelector('.ant-pro-footer-bar');
    this.rd2.setStyle(dom, 'width', `calc(100% - ${width}px)`);
  }

  subTheme(): void {
    const sub1$ = this.themesOptions$.pipe(
      tap(themesOptions => {
        this.hasLeftNav = themesOptions.hasNavArea;
        this.isTopMode = themesOptions.mode === 'top';
        this.isMixMode = themesOptions.mode === 'mixin';
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.isOverMode || this.isTopMode || (this.isMixMode && !this.leftMenuArray)) {
          this.setWidth(0);
        } else {
          let width = 0;
          if (this.hasLeftNav) {
            width = this.isCollapsed ? CollapsedNavWidth : SideNavWidth;
          }
          this.setWidth(width);
        }
      });
  }

  ngOnInit(): void {
    this.subTheme();
  }
}
