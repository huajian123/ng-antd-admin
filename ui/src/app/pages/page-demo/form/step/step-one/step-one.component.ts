import { Component, input, output, InputSignal, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';

interface StepOneFormModel {
  paymentAccount: string;
  payWay: string;
  payWayNo: string;
  payeeName: string;
  amount: number | null;
}

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.less',

  imports: [FormField, NzFormModule, NzGridModule, NzSelectModule, NzButtonModule, NzInputModule, NzWaveModule, NzDividerModule, NzTypographyModule]
})
export class StepOneComponent{
  stepDirection: InputSignal<'horizontal' | 'vertical'> = input<'horizontal' | 'vertical'>('horizontal');
  readonly next = output<void>();

  formModel = signal<StepOneFormModel>({
    paymentAccount: '',
    payWay: 'zhifubao',
    payWayNo: '',
    payeeName: '',
    amount: null
  });

  validateForm = form(this.formModel, schemaPath => {
    required(schemaPath.paymentAccount, { message: '请输入付款账户' });
    required(schemaPath.payWayNo, { message: '请输入收款账户' });
    required(schemaPath.payeeName, { message: '请输入收款人姓名' });
    required(schemaPath.amount, { message: '请输入收款金额' });
  });

  // 下一步
  goNext(): void {
    if (this.validateForm().invalid()) {
      // 标记所有字段为 touched，使验证错误提示显示
      this.validateForm().markAsTouched();
      return;
    }
    console.log('表单数据:', this.formModel());
    this.next.emit();
  }
}
