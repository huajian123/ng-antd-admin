import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeptComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '部门管理',
    breadcrumb: ['系统管理', '部门管理']
  };

  constructor() { }

  ngOnInit(): void {
  }

}
