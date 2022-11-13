import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { finalize, Observable, of } from 'rxjs';
import * as Const from '@app/common/const'
import { XeService } from '@app/core/services/http/xe/xe.service';
import { SearchCommonVO } from '@app/core/services/types';
import { AccountService } from '../../../core/services/http/system/account.service';

@Component({
  selector: 'app-subwindowchuyen',
  templateUrl: './subwindowchuyen.component.html',
  styleUrls: ['./subwindowchuyen.component.less'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SubwindowchuyenComponent implements OnInit {
  addEditForm!: FormGroup;
  params: object;
  const = Const;
  listXetai: any[] = [];
  listTaixe: any[] = [];
  constructor(
    private modalRef: NzModalRef, 
    private fb: FormBuilder,
    private dataService: XeService,
    private dataTaixeService: AccountService,
    private cdf : ChangeDetectorRef
  ) {
    this.params = {}
  }


  @ViewChild('endSoplnDate') endSoplnDate!: NzDatePickerComponent;
  disabledStartSoplnDate = (startValue: Date): boolean => {
    if (!startValue || !this.addEditForm.value.ngayve) {
      return false;
    }
    const date = new Date(this.addEditForm.value.ngayve)
    return startValue.getTime() > date.getTime();
  };
  disabledEndSoplnDate = (endValue: Date): boolean => {
    if (!endValue || !this.addEditForm.value.ngaydi) {
      return false;
    }
    const date = new Date(this.addEditForm.value.ngaydi)
    return endValue.getTime() <= date.getTime();
  };
  handleStartOpenSoplnChange(open: boolean): void {
    if (!open) {
      this.endSoplnDate.open();
    }
  }
  handleEndOpenSoplnChange(open: boolean): void {}

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
    this.getlistXetai();
    this.getListTaixe();
    this.initForm();
    if (Object.keys(this.params).length > 0) {
      this.addEditForm.patchValue(this.params);
    }
   
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      ngaydi: [null, [Validators.required]],
      ngayve: [null],
      biensoxe: [null,[Validators.required]],
      tienxe: [0,[Validators.required]],
      idtai:[null,[Validators.required]],
      idphu:[null,[Validators.required]],
      changduong: [null,[Validators.required]]
    });
  }

  getlistXetai() {
    const params: SearchCommonVO<any> = {
      pageSize: 0,
      pageNum: 0,
      filters: {}
    };
    this.dataService
      .getXes(params)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe(res => {
        this.listXetai = res;
        this.cdf.markForCheck();
      });
  }

  getListTaixe() {
    const params: SearchCommonVO<any> = {
      pageSize: 0,
      pageNum: 0,
      filters: {
        phongban_id : this.const.idTaixe
      }
    };
    this.dataTaixeService
      .getAccount(params)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe(res => {
        this.listTaixe = res;
        this.cdf.markForCheck();
      });
  }

}
