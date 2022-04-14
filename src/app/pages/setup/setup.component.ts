import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";
import {DriverService} from "@core/services/common/driver.service";

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetupComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '引导页',
    breadcrumb: ['首页', '引导页'],
    desc: '用于给用户的指引操作'
  };

  constructor(private driverService: DriverService) {
  }

  go(): void {
    console.log(111);
    this.driverService.load();
  }

  ngOnInit(): void {
  }

}
