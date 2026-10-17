import { Component, output, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';

interface StepTwoFormModel {
  password: string;
}

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.less',

  imports: [NzAlertModule, NzDescriptionsModule, NzDividerModule, FormField, NzGridModule, NzFormModule, NzButtonModule, NzInputModule, NzWaveModule]
})
export class StepTwoComponent {
  readonly next = output<void>();
  readonly previous = output<void>();

  formModel = signal<StepTwoFormModel>({
    password: ''
  });

  validateForm = form(this.formModel, schemaPath => {
    required(schemaPath.password, { message: '请输入支付密码' });
  });

  submit(): void {
    if (this.validateForm().invalid()) {
      // 标记所有字段为 touched，使验证错误提示显示
      this.validateForm().markAsTouched();
      return;
    }
    console.log('表单数据:', this.formModel());
    this.next.emit();
  }
}
