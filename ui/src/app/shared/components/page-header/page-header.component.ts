import { ChangeDetectionStrategy, Component, inject, TemplateRef, input } from '@angular/core';
import { Router } from '@angular/router';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzPageHeaderModule, NzBreadCrumbModule, NzOutletModule]
})
export class PageHeaderComponent {
  private router = inject(Router);
  readonly backTpl = input<TemplateRef<NzSafeAny>>();
  readonly pageHeaderInfo = input<Partial<PageHeaderType>>({});
  readonly backUrl = input('');

  back(): void {
    this.router.navigateByUrl(this.backUrl());
  }
}
