import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicComponent implements OnInit {

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '基础组件',
    breadcrumb: ['首页', '组件', '基础组件'],
    desc: '一系列基础组件'
  };

  constructor() { }
  cardPadding = {padding: '20px 24px 8px'};

  ngOnInit(): void {
  }

}
