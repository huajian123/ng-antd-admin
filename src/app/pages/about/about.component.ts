import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";
import {DateFormat} from "@shared/pipes/map.pipe";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '关于',
    breadcrumb: ['首页', '拓展功能','关于'],
    desc:'ng-ant-admin 是一个基于Angular和ng-zorro的后台解决方案，目标是为中大型项目开发，提供现成的开箱解决方案以及丰富的示例，不限制任何代码用于商用'
  };
  data=new Date()
  dateFormat=DateFormat.DateTime
  constructor() { }

  ngOnInit(): void {
  }

}
