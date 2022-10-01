import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { DestroyService } from '@core/services/common/destory.service';
import { OptionsInterface } from '@core/services/types';
import { ValidatorsService } from '@core/services/validators/validators.service';
import { DataScObj } from '@services/system/datasc.service';
import { fnCheckForm } from '@utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { WebserviceService } from 'src/app/core/services/common/webservice.service';
import { ValidationFormService } from "src/app/core/services/common/message-errors.service";
import { NzMessageService } from 'ng-zorro-antd/message';
import { LangService } from '@core/services/common/lang.service';

@Component({
  selector: 'app-datasc-modal',
  templateUrl: './datasc-modal.component.html',
  styleUrls: ['./datasc-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class DatascModalComponent implements OnInit {

  addEditForm!: FormGroup;
  params!: DataScObj;
  isEdit = false;
  value?: string;

  isReadonly = false;
  messageErrors: any = [];
  lang : OptionsInterface[] = [];

  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    public vf: ValidationFormService,
    public message: NzMessageService,
    private langService : LangService
  ) { }

  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    if (!fnCheckForm(this.addEditForm)) {
      return of(false);
    }
    return of(this.addEditForm.value);
  }

  get f():{ [key: string]: AbstractControl } {
    return this.addEditForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.getLang();
  }

  getLang(){
    for(let element of this.langService.lang) {
      const obj: OptionsInterface = {
        label: element,
        value: element
      };
      this.lang.push(obj);
    }
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      tieude1: [null, [Validators.required]],
      tieude2: [null,[Validators.required]],
      status: [true],
      lang: [null, [Validators.required]],
    });
  }
}
