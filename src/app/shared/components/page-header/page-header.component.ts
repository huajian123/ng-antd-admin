import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {ThemeService} from '@core/services/store/theme.service';
import {Router} from '@angular/router';

export interface PageHeaderType {
  title: string;
  desc: string | TemplateRef<any>;
  extra: string | TemplateRef<any>;
  breadcrumb: string[];
  footer: string | TemplateRef<any>;
}


@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderComponent implements OnInit {
  @Input() backTpl!: TemplateRef<any> | null;
  @Input() pageHeaderInfo: Partial<PageHeaderType> = {};
  @Input() backUrl = '';
  themesOptions$ = this.themesService.getThemesMode();

  constructor(private themesService: ThemeService, private router: Router) {
  }

  back(): void {
    this.router.navigateByUrl(this.backUrl);
  }

  ngOnInit(): void {
  }

}
