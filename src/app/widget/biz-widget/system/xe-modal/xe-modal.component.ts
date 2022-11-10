import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { fnCheckForm } from '@utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-xe-modal',
  templateUrl: './xe-modal.component.html',
  styleUrls: ['./xe-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XeModalComponent implements OnInit {
  addEditForm!: FormGroup;
  params: object;

  constructor(
    private modalRef: NzModalRef, private fb: FormBuilder
  ) { 
    this.params = {}
  }


  initForm(): void {
    this.addEditForm = this.fb.group({
      biensoxe: [null, [Validators.required]],
      tenxegoinho: [null, [Validators.required]],
      trongtai: [null,[Validators.required]]
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
