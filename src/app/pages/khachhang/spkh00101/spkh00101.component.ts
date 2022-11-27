import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { ActionCode } from '@app/config/actionCode';
import { User } from '@app/core/model/user.model';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { KhachhangService } from '@app/core/services/http/khachhang/khachhang.service';
import { OptionsInterface, SearchCommonVO } from '@app/core/services/types';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs';
import * as Const from "src/app/common/const";
import { SubwindowKhachhangService } from '@app/widget/modal/subwindowkhachhang/subwindow-khachhang.service';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { MapPipe, MapSet, MapKeyType } from '@app/shared/pipes/map.pipe';
import { DestroyService } from '@app/core/services/common/destory.service';
import { NzModalService } from 'ng-zorro-antd/modal';
interface SearchParam {
  phongban_id: string;
  name: string;
}
@Component({
  selector: 'app-spkh00101',
  templateUrl: './spkh00101.component.html',
  styleUrls: ['./spkh00101.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class Spkh00101Component extends BaseComponent implements OnInit {
  fnInit() {
    this.cdf.markForCheck();
  }
  destroy() {

  }

  searchParam: Partial<SearchParam> = {};
  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;
  phongban_id = Const.idKhachhang;

  DisplayScreenID: UrlDisplayId = UrlDisplayId.spkh00101;
  availableOptions: OptionsInterface[] = [];
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Công Nợ Khách hàng',
    breadcrumb: ['Home', 'Khách Hàng', 'Quản lý công nợ']
  };

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    public message: NzMessageService,
    private dataService: KhachhangService,
    private modalService: SubwindowKhachhangService,
    private modalSrv: NzModalService,
  ) {
    super(webService,router,cdf,datePipe);
  }

  getDataList(e?: NzTableQueryParams) {
    this.tableLoading(true);
    this.searchParam.phongban_id = this.phongban_id;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService.getlists(params).pipe(
      finalize(() => {
        this.tableLoading(false);
      })
    )
    .subscribe(data => {
      console.log(data);
      const { list, total, pageNum } = data;
      this.dataList = [...list];
      this.tableConfig.total = total!;
      this.tableConfig.pageIndex = pageNum!;
      this.tableLoading(false);
      this.checkedCashArray = [...this.checkedCashArray];
    });

  }

  searchName($event: any) {
    this.tableLoading(true);
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: 1,
      filters: $event.target.value
    };
    this.dataService.searchParams(params).pipe(
      finalize(() => {
        this.tableLoading(false);
      })
    )
    .subscribe(data => {
      console.log(data);
      const { list, total, pageNum } = data;
      this.dataList = [...list];
      this.tableConfig.total = total!;
      this.tableConfig.pageIndex = pageNum!;
      this.tableLoading(false);
      this.checkedCashArray = [...this.checkedCashArray];
    });
  }

  edit(id:string) {
    this.dataService.getDetail(id).subscribe(res => {
       this.modalService.show({ nzTitle: 'Cập nhật' }, res).subscribe(({ modalValue, status })=> {
          if (status === ModalBtnStatus.Cancel) {
            return;
          }
          modalValue.id = id;
          this.tableLoading(true);
          this.editData(modalValue);
       })
    })
  }

  editData(param: any): void {
    this.dataService.update(param)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        })
      )
      .subscribe(() => {
        this.getDataList();
      });
  }

  resetForm() {
    this.searchParam = {};
  }

  override ngOnInit(): void {
    this.initTable();
    this.availableOptions = [...MapPipe.transformMapToArray(MapSet.available, MapKeyType.Boolean)];
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

  selectedChecked(e: User[]): void {
    this.checkedCashArray = [...e];
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  tattoan(id: any, sotienno:number) {
    this.modalSrv.confirm({
      nzTitle: 'Bạn có chắc chắn muốn tất toán không?',
      nzContent: 'Nhấn OK để hoàn thành việc tất toán',
      nzOnOk: () => {
       // this.tableLoading(true);
        // this.dataService.deleteChuyen(id).subscribe(
        //   () => {
        //     if (this.dataList.length === 1) {
        //       this.tableConfig.pageIndex--;
        //     }
        //     this.getDataList();
        //     this.resetForm();
        //   },
        //   error => this.tableLoading(false)
        // );
      }
    });
    console.log("id: "+ id + "," +sotienno);
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'Mã khach hàng',
          field: 'id',
          width: 180,
        },
        {
          title: 'Tên khách hàng',
          width: 180,
          field: 'name',
        },
        {
          title: 'Số điện thoại',
          width: 120,
          field: 'dienthoai',
        },
        {
          title: 'Địa chỉ',
          width: 150,
          field: 'diachi',
        },
        {
          title: 'GroupId',
          width: 150,
          field: 'groupid',
        },
        {
          title: 'Số tiền nợ',
          width: 100,
          field: 'sotienno',
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
