import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionCode } from '@app/config/actionCode';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { OptionsInterface } from '@app/core/services/types';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { MapKeyType, MapPipe, MapSet } from '@app/shared/pipes/map.pipe';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { SubwindowXeService } from '@app/widget/modal/subwindowxe/subwindow-xe.service';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import * as Const from "src/app/common/const"

interface SearchParam {
  ngaybatdau: string;
  ngayketthuc: string;
  biensoxe: string;
  idtai : string;
  idphu : string;
}

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewComponent extends BaseComponent implements OnInit {
  fnInit() {
    throw new Error('Method not implemented.');
  }
  destroy() {
    throw new Error('Method not implemented.');
  }

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
  listTaiXe = [
    {
      "id": "nampham1",
      "tentaixe": "Nam 1"
    },
    {
      "id": "nampham2",
      "tentaixe": "Nam 2"
    },
    {
      "id": "nampham3",
      "tentaixe": "Nam 3"
    },
  ]

  biensoxenm = "";
  
  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    private modalService: SubwindowXeService
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
    this.availableOptions = [...MapPipe.transformMapToArray(MapSet.available, MapKeyType.Boolean)];
    console.log(this.searchParam)
  }

  getDataList() {
     console.log(this.searchParam);
  }

  resetForm() {
     this.searchParam = {};
  }

  fnFocusOutBiensoxe() {}

  searchBiensoxeClick() {
    this.modalService.show({ nzTitle: 'Danh Sách Xe' }).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        const param = { ...res.modalValue };
      },
    );
  }

}
