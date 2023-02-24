import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { fnCheckForm } from '@utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
    selector: 'app-step-one',
    templateUrl: './step-one.component.html',
    styleUrls: ['./step-one.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, NzFormModule, ReactiveFormsModule, NzGridModule, NzSelectModule, NzButtonModule, NzInputModule, NzWaveModule, NzDividerModule, NzTypographyModule]
})
export class StepOneComponent implements OnInit {
  @Input('stepDirection') stepDirection: 'horizontal' | 'vertical' = 'horizontal';
  validateForm!: FormGroup;
  @Output() readonly next = new EventEmitter<NzSafeAny>();

  constructor(private fb: FormBuilder) {}

  // 下一步
  goNext(): void {
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
    this.next.emit();
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      paymentAccount: [null, [Validators.required]],
      payWay: ['zhifubao'],
      payWayNo: [null, [Validators.required]],
      payeeName: [null, [Validators.required]],
      amount: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
