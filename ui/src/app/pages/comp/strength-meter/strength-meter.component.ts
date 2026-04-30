import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PasswordStrengthMeterComponent } from '@shared/biz-components/password-strength-meter/password-strength-meter.component';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-strength-meter',
  templateUrl: './strength-meter.component.html',
  styleUrl: './strength-meter.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, NzGridModule, NzCardModule, NzInputModule, FormsModule, PasswordStrengthMeterComponent, NzIconModule]
})
export class StrengthMeterComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '密码强度校验',
    breadcrumb: ['首页', '组件', '密码强度校验'],
    desc: '输入密码后实时计算强度等级，强度条颜色随等级变化'
  };
  passwordVisible = false;
  newPassword!: string;
}
