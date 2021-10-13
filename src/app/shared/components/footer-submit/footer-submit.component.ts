import {Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef, Renderer2, ElementRef} from '@angular/core';
import {ThemeService} from '../../../core/services/store/theme.service';

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

  constructor(private themesService: ThemeService, private rd2: Renderer2, private el: ElementRef) {
  }

  ngOnInit(): void {
    const dom = this.el.nativeElement.querySelector('.ant-pro-footer-bar');
    this.isCollapsed$.subscribe((res) => {
      const width = res ? 80 : 200;
      this.rd2.setStyle(dom, 'width', `calc(100% - ${width}px)`);
    });
  }

}
