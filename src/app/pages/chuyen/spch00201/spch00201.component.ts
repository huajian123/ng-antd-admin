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
import { OptionsInterface, SearchCommonVO } from '@app/core/services/types';
import { MapKeyType, MapPipe, MapSet } from '@app/shared/pipes/map.pipe';

import { TabService } from '@app/core/services/common/tab.service';
import { DestroyService } from '@app/core/services/common/destory.service';
import { Phieunhaphang } from '@app/core/model/phieunhaphang.model';
import { PhieunhaphangService } from '@app/core/services/http/phieunhaphang/phieunhaphang.service';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs';
import { fnReload } from '@utils/tools';
import { ChiphichuyenService } from '@app/core/services/http/chiphichuyen/chiphichuyen.service';
import { SubwindowChiphiService } from '@app/widget/modal/subwindowchiphi/subwindow-chiphi.service';
export interface Product {
  id?:string,
  stt?: number;
  idkhachhang?: string;
  tenkhachhang?: string;
  noidungmathang?: string;
  tiencuoc?: number;
  diadiembochang?: string;
  hinhthucthanhtoan?: any;
  lotrinh?: any;
  ghichu?:string;
  trangthai?: number;
} 

interface SearchParam {
  idchuyen : string;
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
  }

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Kế hoạch bóc hàng',
    breadcrumb: ["Home","Chuyến","Kế hoạch bóc hàng"],
    desc: ''
  };

  searchParam: Partial<SearchParam> = {};

  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;


  dataList: Product[] = [];
  checkedCashArray: any[] = [];
  listchiphi: any[] = [];
  ActionCode = ActionCode;
  showchuyen = true;
  showConfirm = false;
  tongcuoc = 0;
  availableOptions: OptionsInterface[] = [];

  btnNew = false;
  btnUpdate = false;
  btnDelete = false;

  btnConfirm = false;
  btnConfirmbochang = false;
  btnConfirmtrahang = false;
  btnConfirmchiphi = false;
  btnConfirmend = false;

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tiencuocTpl', { static: true }) tiencuocTpl!: TemplateRef<NzSafeAny>;


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
    private cpcService: ChiphichuyenService,
    private modalChiphiService: SubwindowChiphiService,
    public tabService: TabService,

  ) {
    super(webService,router,cdf,datePipe);
  }

  override ngOnInit(): void {
    this.initTable();
    this.getTongcuoc();
    this.fnshowConfirm(this.ChuyenDto.trangthai)
    if(this.ChuyenDto.id != "" && this.ChuyenDto.id.length == 24) {
      this.showchuyen = false;
      this.showConfirm = true;
    }
    this.availableOptions = [...MapPipe.transformMapToArray(MapSet.available, MapKeyType.Boolean)];
  }

  fnshowConfirm(trangthai: number) {
    switch(trangthai) {
      case 0 : {
        this.btnConfirm = true;
        this.btnConfirmbochang = false;
        this.btnConfirmtrahang = false;
        this.btnConfirmchiphi = false;
        this.btnConfirmend = false;
      }; break;
      case 1 : {
        this.btnConfirm = false;
        this.btnConfirmbochang = true;
        this.btnConfirmtrahang = false;
        this.btnConfirmchiphi = false;
        this.btnConfirmend = false;
      }; break;
      case 2 : {
        this.btnConfirm = false;
        this.btnConfirmbochang = false;
        this.btnConfirmtrahang = true;
        this.btnConfirmchiphi = false;
        this.btnConfirmend = false;
      }; break;
      case 3 : {
        this.btnConfirm = false;
        this.btnConfirmbochang = false;
        this.btnConfirmtrahang = false;
        this.btnConfirmchiphi = true;
        this.btnConfirmend = false;
        this.btnNew = true;
        this.btnUpdate = true;
        this.btnDelete = true;
      }; break; 
      case 4 : {
        this.btnConfirm = false;
        this.btnConfirmbochang = false;
        this.btnConfirmtrahang = false;
        this.btnConfirmchiphi = true;
        this.btnConfirmend = true;
        this.btnNew = true;
        this.btnUpdate = true;
        this.btnDelete = true;
      }; break;
      case 5 : {
        this.btnConfirm = false;
        this.btnConfirmbochang = false;
        this.btnConfirmtrahang = false;
        this.btnConfirmchiphi = true;
        this.btnConfirmend = false;
        this.btnNew = true;
        this.btnUpdate = true;
        this.btnDelete = true;
      } 
    }
    this.cdf.markForCheck();
  }

  selectChuyen() {
     this.router.navigate([Const.rootbase + 'chuyen/spch00101']);
  }

  getTongcuoc() {
    let tc = 0;
    for(let element of this.dataList) {
      tc = tc + element.tiencuoc!;
    }
    this.tongcuoc = tc;
    this.cdf.markForCheck();
  }

  Confirm4() {
    if(this.ChuyenDto.trangthai == 5) {
      // show chi phi chuyen 
      let req = {
        id: this.ChuyenDto.id
      }
      this.cpcService.getlists(req).pipe().subscribe(res => {
        this.modalChiphiService.show({ nzTitle: 'Danh sách chi phí' }, {listcp:res,status:5,showcomfirm:false}).subscribe(({ modalValue, status }) => {
          if (status === ModalBtnStatus.Cancel) {
            return;
          }
        });
      })
    } else {
      this.fncheckchiphiChuyen();
    }
    // 1 check chuyến này có ai tinh chi phí chưa
    // nếu chưa. thì show tính chi phí
    // nếu có . thì update
  }

  fncheckchiphiChuyen() {
    let req = {
      id: this.ChuyenDto.id
    }
    this.cpcService.getlists(req).pipe().subscribe(res => {
        this.listchiphi = res;
        if (this.listchiphi.length > 0) {
          // show modal update chi phí
          console.log(this.listchiphi);
          this.modalChiphiService.show({ nzTitle: 'Cập nhật danh sách chi phí' }, {listcp:this.listchiphi}).subscribe(({ modalValue, status }) => {
            if (status === ModalBtnStatus.Cancel) {
              return;
            }
            let req1 = {
              id: req.id,
              trangthai: 4,
              lstchiphi: modalValue.items
            }
            this.cpcService.updateList(req1).pipe().subscribe(res => {
                if(res == req1.lstchiphi.length) {
                  this.message.info("Cập nhật thành công !");
                  this.ChuyenDto.trangthai=4;
                  this.fnshowConfirm(4);
                } else {
                  this.message.info("Cập nhật 1 phần !");
                }
            })
          });
        } else {
          // show modal tính chi phí
          this.modalChiphiService.show({ nzTitle: 'Danh sách chi phí' }, {idchuyen:req.id}).subscribe(({ modalValue, status }) => {
            if (status === ModalBtnStatus.Cancel) {
              return;
            }
            let req1 = {
              id: req.id,
              trangthai: 4,
              lstchiphi: modalValue.items
            }
            console.log(req1);
            this.dataService.updateTrangthai(req1).pipe().subscribe(res => {
              if (res == 1) {
                 this.message.success(" Thực hiện thành công !");
                 this.ChuyenDto.trangthai=4;
                 this.fnshowConfirm(4);
              } else {
                 this.message.success(" Không thành công !");
              }
            })
          });
        }
    })
  }

  // update trang thai chuyen hang
  Confirm(trangthai: number) {
     
     if (this.ChuyenDto.id != '' && this.ChuyenDto.id.length == 24) {
      let listKhachNo: Product[] = []
        let req = {
          id: this.ChuyenDto.id,
          trangthai: trangthai,
          listkhachno: listKhachNo
        }
        if(this.dataList.length > 0) {
          listKhachNo = this.fnGetListKhachNo();
          if(trangthai == 3) {
            req['listkhachno'] = listKhachNo
          }
          this.dataService.updateTrangthai(req).pipe().subscribe(res => {
            if (res == 1) {
               this.message.success(" Thực hiện thành công !");
               this.ChuyenDto.trangthai = trangthai;
               this.fnshowConfirm(this.ChuyenDto.trangthai);
               fnReload(this.router, Const.rootbase + 'chuyen/spch00101');
            } else {
               this.message.success(" Không thành công !");
            }
         })
        } else {
          this.message.success(" Vui lòng thêm mặt hàng !");
        }
        
     }
  }

  // fnGet list khach nợ
  fnGetListKhachNo() {
     let listKhachNo = [];
     for(let element of this.dataList) {
       if(element.hinhthucthanhtoan == 2) {
          listKhachNo.push(element);
       }
     }
     return listKhachNo;
  }

  // add product
  add() {
    this.modashowProduct.show({ nzTitle:'Thêm mới' }).subscribe( //  this.formItemNm[15]
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        res.modalValue['trangthai'] = 0;
        res.modalValue['biensoxe'] = this.ChuyenDto.biensoxe;
        res.modalValue['idchuyen'] = this.ChuyenDto.id;
        this.tableLoading(true);
        this.addEditData(res.modalValue, 'create');
      },
      error => this.tableLoading(false)
    );
  }

  allDel() {

  }


  edit(id: any) {
    console.log(id);
    this.phhService.getDetail(id).subscribe(res => {
      let req = {
        "idchuyen": res.idchuyen,
        "biensoxe": res.biensoxe,
        "iduser": res.iduser,
        "tiencuoc": res.tiencuoc,
        "lotrinh": res.lotrinh,
        "ngaynhap": res.ngaynhap,
        "noidungdonhang": res.noidungdonhang,
        "diadiembochang": res.diadiembochang,
        "hinhthucthanhtoan": res.hinhthucthanhtoan + "",
        "ghichu": null,
        "trangthai": res.trangthai,
        "id": res.id
      }
      console.log(req);

      this.modashowProduct.show({ nzTitle: 'Cập nhật' }, req).subscribe(({ modalValue, status }) => {
        if (status === ModalBtnStatus.Cancel) {
          return;
        }
        modalValue.id = id;
        this.tableLoading(true);
        this.addEditData(modalValue, 'update');
      }, error => this.tableLoading(false));
    })
  }

  del(id: any) {
    this.modalSrv.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa nó không?',
      nzContent: 'Không thể phục hồi sau khi xóa',
      nzOnOk: () => {
        this.tableLoading(true);
        this.phhService.delete(id).subscribe(
          () => {
            if (this.dataList.length === 1) {
              this.tableConfig.pageIndex--;
            }
            this.getDataList();
            this.getTongcuoc();
          },
          error => this.tableLoading(false)
        );
      }
    });
  }


  addEditData(param: Product, methodName: 'update' | 'create'): void {
    this.phhService[methodName](param)
    .pipe(
      finalize(() => {
        this.tableLoading(false);
      })
    )
    .subscribe(() => {
      this.getDataList();
      this.getTongcuoc();
    }); 
  }

  getDataList(e?: NzTableQueryParams) {
    this.tableConfig.loading = true;
    if(this.ChuyenDto.id != '') {
      this.searchParam.idchuyen = this.ChuyenDto.id;
    }
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.phhService.getlists(params)
    .pipe(
      finalize(() => {
        this.tableLoading(false);
      })
    )
    .subscribe(data => {
      console.log(data);
      const { list, total, pageNum } = data;
      let listProduct = this.listToProduct(list);
      this.dataList = [...listProduct];
      this.getTongcuoc();
      // if(this.dataList.length == 0) {
      //   this.modalSrv.info({ nzContent: 'Không Có dữ liệu',});
      // }
      this.tableConfig.total = total!;
      this.tableConfig.pageIndex = pageNum!;
      this.tableLoading(false);
      this.checkedCashArray = [...this.checkedCashArray];
    });
  }

  listToProduct(list: any): Product[] {
    let listP: Product[] = [];
    if(list.length > 0) {
      let i = 0;
      for(let item of list) {
          let itemProduc: Product = {}
          itemProduc.id = item['id'];
          itemProduc.stt = (i+1);
          itemProduc.idkhachhang = item.iduser['_id'];
          itemProduc.tenkhachhang = item.iduser['name'];
          itemProduc.noidungmathang = item['noidungdonhang'];
          itemProduc.lotrinh = item['lotrinh'];
          itemProduc.diadiembochang = item['diadiembochang'];
          itemProduc.hinhthucthanhtoan = item['hinhthucthanhtoan'];
          itemProduc.tiencuoc = item['tiencuoc'];
          itemProduc.trangthai = item['trangthai'];
          itemProduc.ghichu = item['ghichu'];
          i++;
          listP.push(itemProduc);
      }
    }
    return listP;
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
          //tdTemplate: this.tiencuocTpl
        },
        {
          title: 'Tiền cước',
          width: 100,
          field: 'tiencuoc',
          tdTemplate: this.tiencuocTpl
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
