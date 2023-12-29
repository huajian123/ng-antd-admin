import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { Dept } from '@services/system/dept.service';
import { fnCheckForm } from '@utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'app-dept-manage-modal',
  templateUrl: './dept-manage-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, NzFormModule, ReactiveFormsModule, NzGridModule, NzInputModule, NzRadioModule]
})
export class DeptManageModalComponent implements OnInit {
  addEditForm!: FormGroup;
  readonly nzModalData: Dept = inject(NZ_MODAL_DATA);
  private fb = inject(FormBuilder);

  constructor(private modalRef: NzModalRef) {}

  initForm(): void {
    this.addEditForm = this.fb.group({
      departmentName: [null, [Validators.required]],
      state: [true],
      orderNum: [0]
    });
  }

  // 此方法为如果有异步数据需要加载，则在该方法中添加
  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    if (!fnCheckForm(this.addEditForm)) {
      return of(false);
    }
    return of(this.addEditForm.value);
  }

  ngOnInit(): void {
    this.initForm();
    if (!!this.nzModalData) {
      this.addEditForm.patchValue(this.nzModalData);
    }
  }
}
