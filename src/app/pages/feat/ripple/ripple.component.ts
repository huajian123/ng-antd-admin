import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";

@Component({
  selector: 'app-ripple',
  templateUrl: './ripple.component.html',
  styleUrls: ['./ripple.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RippleComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '水波纹',
    breadcrumb: ['首页', '功能', '水波纹'],
  };
  centered = false;
  disabled = false;
  unbounded = false;
  radius: number = 0;
  color: string = 'red';

  constructor() {

  }

  ngOnInit(): void {
  }

}
