import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { FormBuilder } from '@angular/forms';
import { ValidationFormService } from '@app/core/services/common/message-errors.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { ValidatorsService } from '@app/core/services/validators/validators.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { SearchCommonVO } from '@app/core/services/types';
import { DeptService } from '@app/core/services/http/system/dept.service';
import { finalize } from 'rxjs';
import { AccountService, User } from '@app/core/services/http/system/account.service';
import { ModalBtnStatus } from '@app/widget/base-modal';
import * as Const from '@app/common/const'

interface SearchParam {
  phongban_id: string;
}

@Component({
  selector: 'app-subwindowtaixe',
  templateUrl: './subwindowtaixe.component.html',
  styleUrls: ['./subwindowtaixe.component.less']
})
export class SubwindowtaixeComponent implements OnInit {

  tableConfig!: MyTableConfig;
  dataList: User[] = [];
  params!: Object;
  dataResponse: NzSafeAny = {}
  messageErrors: any = [];
  searchParam: Partial<SearchParam> = {};
  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private webService: WebserviceService,
    public vf: ValidationFormService,
    public message: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalRef: NzModalRef,
    private dataService: AccountService
  ) { }

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('availableFlag', { static: true }) availableFlag!: TemplateRef<NzSafeAny>;

  ngOnInit(): void {
    this.searchParam.phongban_id = Const.idTaixe;
    this.initTable();
  }

  tableChangeDectction(): void {
    this.dataList = [...this.dataList];
    this.cdr.detectChanges();
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  getDataList(e?: NzTableQueryParams): void {
    this.tableConfig.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService
      .getAccount(params)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        })
      )
      .subscribe(data => {
        const { list, total, pageNum } = data;
        this.dataList = [...list];
        this.tableConfig.total = total!;
        this.tableConfig.pageIndex = pageNum!;
        this.tableLoading(false);
      });
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  resetForm(): void {
    this.searchParam = {};
    this.getDataList();
  }

  reloadTable(): void {
    this.message.info('Làm mới thành công');
    this.getDataList();
  }
  
  getItem(id:string, name:string) {
    this.dataResponse = {
      id: id,
      name: name
    }
    this.modalRef.destroy({ status: ModalBtnStatus.Ok, modalValue:this.dataResponse });
  }


  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'Tên tài xế',
          field: 'name',
          width: 120,
          tdTemplate: this.operationTpl
        },
        {
          title: 'Trạng thái',
          width: 150,
          field: 'available'
        },
        {
          title: 'Giới Tính',
          width: 120,
          field: 'sex',
          pipe: 'sex'
        },
        {
          title: 'Điện Thoại',
          width: 150,
          field: 'dienthoai'
        },
        {
          title: 'Email',
          width: 200,
          field: 'email'
        },
        {
          title: 'Đăng nhập lần cuối',
          width: 200,
          field: 'lastLoginTime',
          pipe: 'date:yyyy-MM-dd HH:mm'
        },
        {
          title: 'Ngày khởi tạo',
          width: 150,
          field: 'createdAt',
          pipe: 'date:yyyy-MM-dd HH:mm'
        },
        {
          title: 'Zalo',
          width: 150,
          field: 'zalo'
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    };
  }

}
