import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';

@Component({
  selector: 'app-newkh',
  templateUrl: './newkh.component.html',
  styleUrls: ['./newkh.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewkhComponent implements OnInit {

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Khách hàng',
    breadcrumb: ['Home', 'Khách Hàng', 'Quản lý Khách Hàng']
  };

  constructor() { }

  ngOnInit(): void {
    console.log("nam pham");
  }

}
