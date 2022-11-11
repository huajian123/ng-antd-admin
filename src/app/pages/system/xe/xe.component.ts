import { Component, ChangeDetectionStrategy, Injector, ChangeDetectorRef, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/pages/system/base/base.component';
import { WebserviceService } from 'src/app/core/services/common/webservice.service';
import { Router } from '@angular/router';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ActionCode } from '@app/config/actionCode';
import { MyTableConfig } from '@shared/components/ant-table/ant-table.component';
import { Xe } from '@core/model/xe.model'
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { XeModalService } from '@widget/biz-widget/system/xe-modal/xe-modal.service';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { finalize } from 'rxjs';
import { XeService } from '@app/core/services/http/xe/xe.service';
import { OptionsInterface, SearchCommonVO } from '@app/core/services/types';
import { MapKeyType, MapPipe, MapSet } from '@app/shared/pipes/map.pipe';
import { DatePipe } from '@angular/common';

interface SearchParam {
  biensoxe: string;
  trangthai: boolean;
  tengoinho: string;
}

@Component({
  selector: 'app-xe',
  templateUrl: './xe.component.html',
  styleUrls: ['./xe.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XeComponent extends BaseComponent implements OnInit { //extends BaseComponent

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    desc: ''
  };

  constructor(
    protected override  webService: WebserviceService,
    protected override  router: Router,
    protected override  cdf : ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    private modalService: XeModalService,
    private dataService: XeService,
  ){
    super(webService,router,cdf,datePipe);
    this.pageHeaderInfo = {
      title: this.formItemNm[1],
      breadcrumb: ['Home','Quản lý hệ thống',  'Quản lý xe'],
      desc: this.pageHeaderContent
    };
    this.cdf.markForCheck();
  }
  override ngOnInit(): void {
    this.initTable();
    this.stateOptions = [...MapPipe.transformMapToArray(MapSet.available, MapKeyType.Boolean)];
   
  }

  @ViewChild('pageHeaderContent', { static: false }) pageHeaderContent!: TemplateRef<NzSafeAny>;
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<any>;
  searchParam: Partial<SearchParam> = {};
  ActionCode = ActionCode;
  tableConfig!: MyTableConfig;
  dataList: Xe[] = [];
  checkedCashArray = [];
  stateOptions: OptionsInterface[] = [];

  fnInit(){

  }

  getDataList(e?: NzTableQueryParams){
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
        this.checkedCashArray = [...this.checkedCashArray];
      });

  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  reloadTable() {}

  resetForm() {}

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'Biển số xe',//this.formItemNm[7],
          field: 'biensoxe',
          width: 150
        },
        {
          title: 'Tên gợi nhớ',//this.formItemNm[8],
          width: 200,
          field: 'tenxegoinho'
        },
        {
          title: 'Trong tai',//this.formItemNm[9],
          width: 120,
          field: 'trongtai'
        },
        {
          title: 'Trạng thái',//this.formItemNm[10],
          width: 100,
          field: 'trangthai'
        },
        {
          title: 'Vận hành',//this.formItemNm[11],
          tdTemplate: this.operationTpl,
          width: 280,
          fixed: true,
          fixedDir: 'right'
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    };
  }

  add(){
    this.modalService.show({ nzTitle:'Thêm mới' }).subscribe( //  this.formItemNm[15]
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        this.tableLoading(true);
        this.addEditData(res.modalValue, 'createXe');
      },
      error => this.tableLoading(false)
    );
  }

  addEditData(param: Xe, methodName: 'updateXe' | 'createXe'): void {
    this.dataService[methodName](param)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        })
      )
      .subscribe(() => {
        this.getDataList();
      });
  }

  tableChangeDectction(): void {
    this.dataList = [...this.dataList];
    this.cdf.detectChanges();
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  del(id:any){}

  edit(id: string): void {
    this.dataService.getXe(id).subscribe(res => {
      this.modalService.show({ nzTitle: 'Cập nhật' }, res).subscribe(({ modalValue, status }) => {
        if (status === ModalBtnStatus.Cancel) {
          return;
        }
        modalValue.id = id;
        this.tableLoading(true);
        this.addEditData(modalValue, 'updateXe');
      });
    });
  }

  destroy() {}

}
