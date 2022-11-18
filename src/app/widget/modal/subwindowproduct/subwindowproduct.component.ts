import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Const from '@app/common/const';
import { AccountService } from '@app/core/services/http/system/account.service';
import { SearchCommonVO } from '@app/core/services/types';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { finalize, Observable, of } from 'rxjs';

@Component({
  selector: 'app-subwindowproduct',
  templateUrl: './subwindowproduct.component.html',
  styleUrls: ['./subwindowproduct.component.less']
})
export class SubwindowproductComponent implements OnInit {

  addEditForm!: FormGroup;
  params: object;
  const = Const;
  listKh : any[] = [];
  tenkhachhang = ""

  constructor(
    private modalRef: NzModalRef, 
    private fb: FormBuilder,
    private cdf : ChangeDetectorRef,
    private dataKhachhangService: AccountService,
  ) {
    this.params = {}
  }

  ngOnInit(): void {
    this.getListKh();
    this.initForm();
    if (Object.keys(this.params).length > 0) {
      this.addEditForm.patchValue(this.params);
    }
  }

  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    if (!fnCheckForm(this.addEditForm)) {
      return of(false);
    }
    this.addEditForm.value['tenkhachhang'] = this.tenkhachhang;
    return of(this.addEditForm.value);
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      stt : [null,[Validators.required]],
      idkhachhang: [null, [Validators.required]],
      noidungmathang: [null,[Validators.required]],
      tiencuoc: [0,[Validators.required]],
      diadiembochang:[null,[Validators.required]],
      hinhthucthanhtoan:["1",[Validators.required]],
      lotrinh: ["0",[Validators.required]],
      ghichu: [null],
    });
  }

  changeKH($event: any) {
    console.log($event)
    for(let e of this.listKh) {
      if(e['id'] == $event) {
         this.tenkhachhang = e['name'];
         break;
      }
    }
  }

  getListKh() {
    const params: SearchCommonVO<any> = {
      pageSize: 0,
      pageNum: 0,
      filters: {
        phongban_id : this.const.idKhachhang
      }
    };
    this.dataKhachhangService
      .getAccount(params)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe(res => {
        this.listKh = res;
        this.cdf.markForCheck();
      });
  }

}
