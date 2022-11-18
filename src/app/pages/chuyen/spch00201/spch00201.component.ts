import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as Const from '@app/common/const';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { ActionCode } from '@app/config/actionCode';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { OptionsInterface } from '@app/core/services/types';

export interface Product {
  stt: number;
  idkhachhang: string;
  tenkhachhang: string;
  noidungmathang: string;
  tiencuoc: number;
  diadiembochang: string;
  hinhthucthanhtoan: string;
  lotring: string;
  ghichu:string;
} 
@Component({
  selector: 'app-spch00201',
  templateUrl: './spch00201.component.html',
  styleUrls: ['./spch00201.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Spch00201Component extends BaseComponent implements OnInit {

  fnInit() {
    console.log("nam pham")
    this.cdf.markForCheck();
  }
  destroy() {}

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Kế hoạch bóc hàng',
    breadcrumb: ["Home","Chuyến","Kế hoạch bóc hàng"],
    desc: ''
  };

  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;

  availableOptions: OptionsInterface[] = [];

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    public message: NzMessageService,
  ) {
    super(webService,router,cdf,datePipe);
  }

  override ngOnInit(): void {
     this.initTable();
  }

  Confirm() {

  }

  add() {

  }

  allDel() {

  }

  edit(stt: any) {}

  del(stt: any) {}

  getDataList() {
    this.dataList = [...this.dataList];
    this.cdf.detectChanges();
    this.tableLoading(false);
  }

  reloadTable(): void {
    this.message.info('Đã được làm mới');
    this.getDataList();
  }

  tableChangeDectction(): void {
    this.dataList = [...this.dataList];
    this.cdf.detectChanges();
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  selectedChecked(e: any): void {
    this.checkedCashArray = [...e];
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: true,
      headers: [
        {
          title: 'STT',
          field: 'stt',
          width: 80,
        },
        {
          title: 'ID Khách Hàng',
          width: 180,
          field: 'idkhachhang',
        },
        {
          title: 'Tên Khách Hàng',
          width: 170,
          field: 'tenkhachhang',
         // tdTemplate: this.Tltentai
        },
        {
          title: 'Nội dung bóc hàng',
          width: 450,
          field: 'noidungmathang',
          //tdTemplate: this.Tltenphu
        },
        {
          title: 'Tiền cước',
          width: 100,
          field: 'tiencuoc',
          //tdTemplate: this.Tlbiensoxe
        },
        {
          title: 'Địa điểm bóc hàng',
          width: 300,
          field: 'diadiembochang',
        },
        {
          title: 'Hình thức thanh toán',
          width: 250,
          field: 'hinhthucthanhtoan'
        },
        {
          title: 'Lộ trình',
          width: 150,
          field: 'lotrinh'
        },
        {
          title: 'Ghi chú',
          width: 450,
          field: 'ghichu'
        },
        {
          title: 'Hành động',
          //tdTemplate: this.operationTpl,
          width: 200,
          fixed: true,
          fixedDir: 'right'
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1,
      yScroll: 400
    };
  }

}
