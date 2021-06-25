import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {PageHeaderType} from '../../../share/components/page-header/page-header.component';

@Component({
  selector: 'app-standard-table',
  templateUrl: './standard-table.component.html',
  styleUrls: ['./standard-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StandardTableComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '标准列表',
    breadcrumb: ['首页', '列表页面', '标准列表']
  };
  constructor() { }

  ngOnInit(): void {
  }

}
