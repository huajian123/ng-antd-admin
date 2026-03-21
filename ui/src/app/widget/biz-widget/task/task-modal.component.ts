import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { fnCheckForm } from '@utils/tools';
import { BasicConfirmModalComponent } from '@widget/base-modal';
import { TaskModalData } from '@widget/biz-widget/task/task-modal.service';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzGridModule,
    NzInputModule,
    NzDatePickerModule,
    NzRadioModule,
    NzSelectModule,
  ]
})
export class TaskModalComponent extends BasicConfirmModalComponent implements OnInit {
  taskForm!: FormGroup;
  readonly nzModalData: TaskModalData = inject(NZ_MODAL_DATA);
  isEdit = false;

  // 可用标签列表
  availableTags = ['Frontend', 'Backend', 'DevOps', 'UI', 'Bug', 'Feature', 'Docs', 'Review', 'K8s', 'Angular', 'Mobile'];

  private fb = inject(FormBuilder);
  override modalRef = inject(NzModalRef);

  // 返回false则不关闭对话框
  override getCurrentValue(): Observable<NzSafeAny> {
    if (!fnCheckForm(this.taskForm)) {
      return of(false);
    }
    return of(this.taskForm.value);
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null],
      priority: ['medium', [Validators.required]],
      tags: [[]],
      assignee: [null],
      dueDate: [null]
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.isEdit = !!this.nzModalData?.id;
    if (this.isEdit && this.nzModalData) {
      this.taskForm.patchValue(this.nzModalData);
    }
  }
}
