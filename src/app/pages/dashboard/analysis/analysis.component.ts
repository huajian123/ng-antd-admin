import { DatePipe, DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Chart } from '@antv/g2';
import { Pie, RingProgress, TinyColumn, TinyArea, Progress } from '@antv/g2plot';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { CommonService } from '@app/core/services/http/common/common.service';
import { XeService } from '@app/core/services/http/xe/xe.service';
import { SearchCommonVO } from '@app/core/services/types';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import _ from 'lodash';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { inNextTick } from 'ng-zorro-antd/core/util';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as Const from '@app/common/const'

interface DataItem {
  name: string;
  chinese: number;
  math: number;
  english: number;
}

interface OjbChart {
  type: string;
  value: number;
}

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalysisComponent extends BaseComponent implements OnInit, AfterViewInit {
  lstdatadoanhthu: OjbChart[] = [];
  ishowxuhuongdoanhthu = true;
  ishowxuhuongchiphi = false;
  ishowxuhuongloinhuan = false;
  lstdatachiphi: OjbChart[] = [];
  lstdataloinhuan: OjbChart[] = [];
  itemObjdoanhthu!: OjbChart;
  itemObjchiphi!: OjbChart;
  itemObjloinhuan!: OjbChart;

  loinhuanMode = 0;
  chiphiMode = 0;
  doanhthuMode = 0;

  tongchuyenhangMode = 0;
  tongnoallMode = 0;

  //list top 10 khách hàng có doanh thu cao
  listtopkh = [];

  fnInit() {
    this.cdr.markForCheck();
  }
  destroy() {

  }
  DisplayScreenID: UrlDisplayId = UrlDisplayId.Analysis;
  cardPadding = { padding: '20px 24px 8px' };
  miniBarData = [497, 666, 219, 269, 274, 337, 81, 497, 666, 219, 269];
  miniAreaData = [264, 274, 284, 294, 284, 274, 264, 264, 274, 264, 264, 264, 284, 264, 254, 264, 244, 340, 264, 243, 226, 192];
  
  histogramData = [
    { type: 'Tháng 1', value: 0 },
    { type: 'Tháng 2', value: 0 },
    { type: 'Tháng 3', value: 0 },
    { type: 'Tháng 4', value: 0 },
    { type: 'Tháng 5', value: 0 },
    { type: 'Tháng 6', value: 0 },
    { type: 'Tháng 7', value: 0 },
    { type: 'Tháng 8', value: 0 },
    { type: 'Tháng 9', value: 0 },
    { type: 'Tháng 10', value: 0 },
    { type: 'Tháng 11', value: 0 },
    { type: 'Tháng 12', value: 0 }
  ];
  ringData = [
    { type: 'Loại 1', value: 27 },
    { type: 'Loại 2', value: 25 },
    { type: 'Loại 3', value: 18 },
    { type: 'Loại 4', value: 15 },
    { type: 'Loại 5', value: 10 },
    { type: 'Loại Khác', value: 5 }
  ];

  listOfColumn = [
    {title: 'STT'},
    {title: 'Avatar'},
    {title: 'Biển số xe'},
    {title: 'Trọng tải'},
    {title: "Trạng thái"},
    {title: "Vị trí hiện tại"},
  ];

  date = null;

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];
  radioBieudo = "1";

  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }

  onCalendarChange(result: Array<Date | null>): void {
    console.log('onCalendarChange', result);
  }

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected  cdr :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    private ngZone: NgZone,
    public message: NzMessageService,
    private xeService: XeService,
    private commonService: CommonService,
    @Inject(DOCUMENT) private document: any
    ) {
      super(webService,router,cdr,datePipe);
    }

  override ngOnInit(): void {
    this.getAllxe();
    this.getListthongketaichinh();
    this.getThongketaichinhnam();
    this.getTongchuyenhangtrongnam();
    this.getTongnoall();
    this.getListtopdoanhthu();
    
  }

  initMinibar(): void {
    const data = this.miniBarData;
    const tinyColumn = new TinyColumn('miniBar', {
      autoFit: true,
      height: 14,
      width: 200,
      data
    });

    tinyColumn.render();
  }

  initMiniArea(): void {
    const data = this.miniAreaData;
    const tinyArea = new TinyArea('miniArea', {
      autoFit: true,
      height: 14,
      width: 200,
      data,
      smooth: true,
      areaStyle: {
        fill: '#d6e3fd'
      }
    });

    tinyArea.render();
  }

  initProgress(): void {
    const progress = new Progress('progress', {
      height: 14,
      width: 200,
      autoFit: true,
      percent: 0.7,
      color: ['#5B8FF9', '#E8EDF3']
    });

    progress.render();
  }

  initDoanhthu(lst:any): void {

    const chart = new Chart({
      container: 'doanhthu',
      autoFit: true,
      height: 350,
      padding: [40, 40, 32, 72]
    });

    chart.data(lst);
    chart.scale('value', {
      nice: true
    });
    chart.axis('type', {
      tickLine: null
    });

    chart.axis('value', {
      label: {
        formatter: val => {
          return +val;
        }
      }
    });

    chart.tooltip({
      showMarkers: false
    });
    chart.interaction('element-active');

    chart.legend(false);
    chart
      .interval()
      .position('type*value')
      .color('type', val => {
        if (val === '10-30分' || val === '30+分') {
          return '#ff4d4f';
        }
        return '#2194ff';
      })
      .label('value', {
        offset: 10
      });
    chart.render();
  }

  changeBieudo($event:any) {
    this.document.getElementById("doanhthu").innerHTML = "";
    switch($event) {
      case "1" :  this.initDoanhthu(this.lstdatadoanhthu);
                  this.ishowxuhuongdoanhthu = true;
                  this.ishowxuhuongchiphi = false;
                  this.ishowxuhuongloinhuan = false;
                  break;
      case "2" :  this.initDoanhthu(this.lstdatachiphi);
                  this.ishowxuhuongdoanhthu = false;
                  this.ishowxuhuongchiphi = true;
                  this.ishowxuhuongloinhuan = false;
                  break;
      case "3" :  this.initDoanhthu(this.lstdataloinhuan);
                  this.ishowxuhuongdoanhthu = false;
                  this.ishowxuhuongchiphi = false;
                  this.ishowxuhuongloinhuan = true;
    }
  }

  initSearchArea(): void {
    const data = this.miniAreaData;
    const tinyArea = new TinyArea('searchUserChart', {
      autoFit: true,
      height: 30,
      data,
      smooth: true,
      areaStyle: {
        fill: '#d6e3fd'
      }
    });
    tinyArea.render();
  }

  initSearchAvgArea(): void {
    const data = this.miniAreaData;
    const tinyArea = new TinyArea('searchUserAvgChart', {
      autoFit: true,
      height: 30,
      data,
      smooth: true,
      areaStyle: {
        fill: '#d6e3fd'
      }
    });
    tinyArea.render();
  }

  initRing(): void {
    const tinyArea = new Pie('ringPie', {
      appendPadding: 10,
      data: this.ringData,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.64,
      meta: {
        value: {
          formatter: v => `${v} đ`
        }
      },
      label: {
        type: 'inner',
        offset: '-50%',
        style: {
          textAlign: 'center'
        },
        autoRotate: false,
        content: '{value}'
      },
      statistic: {},
      // Thêm tương tác văn bản thống kê trung tâm
      interactions: [{ type: 'element-selected' }, { type: 'element-active' }, { type: 'pie-statistic-active' }]
    });
    tinyArea.render();
  }

  initMiniRing(): void {
    const ringProgress = new RingProgress('miniRing', {
      height: 45,
      width: 45,
      autoFit: false,
      percent: 0.7,
      color: ['#5B8FF9', '#E8EDF3']
    });

    ringProgress.render();
  }

  ngAfterViewInit(): void {
    inNextTick().subscribe(() => {
      this.ngZone.runOutsideAngular(() => {
        this.initMinibar();
        this.initMiniArea();
        this.initProgress();
        this.initSearchArea();
        this.initSearchAvgArea();
        this.initRing();
        // this.initMiniRing();
        
      });
    });
  }

  getAllxe() {
    const params: SearchCommonVO<any> = {
      pageSize: 10,
      pageNum: 1,
      filters: {}
    };
    this.xeService
    .getXes(params)
    .pipe()
    .subscribe(data => {
      const { list } = data;
      this.dataList = [...list];
    });
  }

  getListthongketaichinh(nam?: number) {
     let n = 0;
     if(nam == undefined) {
       let date =new Date();
       let namhientai = date.getFullYear();
       n = namhientai;
     } else {
       n = nam;
     }
     let req = {
       nam : n
     }
     this.commonService
     .listtaichinh(req)
     .pipe()
     .subscribe(data => {
       for(let element of data) {
         this.itemObjdoanhthu = {
           type : element['Thang'],
           value: element['tongdoanhthu']
         }
         this.lstdatadoanhthu.push(this.itemObjdoanhthu)
         this.itemObjchiphi = {
           type : element['Thang'],
           value: element['tongchiphi']
         }
         this.lstdatachiphi.push(this.itemObjchiphi)
         this.itemObjloinhuan = {
           type : element['Thang'],
           value: element['loinhuan']
         }
         this.lstdataloinhuan.push(this.itemObjloinhuan);
       }
       this.initDoanhthu(this.lstdatadoanhthu);
       this.cdr.markForCheck();
     })
  }

  getThongketaichinhnam(nam?: number) {
    let n = 0;
    if(nam == undefined) {
     let date =new Date();
     let namhientai = date.getFullYear();
     n= namhientai;
    } else {
      n = nam;
    }
    let req = {
      nam : n
    }
    this.commonService.thongketaichinhnam(req)
    .pipe()
    .subscribe(res => {
       this.loinhuanMode = res.loinhuan;
       this.doanhthuMode = res.tongdoanhthu;
       this.chiphiMode = res.tongchiphi;
    })
  }

  getTongchuyenhangtrongnam(nam?: number) {
    let n = 0;
    if(nam == undefined) {
     let date =new Date();
     let namhientai = date.getFullYear();
     n= namhientai;
    } else {
      n = nam;
    }
    let req = {
      nam : n
    }
    this.commonService.tongchuyenhangtrongnam(req)
    .pipe()
    .subscribe(res => {
       this.tongchuyenhangMode = res
    })
  }

  getTongnoall() {
    let req = {
      idKhachhang : Const.idKhachhang
    }
    this.commonService.tongnoAll(req)
    .pipe()
    .subscribe(res => {
       this.tongnoallMode = res
    })
  }

  // list top 10 doanh thu
  getListtopdoanhthu(nam?: number) {
    let n = 0;
    if(nam == undefined) {
     let date = new Date();
     let namhientai = date.getFullYear();
     n= namhientai;
    } else {
      n = nam;
    }
    let req = {
      nam : n
    }

    this.commonService.listtopdoanhthu(req)
    .pipe()
    .subscribe(res => {
       console.log(res);
       this.listtopkh = res;
    })
  }

}
