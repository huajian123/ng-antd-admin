import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fnCheckForm } from '@utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepOneComponent implements OnInit {
  @Input('stepDirection') stepDirection: 'horizontal' | 'vertical' = 'horizontal';
  validateForm!: FormGroup;
  @Output() next = new EventEmitter<NzSafeAny>();

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
