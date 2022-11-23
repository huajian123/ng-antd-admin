import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActionCode } from '@app/config/actionCode';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { OptionsInterface, SearchCommonVO } from '@app/core/services/types';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { MapKeyType, MapPipe, MapSet } from '@app/shared/pipes/map.pipe';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { SubwindowXeService } from '@app/widget/modal/subwindowxe/subwindow-xe.service';
import { SubwindowTaixeService } from "@app/widget/modal/subwindowtaixe/subwindow-taixe.service"
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import * as Const from "src/app/common/const";
import { DeptTreeService } from '@app/pages/system/account/dept-tree/dept-tree.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ChuyenService } from "@services/chuyen/chuyen.service"
import { finalize } from 'rxjs';
import { Chuyen } from '@app/core/model/chuyen.model';
import { SubwindowChuyenService } from '@app/widget/modal/subwindowchuyen/subwindow-chuyen.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChuyendtoService } from '@app/core/services/http/chuyen/chuyendto.service';
import { UrlDisplayId } from '@app/common/UrlDisplay';

interface SearchParam {
  ngaybatdau: string;
  ngayketthuc: string;
  biensoxe: string;
  idtai : string;
  idphu : string;
  trangthai: any;
}

class showBtn {
  btnUpdate = false;
  btnDelete = false;
  btnConfirmbochang = false;
  btnConfirmtrahang = false;
}

