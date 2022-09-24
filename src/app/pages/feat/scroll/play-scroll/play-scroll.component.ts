/* eslint-disable prettier/prettier */
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';

import { PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzScrollService } from 'ng-zorro-antd/core/services';

/*https://segmentfault.com/a/1190000020769492*/
@Component({
  selector: 'app-play-scroll',
  templateUrl: './play-scroll.component.html',
  styleUrls: ['./play-scroll.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayScrollComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Thanh Cuộn',
    breadcrumb: ['Home', 'Hàm Số', 'Thanh cuộn 2'],
    desc: 'Nam Phạm'
  };

  constructor(private scrollService: NzScrollService, @Inject(DOCUMENT) private _doc: Document) {}

  ngOnInit(): void {}
}
