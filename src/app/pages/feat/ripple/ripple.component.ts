import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderType } from '@shared/components/page-header/page-header.component';
import { MatRippleModule } from '@angular/material/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-ripple',
    templateUrl: './ripple.component.html',
    styleUrls: ['./ripple.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [PageHeaderComponent, NzCardModule, NzCheckboxModule, FormsModule, NzInputNumberModule, ColorPickerModule, MatRippleModule]
})
export class RippleComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '水波纹',
    breadcrumb: ['首页', '功能', '水波纹']
  };
  centered = false;
  disabled = false;
  unbounded = false;
  radius: number = 0;
  color: string = 'red';

  constructor() {}

  ngOnInit(): void {}
}