@Component({
  selector: 'app-spch00101',
  templateUrl: './spch00101.component.html',
  styleUrls: ['./spch00101.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DeptTreeService]
})
export class Spch00101Component extends BaseComponent implements OnInit {
  
  DisplayScreenID: UrlDisplayId = UrlDisplayId.spch00101;

  fnInit() {
     this.cdf.markForCheck();
  }
  destroy() {}

  searchParam: Partial<SearchParam> = {};
  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;
  availableOptions: OptionsInterface[] = [];
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Quản lý chuyến',
    breadcrumb: ["Home","Chuyến","Quản lý chuyến"],
    desc: ''
  };
  // mode
  tainm = "";
  stocktai = "";
  phunm = "";
  stockphu = "";
  biensoxenm = "";
  stockbsx = "";
  trangthaimode: any;
  listStatus = Const.listTrangthaichuyen;

  btnUpdate = false;
  btnDelete = false;
  btnConfirmbochang = false; // hoàn thành bóc hàng
  btnConfirmtrahang = false; // hoàn thành trả hàng

  @ViewChild('Tlbiensoxe', { static: true }) Tlbiensoxe!: TemplateRef<NzSafeAny>;
  @ViewChild('Tltentai', { static: true }) Tltentai!: TemplateRef<NzSafeAny>;
  @ViewChild('Tltenphu', { static: true }) Tltenphu!: TemplateRef<NzSafeAny>;
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  
  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    public message: NzMessageService,
    private modalService: SubwindowXeService,
    private modalTaixeService: SubwindowTaixeService,
    private modalChuyenService: SubwindowChuyenService,
    private modalSrv: NzModalService,
    public deptTreeService: DeptTreeService,
    private dataService: ChuyenService,
    private chuyenDtoService : ChuyendtoService
  ) {
    super(webService,router,cdf,datePipe);
  }

  ngaybatdau: string | null = null;
  ngayketthuc: string | null = null;

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
    this.initTable();
    this.deptTreeService.initDate();   
    this.availableOptions = [...MapPipe.transformMapToArray(MapSet.available, MapKeyType.Boolean)];
  }

  onChange($event: any): void {
    console.log($event);
  }

  getDataList(e?: NzTableQueryParams) {
    this.tableLoading(true);
    // this.tableConfig.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService.getChuyens(params)
    .pipe(
      finalize(() => {
        this.tableLoading(false);
      })
    )
    .subscribe(data => {
      console.log(data);
      const { list, total, pageNum } = data;
      this.dataList = [...list];
      for (let element of this.dataList) {
          let showbtn = this.showBtnChuyen(element.trangthai);
          element['showBtn'] = showbtn;
      }
      if(this.dataList.length == 0) {
        this.modalSrv.info({ nzContent: 'Không Có dữ liệu',});
      }
      this.tableConfig.total = total!;
      this.tableConfig.pageIndex = pageNum!;
      this.tableLoading(false);
      this.checkedCashArray = [...this.checkedCashArray];
    });
  }

  showBtnChuyen(trangthai: number): showBtn {
    let showbtn = new showBtn();
    switch(trangthai) {
      case 0 : {
        
        showbtn.btnUpdate = true;
        showbtn.btnDelete = true;
        showbtn.btnConfirmbochang = false;
        showbtn.btnConfirmtrahang = false;
      }; break;
      case 1 : {
        showbtn.btnUpdate = true;
        showbtn.btnDelete = false;
        showbtn.btnConfirmbochang = true;
        showbtn.btnConfirmtrahang = false;
      }; break;
      case 2 : {
        showbtn.btnUpdate = false;
        showbtn.btnDelete = false;
        showbtn.btnConfirmbochang = false;
        showbtn.btnConfirmtrahang = true;
      }; break;
      case 3 : {
        showbtn.btnUpdate = false;
        showbtn.btnDelete = false;
        showbtn.btnConfirmbochang = false;
        showbtn.btnConfirmtrahang = false;
      }
    }
    return showbtn;
  }

  confirmbochang(id: string) {
    let req = {
      id: id,
      trangthai: 1
    }
    this.dataService.updateTrangthai(req).pipe().subscribe(res => {
      if (res == 1) {
         this.message.success(" Thực hiện thành công !");
      } else {
         this.message.success(" Không thành công !");
      }
    })
  }

  confirmtrahang(id: string) {
    let req = {
      id: id,
      trangthai: 2
    }
    this.dataService.updateTrangthai(req).pipe().subscribe(res => {
      if (res == 1) {
         this.message.success(" Thực hiện thành công !");
      } else {
         this.message.success(" Không thành công !");
      }
    })
  }

  resetForm() {
     this.searchParam = {};
     this.biensoxenm = "";
     this.tainm = "";
     this.phunm = "";
     this.trangthaimode = "";
  }

  fnFocusOutBiensoxe() {
     if(this.searchParam.biensoxe != this.stockbsx) {
       this.biensoxenm = "";
     }
  }

  // show modal xe
  searchBiensoxeClick() {
    this.modalService.show({ nzTitle: 'Danh Sách Xe' },{showcomfirm:false}).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        const param = { ...res.modalValue };
        this.searchParam.biensoxe=param['biensoxe'];
        this.stockbsx = param['biensoxe'];
        this.biensoxenm = param['tenxegoinho'];
      },
    );
  }

  // show modal tai xe
  searchTaixeClick(){
    this.modalTaixeService.show({ nzTitle: 'Danh Sách Tài Xế' },{showcomfirm:false}).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        const param = { ...res.modalValue };
        this.searchParam.idtai=param['id'];
        this.stocktai = param['id'];
        this.tainm = param['name'];
      },
    );
  }

  fnFocusOutTaixe(){
    if(this.searchParam.idtai != this.stocktai) {
      this.tainm = "";
    }
  }

  // show modal tai xe
  searchPhuxeClick(){
    this.modalTaixeService.show({ nzTitle: 'Danh Sách Tài Xế' },{showcomfirm:false}).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        const param = { ...res.modalValue };
        this.searchParam.idphu=param['id'];
        this.stockphu = param['id'];
        this.phunm = param['name'];
      },
    );
  }

  fnFocusOutPhuxe(){
    if(this.searchParam.idphu != this.stockphu) {
      this.phunm = "";
    }
  }

  edit(id:string) {
    this.dataService.getChuyen(id).subscribe(res => {
      res.biensoxe = res.biensoxe['_id'];
      res.idphu = res.idphu['_id'];
      res.idtai = res.idtai['_id']
      this.modalChuyenService.show({ nzTitle: 'Cập nhật' }, res).subscribe(({ modalValue, status }) => {
        if (status === ModalBtnStatus.Cancel) {
          return;
        }
        modalValue.id = id;
        this.tableLoading(true);
        this.addEditData(modalValue, 'updateChuyen');
      });
    });
  }

  del(id:string) {
    this.modalSrv.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa nó không?',
      nzContent: 'Không thể phục hồi sau khi xóa',
      nzOnOk: () => {
        this.tableLoading(true);
        this.dataService.deleteChuyen(id).subscribe(
          () => {
            if (this.dataList.length === 1) {
              this.tableConfig.pageIndex--;
            }
            this.getDataList();
            this.resetForm();
          },
          error => this.tableLoading(false)
        );
      }
    });
  }

  add() {
    this.modalChuyenService.show({ nzTitle:'Thêm mới' }).subscribe( //  this.formItemNm[15]
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        this.tableLoading(true);
        this.addEditData(res.modalValue, 'createChuyen');
      },
      error => this.tableLoading(false)
    );
  }
  allDel() {}

  getItem(id:any,changduong: any,idtai: any,idphu: any,biensoxe: any,tienxe:any,ngaydi:any,ngayve:any,trangthai:any) {
    this.chuyenDtoService.id = id;
    this.chuyenDtoService.biensoxe = biensoxe;
    this.chuyenDtoService.changduong = changduong;
    this.chuyenDtoService.idphu = idphu;
    this.chuyenDtoService.idtai = idtai;
    this.chuyenDtoService.ngaydi = this.formatDate(ngaydi);
    this.chuyenDtoService.ngayve = this.formatDate(ngayve);
    this.chuyenDtoService.tienxe = tienxe;
    this.chuyenDtoService.trangthai = trangthai;
    this.dataService.refresh(Const.rootbase + UrlDisplayId.spch00201);
  }

  addEditData(param: Chuyen, methodName: 'updateChuyen' | 'createChuyen'): void {
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

  selectedChecked(e: Chuyen[]): void {
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
          title: 'Ngày khởi hành',
          field: 'ngaydi',
          width: 180,
          pipe: "date: dd/MM/YYYY HH:mm"
        },
        {
          title: 'Ngày về',
          width: 180,
          field: 'ngayve',
          pipe: "date: dd/MM/YYYY HH:mm"
        },
        {
          title: 'Tài Chính',
          width: 120,
          field: 'idtai',
          tdTemplate: this.Tltentai
        },
        {
          title: 'Tài Phụ',
          width: 150,
          field: 'idphu',
          tdTemplate: this.Tltenphu
        },
        {
          title: 'Biển số xe',
          width: 200,
          field: 'biensoxe',
          tdTemplate: this.Tlbiensoxe
        },
        {
          title: 'Tiền đưa trước',
          width: 200,
          field: 'tienxe',
        },
        {
          title: 'Điểm đi - điểm đến',
          width: 150,
          field: 'changduong'
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
