import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as Const from '@app/common/const'
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-subwindowchiphi',
  templateUrl: './subwindowchiphi.component.html',
  styleUrls: ['./subwindowchiphi.component.less'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SubwindowchiphiComponent implements OnInit {
  dataList: any = [];
  tableConfig!: MyTableConfig;
  addEditForm!: FormGroup;
  items!: FormArray;
  params: object;
  const = Const;
  lstchiphi = Const.lstchiphi;
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<any>;
  constructor(
    private modalRef: NzModalRef, 
    private fb: FormBuilder,
    private cdf : ChangeDetectorRef
  ) {
    this.params = {}
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
    this.initTable();
    this.dataList = this.lstchiphi
  }

  private initTable(): void {
    this.tableConfig = {
      headers: [
        {
          title: 'Mã Chuyến',
          width: 280,
          field: 'idchuyen'
        },
        {
          title: 'Tên chi phí',
          field: 'tenchiphi',
          width: 200
        },
        {
          title: 'Số tiền',
          field: 'sotien',
          width: 100
        },
        {
          title: 'Ghi chú',
          field: 'ghichu',
          width: 480
        }
      ],
      total: 0,
      showCheckbox: false,
      loading: false,
      pageSize: 10,
      pageIndex: 1
    };
  }

}
