import { ChangeDetectionStrategy, Component, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { ThemeService } from '@store/common-store/theme.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export interface PageHeaderType {
  title: string;
  desc: string | TemplateRef<NzSafeAny>;
  extra: string | TemplateRef<NzSafeAny>;
  breadcrumb: string[];
  footer: string | TemplateRef<NzSafeAny>;
}

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderComponent implements OnInit {
  @Input() backTpl!: TemplateRef<NzSafeAny> | null;
  @Input() pageHeaderInfo: Partial<PageHeaderType> = {};
  @Input() backUrl = '';
  themesOptions$ = this.themesService.getThemesMode();

  constructor(private themesService: ThemeService, private router: Router) {}

  back(): void {
    this.router.navigateByUrl(this.backUrl);
  }

  ngOnInit(): void {}
}
