import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { fnCheckForm } from '@utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-role-manage-modal',
  templateUrl: './role-manage-modal.component.html',
  styleUrls: ['./role-manage-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleManageModalComponent implements OnInit {
  addEditForm!: FormGroup;
  params: object;

  constructor(private modalRef: NzModalRef, private fb: FormBuilder) {
    this.params = {};
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      rolename: [null, [Validators.required]],
      mota: [null]
    });
  }

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
    if (Object.keys(this.params).length > 0) {
      this.addEditForm.patchValue(this.params);
    }
  }
}
