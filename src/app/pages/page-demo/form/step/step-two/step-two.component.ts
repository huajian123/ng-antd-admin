import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fnCheckForm } from '@utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepTwoComponent implements OnInit {
  @Output() next = new EventEmitter<NzSafeAny>();
  @Output() previous = new EventEmitter<NzSafeAny>();
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  submit(): void {
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
    this.next.emit();
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
