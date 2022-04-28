import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";

interface Person {
  userName: string;
  email: string;
  nickName: string;
  address: string;
  mobile: number;
}
@Component({
  selector: 'app-desc',
  templateUrl: './desc.component.html',
  styleUrls: ['./desc.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescComponent implements OnInit {

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '详情组件示例',
    breadcrumb: ['首页', '组件', '详情组件'],
    desc: '一系列详情组件'
  };

  constructor() { }

  ngOnInit(): void {
  }

  listOfData: Person[] = [
    {
      userName: '张三',
      email: "321111.com",
      nickName: 'John Brown',
      address: 'New York No. 1 Lake Park',
      mobile: 111
    },
    {
      userName: '李四',
      email: "321111.com",
      nickName: 'John Brown',
      address: 'New York No. 1 Lake Park',
      mobile: 111
    },
    {
      userName: '王麻子',
      email: "321111.com",
      nickName: 'John Brown',
      address: 'New York No. 1 Lake Park',
      mobile: 111
    }
  ];
}
