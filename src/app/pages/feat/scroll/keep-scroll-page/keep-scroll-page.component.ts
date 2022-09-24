/* eslint-disable prettier/prettier */
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderType } from '@shared/components/page-header/page-header.component';

@Component({
  selector: 'app-keep-scroll-page',
  templateUrl: './keep-scroll-page.component.html',
  styleUrls: ['./keep-scroll-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeepScrollPageComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Thanh Cuộn',
    breadcrumb: ['Home', 'Hàm số', 'Thanh Cuộn'],
    desc: 'Nam Phạm'
  };
  constructor() {}

  ngOnInit(): void {}
}
