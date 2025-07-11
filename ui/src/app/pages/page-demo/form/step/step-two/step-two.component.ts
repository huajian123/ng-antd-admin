import { Component, OnInit, ChangeDetectionStrategy, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { fnCheckForm } from '@utils/tools';

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
  styleUrls: ['./step-two.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzAlertModule, NzDescriptionsModule, NzDividerModule, FormsModule, ReactiveFormsModule, NzGridModule, NzFormModule, NzButtonModule, NzInputModule, NzWaveModule]
})
export class StepTwoComponent implements OnInit {
  readonly next = output<void>();
  readonly previous = output<void>();
  validateForm!: FormGroup;
  private fb = inject(FormBuilder);

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
