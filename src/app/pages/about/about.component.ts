import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderType } from '@shared/components/page-header/page-header.component';
import { DateFormat } from '@shared/pipes/map.pipe';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'About',
    breadcrumb: ['Home', 'Chức năng mở rộng', 'About'],
    desc: 'ng-ant-admin'
  };
  data = new Date();
  dateFormat = DateFormat.DateTime;
  constructor() {}

  ngOnInit(): void {}
}
