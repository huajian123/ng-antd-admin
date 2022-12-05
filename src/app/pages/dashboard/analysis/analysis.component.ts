import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { Chart } from '@antv/g2';
import { Pie, RingProgress, TinyColumn, TinyArea, Progress } from '@antv/g2plot';
import { Xe } from '@app/core/model/xe.model';
import { XeService } from '@app/core/services/http/xe/xe.service';
import { SearchCommonVO } from '@app/core/services/types';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { inNextTick } from 'ng-zorro-antd/core/util';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs';
interface DataItem {
  name: string;
  chinese: number;
  math: number;
  english: number;
}

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalysisComponent implements OnInit, AfterViewInit {
  cardPadding = { padding: '20px 24px 8px' };
  miniBarData = [497, 666, 219, 269, 274, 337, 81, 497, 666, 219, 269];
  miniAreaData = [264, 274, 284, 294, 284, 274, 264, 264, 274, 264, 264, 264, 284, 264, 254, 264, 244, 340, 264, 243, 226, 192];
  histogramData = [
    { type: 'Tháng 1', value: 769 },
    { type: 'Tháng 2', value: 769 },
    { type: 'Tháng 3', value: 861 },
    { type: 'Tháng 4', value: 442 },
    { type: 'Tháng 5', value: 555 },
    { type: 'Tháng 6', value: 439 },
    { type: 'Tháng 7', value: 590 },
    { type: 'Tháng 8', value: 434 },
    { type: 'Tháng 9', value: 843 },
    { type: 'Tháng 10', value: 840 },
    { type: 'Tháng 11', value: 769 },
    { type: 'Tháng 12', value: 769 }
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
  listOfData: DataItem[] = [
    {
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70
    },
    {
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70
    },
    {
      name: 'Jim Green',
      chinese: 98,
      math: 66,
      english: 89
    },
    {
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70
    },
    {
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89
    }
  ];

  date = null;

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];

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
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    public message: NzMessageService,
    private xeService: XeService,
    
    ) {}

  ngOnInit(): void {
    this.getAllxe();
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

  initHistogram(): void {
    const chart = new Chart({
      container: 'histogram',
      autoFit: true,
      height: 295,
      padding: [40, 40, 32, 72]
    });
    chart.data(this.histogramData);
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
        this.initHistogram();
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

}
