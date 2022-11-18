import { DatePipe } from '@angular/common';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as Const from '@app/common/const';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { ActionCode } from '@app/config/actionCode';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';

import { SubwindowProductService } from '@app/widget/modal/subwindowproduct/subwindow-product.service';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChuyendtoService } from '@app/core/services/http/chuyen/chuyendto.service';
import { ChuyenService } from '@app/core/services/http/chuyen/chuyen.service';
import { OptionsInterface } from '@app/core/services/types';
import { MapKeyType, MapPipe, MapSet } from '@app/shared/pipes/map.pipe';

import { TabService } from '@app/core/services/common/tab.service';
import { DestroyService } from '@app/core/services/common/destory.service';
import { Phieunhaphang } from '@app/core/model/phieunhaphang.model';
import { PhieunhaphangService } from '@app/core/services/http/phieunhaphang/phieunhaphang.service';
import { UrlDisplayId } from '@app/common/UrlDisplay';

export interface Product {
  stt: number;
  idkhachhang: string;
  tenkhachhang: string;
  noidungmathang: string;
  tiencuoc: number;
  diadiembochang: string;
  hinhthucthanhtoan: any;
  lotrinh: any;
  ghichu:string;
  trangthai?: number;
} 
@Component({
  selector: 'app-spch00201',
  templateUrl: './spch00201.component.html',
  styleUrls: ['./spch00201.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class Spch00201Component extends BaseComponent implements OnInit {
  DisplayScreenID: UrlDisplayId = UrlDisplayId.spch00201;
  reqPhieunhaphang : Phieunhaphang = {};

  fnInit() {
    this.cdf.markForCheck();
  }

  destroy() {
   // this.ChuyenDto.clear();
  }

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Kế hoạch bóc hàng',
    breadcrumb: ["Home","Chuyến","Kế hoạch bóc hàng"],
    desc: ''
  };

  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;


  dataList: Product[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;
  showchuyen = true;
  tongcuoc = 0;
  availableOptions: OptionsInterface[] = [];

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;


  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    public message: NzMessageService,

    private modashowProduct: SubwindowProductService,
    private modalSrv: NzModalService,
    public ChuyenDto: ChuyendtoService,
    private dataService: ChuyenService,
    private phhService: PhieunhaphangService,
    public tabService: TabService,

  ) {
    super(webService,router,cdf,datePipe);
  }

  override ngOnInit(): void {
    this.initTable();
    this.getTongcuoc();
    if(this.ChuyenDto.id != "" && this.ChuyenDto.id.length == 24) {
      this.showchuyen = false;
    }
    this.availableOptions = [...MapPipe.transformMapToArray(MapSet.available, MapKeyType.Boolean)];
  }

  selectChuyen() {
     this.router.navigate([Const.rootbase + 'chuyen/spch00101']);
  }

  getTongcuoc() {
    let tc = 0;
    for(let element of this.dataList) {
      tc = tc + element.tiencuoc;
    }
    this.tongcuoc = tc;
    this.cdf.markForCheck();
  }

  Confirm() {

  }

  add() {
    let stt = this.dataList.length + 1;
    this.modashowProduct.show({ nzTitle:'Thêm mới' },{stt:stt}).subscribe( //  this.formItemNm[15]
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        this.tableLoading(true);
        this.addEditData(res.modalValue, 'createProduct');
      },
      error => this.tableLoading(false)
    );
  }

  save(stt:any) {
    this.modalSrv.confirm({
      nzTitle: 'Bạn có chắc chắn muốn lưu không?',
      nzContent: 'Nhấn ok để tiệp tục',
      nzOnOk: () => {
       
        if(this.ChuyenDto.id != '' && this.ChuyenDto.id.length ==24){
          this.getIdphieunhaphang(stt)
          this.phhService.create(this.reqPhieunhaphang).pipe().subscribe(res=> {
              if(res){
                this.message.success("Lưu thành công !");
              }
          })
        } else {
          this.message.info("Vui lòng chọn một chuyến hàng !");
        } 
      }
    });
  }

  getIdphieunhaphang(stt: any) {
    for(let element of this.dataList) {
      if(element.stt == stt) {
        this.reqPhieunhaphang.diadiembochang = element.diadiembochang;
        this.reqPhieunhaphang.ghichu = element.ghichu;
        this.reqPhieunhaphang.hinhthucthanhtoan = element.hinhthucthanhtoan;
        this.reqPhieunhaphang.biensoxe = this.ChuyenDto.biensoxe;
        this.reqPhieunhaphang.idchuyen = this.ChuyenDto.id;
        this.reqPhieunhaphang.lotrinh = element.lotrinh;
        this.reqPhieunhaphang.makh = element.idkhachhang;
        this.reqPhieunhaphang.noidungdonhang = element.noidungmathang;
        this.reqPhieunhaphang.tiencuoc = element.tiencuoc;
        this.reqPhieunhaphang.trangthai = 0;
      }
      break;
    }
  }

  allDel() {

  }


  edit(stt: any) {
    this.modashowProduct.show({ nzTitle: 'Cập nhật' }, this.dataList[stt-1]).subscribe(({ modalValue, status }) => {
      if (status === ModalBtnStatus.Cancel) {
        return;
      }
      modalValue.stt = stt;
      this.tableLoading(true);
      this.addEditData(modalValue, 'updateProduct');
    }, error => this.tableLoading(false));
  }

  del(stt: any) {
    this.modalSrv.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa nó không?',
      nzContent: 'Không thể phục hồi sau khi xóa',
      nzOnOk: () => {
        this.tableLoading(true);
        this.dataList.splice(this.getVitriItem(stt),1);
        this.initTable();
        this.getDataList();
        this.getTongcuoc();
      }
    });
  }

  getVitriItem(stt:any): number{
    let i = 0;
    for(let element of this.dataList) {
      if(element.stt == stt) {
          break;
      }
      i++;
    }
    return i;
  }

  addEditData(param: Product, methodName: 'updateProduct' | 'createProduct'): void {
     if(methodName == 'updateProduct') {
       for(let element of this.dataList){
          if(element.stt == param.stt){
            element.idkhachhang = param.idkhachhang;
            if (param.tenkhachhang != '') {
              element.tenkhachhang = param.tenkhachhang;
            }
            element.noidungmathang = param.noidungmathang;
            element.tiencuoc = param.tiencuoc;
            element.diadiembochang = param.diadiembochang;
            element.hinhthucthanhtoan = param.hinhthucthanhtoan;
            element.lotrinh = param.lotrinh;
            element.ghichu = param.ghichu;
          }
       }
       this.initTable();
       this.getDataList();
      
     } else {
       this.dataList.push(param);
       this.getDataList();
       this.getTongcuoc();
       
     }
  }

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
      showCheckbox: false,
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
          tdTemplate: this.operationTpl,
          width: 300,
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
