import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-ripple',
  templateUrl: './ripple.component.html',
  styleUrls: ['./ripple.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzCardModule, NzCheckboxModule, FormsModule, NzInputNumberModule, ColorPickerModule, MatRippleModule]
})
export class RippleComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '水波纹',
    breadcrumb: ['首页', '功能', '水波纹']
  };
  centered = false;
  disabled = false;
  unbounded = false;
  radius = 0;
  color = 'red';
}
