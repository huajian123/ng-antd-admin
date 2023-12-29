import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ValidatorsService } from '@core/services/validators/validators.service';
import { DeptService } from '@services/system/dept.service';
import { RoleService } from '@services/system/role.service';
import { fnCheckForm } from '@utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzSliderModule } from 'ng-zorro-antd/slider';

@Component({
  selector: 'app-append-form-modal',
  templateUrl: './append-form-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, NzFormModule, ReactiveFormsModule, NzGridModule, NzInputModule, NzDatePickerModule, NzSliderModule]
})
export class AppendFormModalComponent implements OnInit {
  addEditForm!: FormGroup;
  private fb = inject(FormBuilder);

  constructor(private modalRef: NzModalRef) {}

  // 返回false则不关闭对话框
  protected getCurrentValue(): Observable<NzSafeAny> {
    if (!fnCheckForm(this.addEditForm)) {
      return of(false);
    }
    return of(this.addEditForm.value);
  }

  formatter(value: number): string {
    return `${value}%`;
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      taskName: [null, [Validators.required]],
      userName: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      finishRate: [0],
      taskDesc: []
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
