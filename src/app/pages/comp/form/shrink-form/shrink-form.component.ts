import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";

interface SearchParam {
  ruleName: number;
  desc: string;
}

@Component({
  selector: 'app-shrink-form',
  templateUrl: './shrink-form.component.html',
  styleUrls: ['./shrink-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShrinkFormComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '可折叠表单示例',
    breadcrumb: ['首页', '组件', 'Form', '可折叠表单'],
    desc: '可折叠表单'
  };

  searchParam: Partial<SearchParam> = {};

  isCollapse = true;

  /*重置*/
  resetForm(): void {
    this.searchParam = {};
  }

  /*展开*/
  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  constructor() {}

  ngOnInit(): void {}
}
