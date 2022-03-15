import {Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef, Renderer2, ElementRef} from '@angular/core';
import {ThemeService} from '@core/services/store/theme.service';
import {tap} from "rxjs/operators";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {merge} from "rxjs";

@Component({
  selector: 'app-footer-submit',
  templateUrl: './footer-submit.component.html',
  styleUrls: ['./footer-submit.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterSubmitComponent implements OnInit {

  @Input() leftTpl!: TemplateRef<NzSafeAny>;
  themesOptions$ = this.themesService.getThemesMode();
  isNightTheme$ = this.themesService.getIsNightTheme();
  isCollapsed$ = this.themesService.getIsCollapsed();
  isOverMode$ = this.themesService.getIsOverMode();
  isCollapsed = false;
  isOverMode = false;
  hasLeftNav = false;
  isTopMode = false;

  constructor(private themesService: ThemeService, private rd2: Renderer2, private el: ElementRef) {
  }

  setWidth(width: number): void {
    const dom = this.el.nativeElement.querySelector('.ant-pro-footer-bar');
    this.rd2.setStyle(dom, 'width', `calc(100% - ${width}px)`);
  }

  subTheme(): void {
    const sub1$ = this.themesOptions$.pipe(tap(themesOptions => {
      this.hasLeftNav = themesOptions.hasNavArea;
      this.isTopMode = themesOptions.mode === "top";
    }));
    const sub2$ = this.isCollapsed$.pipe(tap(isCollapsed => {
      this.isCollapsed = isCollapsed;
    }));
    const sub3$ = this.isOverMode$.pipe(tap(res => {
      this.isOverMode = res;
    }));
    merge(sub1$, sub2$, sub3$).subscribe(() => {
      if (this.isOverMode || this.isTopMode) {
        this.setWidth(0);
      } else {
        let width = 0;
        if (this.hasLeftNav) {
          width = this.isCollapsed ? 48 : 208;
        }
        this.setWidth(width);
      }
    })

  }

  ngOnInit(): void {
    this.subTheme();
  }

}
