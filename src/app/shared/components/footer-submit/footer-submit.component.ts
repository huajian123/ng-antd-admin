import {Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef, Renderer2, ElementRef} from '@angular/core';
import {ThemeService} from '@core/services/store/theme.service';
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-footer-submit',
  templateUrl: './footer-submit.component.html',
  styleUrls: ['./footer-submit.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterSubmitComponent implements OnInit {

  @Input() leftTpl!: TemplateRef<any>;
  themesOptions$ = this.themesService.getThemesMode();
  isNightTheme$ = this.themesService.getIsNightTheme();
  isCollapsed$ = this.themesService.getIsCollapsed();
  isOverMode$ = this.themesService.getIsOverMode();
  isCollapsed = false;
  hasLeftNav = true;

  constructor(private themesService: ThemeService, private rd2: Renderer2, private el: ElementRef) {
  }

  setWidth(width: number): void {
    const dom = this.el.nativeElement.querySelector('.ant-pro-footer-bar');
    this.rd2.setStyle(dom, 'width', `calc(100% - ${width}px)`);
  }

  subTheme(): void {
    this.isOverMode$.subscribe(res => {
      if (res) {
        this.setWidth(0);
      } else {
        this.themesOptions$.pipe(switchMap(themesOptions => {
          this.hasLeftNav = themesOptions.hasNavArea;
          return this.isCollapsed$;
        })).subscribe(isCollapsed => {
          let width = 0;
          if (this.hasLeftNav) {
            width = isCollapsed ? 48 : 208;
          }
          this.setWidth(width);
        });
      }
    })
  }

  ngOnInit(): void {
    this.subTheme();
  }

}
