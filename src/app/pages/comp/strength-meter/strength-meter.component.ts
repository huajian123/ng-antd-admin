import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PasswordStrengthMeterComponent } from '@shared/biz-components/password-strength-meter/password-strength-meter.component';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-strength-meter',
  templateUrl: './strength-meter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzGridModule, NzCardModule, NzButtonModule, NzInputModule, FormsModule, PasswordStrengthMeterComponent, NzIconModule]
})
export class StrengthMeterComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '密码强度校验组件',
    breadcrumb: ['首页', '组件', '密码强度校验组件'],
    desc: '看看你密码强度够不够'
  };
  passwordVisible = false;
  newPassword!: string;
}
