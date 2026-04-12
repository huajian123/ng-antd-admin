import { NgTemplateOutlet } from '@angular/common';
import { Component, ChangeDetectionStrategy, TemplateRef, Renderer2, ElementRef, inject, effect, input } from '@angular/core';

import { CollapsedNavWidth, SideNavWidth } from '@app/config/constant';
import { SplitNavStoreService } from '@store/common-store/split-nav-store.service';
import { ThemeService } from '@store/common-store/theme.service';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-footer-submit',
  templateUrl: './footer-submit.component.html',
  styleUrl: './footer-submit.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzCardModule, NgTemplateOutlet]
})
export class FooterSubmitComponent {
  private splitNavStoreService = inject(SplitNavStoreService);
  private themesService = inject(ThemeService);
  private rd2 = inject(Renderer2);
  private el = inject(ElementRef);

  readonly leftTpl = input<TemplateRef<NzSafeAny>>();

  constructor() {
    effect(() => {
      const { hasNavArea, mode } = this.themesService.$themesOptions();
      const isCollapsed = this.themesService.$isCollapsed();
      const isOverMode = this.themesService.$isOverModeTheme();
      const leftMenuArray = this.splitNavStoreService.$splitLeftNavArray();

      const isTopMode = mode === 'top';
      const isMixMode = mode === 'mixin';

      if (isOverMode || isTopMode || (isMixMode && !leftMenuArray)) {
        this.setWidth(0);
      } else {
        let width = 0;
        if (hasNavArea) {
          width = isCollapsed ? CollapsedNavWidth : SideNavWidth;
        }
        this.setWidth(width);
      }
    });
  }

  private setWidth(width: number): void {
    const dom = this.el.nativeElement.querySelector('.ant-pro-footer-bar');
    this.rd2.setStyle(dom, 'width', `calc(100% - ${width}px)`);
  }
}
