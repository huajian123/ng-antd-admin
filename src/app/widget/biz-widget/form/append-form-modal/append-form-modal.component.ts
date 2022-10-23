import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ValidatorsService } from '@core/services/validators/validators.service';
import { DeptService } from '@services/system/dept.service';
import { RoleService } from '@services/system/role.service';
import { fnCheckForm } from '@utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-append-form-modal',
  templateUrl: './append-form-modal.component.html',
  styleUrls: ['./append-form-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppendFormModalComponent implements OnInit {
  addEditForm!: FormGroup;

  constructor(private modalRef: NzModalRef, private fb: FormBuilder, private validatorsService: ValidatorsService, private roleService: RoleService, private deptService: DeptService) {}

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
