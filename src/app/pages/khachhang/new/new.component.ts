import { Component, OnInit } from '@angular/core';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.less']
})
export class NewComponent implements OnInit {

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Khách hàng',
    breadcrumb: ['Home', 'Khách Hàng', 'Quản lý Khách Hàng']
  };

  constructor() { }

  ngOnInit(): void {
    
  }

}
