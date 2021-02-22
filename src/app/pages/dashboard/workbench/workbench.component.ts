import {AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzFormTooltipIcon} from 'ng-zorro-antd/form';
import {PageHeaderType} from '../../../share/components/page-header/page-header.component';
import {MyTableConfig} from '../../../share/components/ant-table/ant-table.component';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {SearchCommonVO} from '../../../core/services/types';
import {ActionCode} from '../../../configs/actionCode';
import {NzMessageService} from 'ng-zorro-antd/message';
import {inNextTick} from 'ng-zorro-antd/core/util';
import {Radar} from '@antv/g2plot';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkbenchComponent implements OnInit, AfterViewInit {
  @ViewChild('pageHeaderContent', {static: false}) pageHeaderContent!: TemplateRef<any>;
  radarData = [
    {item: 'Design', user: 'a', score: 70},
    {item: 'Design', user: 'b', score: 30},
    {item: 'Development', user: 'a', score: 60},
    {item: 'Development', user: 'b', score: 70},
    {item: 'Marketing', user: 'a', score: 50},
    {item: 'Marketing', user: 'b', score: 60},
    {item: 'Users', user: 'a', score: 40},
    {item: 'Users', user: 'b', score: 50},
    {item: 'Test', user: 'a', score: 60},
    {item: 'Test', user: 'b', score: 70},
    {item: 'Language', user: 'a', score: 70},
    {item: 'Language', user: 'b', score: 50},
    {item: 'Technology', user: 'a', score: 50},
    {item: 'Technology', user: 'b', score: 40},
    {item: 'Support', user: 'a', score: 30},
    {item: 'Support', user: 'b', score: 40},
    {item: 'Sales', user: 'a', score: 60},
    {item: 'Sales', user: 'b', score: 40},
    {item: 'UX', user: 'a', score: 50},
    {item: 'UX', user: 'b', score: 60}
  ];
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    desc: ''
  };

  constructor(private fb: FormBuilder, public msg: NzMessageService, private ngZone: NgZone) {
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: '工作台',
      breadcrumb: ['首页', 'Dashboard', '工作台'],
      desc: this.pageHeaderContent
    };
    inNextTick().subscribe(() => {
      this.initRadar();
    });

  }

  private initRadar(): void {
    this.ngZone.runOutsideAngular(() => {
      const radarPlot = new Radar('randar', {
        data: this.radarData,
        xField: 'item',
        yField: 'score',
        seriesField: 'user',
        meta: {
          score: {
            alias: '分数',
            min: 0,
            max: 80,
          },
        },
        xAxis: {
          line: null,
          tickLine: null,
          grid: {
            line: {
              style: {
                lineDash: null,
              },
            },
          },
        },
        // 开启辅助点
        point: {
          size: 2,
        },
      });
      radarPlot.render();
    });
  }
}
