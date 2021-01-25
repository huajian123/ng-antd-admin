import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TinyColumn} from '@antv/g2plot';
import {TinyArea} from '@antv/g2plot';
import {Progress} from '@antv/g2plot';
import {Chart} from '@antv/g2';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisComponent implements OnInit, AfterViewInit {
  cardPadding = {padding: '20px 24px 8px'};
  miniBarData = [497, 666, 219, 269, 274, 337, 81, 497, 666, 219, 269];
  miniAreaData = [264, 274, 284, 294, 284, 274, 264, 264, 274, 264, 264, 264, 284, 264, 254, 264, 244, 340, 264, 243, 226, 192];
  histogramData = [
    {type: '1月', value: 769},
    {type: '2月', value: 769},
    {type: '3月', value: 861},
    {type: '4月', value: 442},
    {type: '5月', value: 555},
    {type: '6月', value: 439},
    {type: '7月', value: 590},
    {type: '8月', value: 434},
    {type: '9月', value: 843},
    {type: '10月', value: 840},
    {type: '11月', value: 769},
    {type: '12月', value: 769},
  ];

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  initMinibar(): void {
    const data = this.miniBarData;
    const tinyColumn = new TinyColumn('miniBar', {
      autoFit: true,
      height: 14,
      width: 200,
      data: data,
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
        fill: '#d6e3fd',
      },
    });

    tinyArea.render();
  }

  initProgress(): void {
    const progress = new Progress('progress', {
      height: 14,
      width: 200,
      autoFit: true,
      percent: 0.7,
      color: ['#5B8FF9', '#E8EDF3'],
    });

    progress.render();
  }

  initHistogram(): void {

    const chart = new Chart({
      container: 'histogram',
      autoFit: true,
      height: 295,
      padding: [40, 40, 32, 72],
    });
    chart.data(this.histogramData);
    chart.scale('value', {
      nice: true,
    });
    chart.axis('type', {
      tickLine: null,
    });

    chart.axis('value', {
      label: {
        formatter: (val) => {
          return +val;
        },
      },
    });

    chart.tooltip({
      showMarkers: false,
    });
    chart.interaction('element-active');

    chart.legend(false);
    // todo
    // @ts-ignore
    chart
      .interval()
      .position('type*value')
      .color('type', (val) => {
        if (val === '10-30分' || val === '30+分') {
          return '#ff4d4f';
        }
        return '#2194ff';
      })
      .label('value', {
        offset: 10,
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
        fill: '#d6e3fd',
      },
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
        fill: '#d6e3fd',
      },
    });
    tinyArea.render();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMinibar();
      this.initMiniArea();
      this.initProgress();
      this.initHistogram();
      this.initSearchArea();
      this.initSearchAvgArea();
    });
  }
}
