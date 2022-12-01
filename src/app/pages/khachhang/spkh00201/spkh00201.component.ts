import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { ActionCode } from '@app/config/actionCode';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { KhachhangDtoService } from '@app/core/services/http/khachhang/khachhang-dto.service';
import { OptionsInterface } from '@app/core/services/types';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import * as Const from "src/app/common/const";
interface SearchParam {
  ngaybatdau: string | null;
  ngayketthuc: string | null;
}

@Component({
  selector: 'app-spkh00201',
  templateUrl: './spkh00201.component.html',
  styleUrls: ['./spkh00201.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Spkh00201Component extends BaseComponent implements OnInit {

  searchParam: Partial<SearchParam> = {};
  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;

  fnInit() {
    this.cdf.markForCheck();
  }

  destroy() { }

  DisplayScreenID: UrlDisplayId = UrlDisplayId.spkh00201;
  availableOptions: OptionsInterface[] = [];
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Chi tiết công nợ',
    breadcrumb: ['Home', 'Khách Hàng', 'Chi tiết công nợ']
  };

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    public message: NzMessageService,
    private modalSrv: NzModalService,
    private khdtoService: KhachhangDtoService
  ) {
    super(webService,router,cdf,datePipe);
  }

  btnshowmodalkh = false;
  idkhachhang = "";
  tenkhachhang = "";
  sotienno = 0;
  ngaybatdau : any;
  ngayketthuc : any;
  @ViewChild('endSoplnDate') endSoplnDate!: NzDatePickerComponent;
  disabledStartSoplnDate = (startValue: Date): boolean => {
    if (!startValue || !this.ngayketthuc) {
      return false;
    }
    const date = new Date(this.ngayketthuc)
    return startValue.getTime() > date.getTime();
  };
  disabledEndSoplnDate = (endValue: Date): boolean => {
    if (!endValue || !this.ngaybatdau) {
      return false;
    }
    const date = new Date(this.ngaybatdau)
    return endValue.getTime() <= date.getTime();
  };
  handleStartOpenSoplnChange(open: boolean): void {
    if (!open) {
      this.endSoplnDate.open();
    }
  }
  handleEndOpenSoplnChange(open: boolean): void {}

  override ngOnInit(): void {
    // check khach hàng dto service 
    // if kbnflg = true => show id khach khách , tên khach hang, tong nợ, danh sach chi tiên nợ.
    // if kbnflg = false => show button modal khach hang để  lấy thông tin khách hàng. dataList = [];
    // search từ ngày đến ngày. search chi tiêt trả. chi tiêt nơ. mặt định chu kỳ nợ = 0
    // search chu ký nợ = 1. những nợ đã tất toán.
    // search có ghi chú là tất toán.
    if(this.khdtoService.kbnflg === false) {
       this.ngaybatdau = this.getDate();
       this.ngayketthuc = this.getDate();
       this.btnshowmodalkh = false;
       this.idkhachhang = "";
       this.tenkhachhang = "";
       this.sotienno = 0;
    } else {
      this.btnshowmodalkh = true;
      this.idkhachhang = this.khdtoService.id;
      this.tenkhachhang = this.khdtoService.name;
      this.sotienno = this.khdtoService.sotienno;
    }

    // lay ngay giơ mặc chua
    this.initTable();
    this.cdf.markForCheck();
  }

  getDataList(e?: NzTableQueryParams) {}
  resetForm() {}
  fnFocusOutKhachhang() {}
  searchKhachhangClick() {}

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

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'Ngày',
          field: 'ngay',
          width: 150,
          pipe: 'date:yyyy-MM-dd HH:mm',
        },
        {
          title: 'Trang Thái',
          width: 180,
          field: 'trangthai',
        },
        {
          title: 'Số tiền',
          width: 120,
          field: 'sotien',
        },
        {
          title: 'Hình thức thánh toán',
          width: 200,
          field: 'hinhthucthanhtoan',
        },
        {
          title: 'Ghi chú',
          width: 150,
          field: 'ghichu',
        },
        {
          title: 'Hành động',
          tdTemplate: this.operationTpl,
          width: 250,
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

}
