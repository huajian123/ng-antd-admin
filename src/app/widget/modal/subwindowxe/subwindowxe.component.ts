import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Xe } from '@app/core/model/xe.model';
import { DestroyService } from '@app/core/services/common/destory.service';
import { ValidationFormService } from '@app/core/services/common/message-errors.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { XeService } from '@app/core/services/http/xe/xe.service';
import { OptionsInterface, SearchCommonVO } from '@app/core/services/types';
import { ValidatorsService } from '@app/core/services/validators/validators.service';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs';
interface SearchParam {
  biensoxe: string;
  tenxegoinho: string;
}

@Component({
  selector: 'app-subwindowxe',
  templateUrl: './subwindowxe.component.html',
  styleUrls: ['./subwindowxe.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class SubwindowxeComponent implements OnInit {
  addEditForm!: FormGroup;
  params!: any;
  roleOptions: OptionsInterface[] = [];
  isEdit = false;
  value?: string;
  tableConfig!: MyTableConfig;
  dataList: Xe[] = [];

  isReadonly = false;
  messageErrors: any = [];
  searchParam: Partial<SearchParam> = {};
  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private webService: WebserviceService,
    public vf: ValidationFormService,
    public message: NzMessageService,
    private cdr: ChangeDetectorRef,
    private dataService: XeService,
  ) { }

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('state', { static: true }) state!: TemplateRef<NzSafeAny>;

  ngOnInit(): void {
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

  getDataList(e?: NzTableQueryParams): void {
    this.tableConfig.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService
      .getXes(params)
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

  private initTable(): void {
    this.tableConfig = {
      headers: [
        {
          title: 'Biển số',
          field: 'biensoxe',
          width: 180,
        },
        {
          title: 'Tên gợi nhớ',
          field: 'tenxegoinho',
          width: 200
        },
        {
          title: 'Trọng tải',
          field: 'trongtai',
          width: 100
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
