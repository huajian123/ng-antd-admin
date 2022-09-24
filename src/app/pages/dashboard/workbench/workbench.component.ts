/* eslint-disable prettier/prettier */
import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Radar } from '@antv/g2plot';
import { PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { inNextTick } from 'ng-zorro-antd/core/util';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkbenchComponent implements OnInit, AfterViewInit {
  @ViewChild('pageHeaderContent', { static: false }) pageHeaderContent!: TemplateRef<NzSafeAny>;
  
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    desc: ''
  };

  constructor(private fb: FormBuilder, public msg: NzMessageService, private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: 'Bàn Làm việc',
      breadcrumb: ['Home', 'Dashboard', 'Bàn làm việc'],
      desc: this.pageHeaderContent
    };
  }
}
