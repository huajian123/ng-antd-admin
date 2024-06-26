import { DecimalPipe, PercentPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, inject, NgZone } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import AMapLoader from '@amap/amap-jsapi-loader';
import { Gauge, Liquid, RingProgress, TinyArea, WordCloud } from '@antv/g2plot';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCardModule } from 'ng-zorro-antd/card';
import { inNextTick } from 'ng-zorro-antd/core/util';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzCardModule, NzBreadCrumbModule, NzGridModule, NzStatisticModule, NzTypographyModule, DecimalPipe, PercentPipe]
})
export class MonitorComponent implements AfterViewInit {
  deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  destroyRef = inject(DestroyRef);
  miniAreaData = [264, 274, 284, 294, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390, 400, 410, 420, 430, 440, 450, 460, 470];
  wordCloudData = [
    {
      x: 'China',
      value: 1383220000,
      category: 'asia'
    },
    {
      x: 'India',
      value: 1316000000,
      category: 'asia'
    },
    {
      x: 'United States',
      value: 324982000,
      category: 'america'
    },
    {
      x: 'Indonesia',
      value: 263510000,
      category: 'asia'
    },
    {
      x: 'Brazil',
      value: 207505000,
      category: 'america'
    },
    {
      x: 'Pakistan',
      value: 196459000,
      category: 'asia'
    },
    {
      x: 'Nigeria',
      value: 191836000,
      category: 'africa'
    },
    {
      x: 'Bangladesh',
      value: 162459000,
      category: 'asia'
    },
    {
      x: 'Russia',
      value: 146804372,
      category: 'europe'
    },
    {
      x: 'Japan',
      value: 126790000,
      category: 'asia'
    },
    {
      x: 'Mexico',
      value: 123518000,
      category: 'america'
    },
    {
      x: 'Ethiopia',
      value: 104345000,
      category: 'africa'
    },
    {
      x: 'Philippines',
      value: 104037000,
      category: 'asia'
    },
    {
      x: 'Egypt',
      value: 93013300,
      category: 'africa'
    },
    {
      x: 'Vietnam',
      value: 92700000,
      category: 'asia'
    },
    {
      x: 'Germany',
      value: 82800000,
      category: 'europe'
    },
    {
      x: 'Democratic Republic of the Congo',
      value: 82243000,
      category: 'africa'
    },
    {
      x: 'Iran',
      value: 80135400,
      category: 'asia'
    },
    {
      x: 'Turkey',
      value: 79814871,
      category: 'asia'
    },
    {
      x: 'Thailand',
      value: 68298000,
      category: 'asia'
    },
    {
      x: 'France',
      value: 67013000,
      category: 'europe'
    },
    {
      x: 'United Kingdom',
      value: 65110000,
      category: 'europe'
    },
    {
      x: 'Italy',
      value: 60599936,
      category: 'europe'
    },
    {
      x: 'Tanzania',
      value: 56878000,
      category: 'africa'
    },
    {
      x: 'South Africa',
      value: 55908000,
      category: 'africa'
    },
    {
      x: 'Myanmar',
      value: 54836000,
      category: 'asia'
    },
    {
      x: 'South Korea',
      value: 51446201,
      category: 'asia'
    },
    {
      x: 'Colombia',
      value: 49224700,
      category: 'america'
    },
    {
      x: 'Kenya',
      value: 48467000,
      category: 'africa'
    },
    {
      x: 'Spain',
      value: 46812000,
      category: 'europe'
    },
    {
      x: 'Argentina',
      value: 43850000,
      category: 'america'
    },
    {
      x: 'Ukraine',
      value: 42541633,
      category: 'europe'
    },
    {
      x: 'Sudan',
      value: 42176000,
      category: 'africa'
    },
    {
      x: 'Uganda',
      value: 41653000,
      category: 'africa'
    },
    {
      x: 'Algeria',
      value: 41064000,
      category: 'africa'
    },
    {
      x: 'Poland',
      value: 38424000,
      category: 'europe'
    },
    {
      x: 'Iraq',
      value: 37883543,
      category: 'asia'
    },
    {
      x: 'Canada',
      value: 36541000,
      category: 'america'
    },
    {
      x: 'Morocco',
      value: 34317500,
      category: 'africa'
    },
    {
      x: 'Saudi Arabia',
      value: 33710021,
      category: 'asia'
    },
    {
      x: 'Uzbekistan',
      value: 32121000,
      category: 'asia'
    },
    {
      x: 'Malaysia',
      value: 32063200,
      category: 'asia'
    },
    {
      x: 'Peru',
      value: 31826018,
      category: 'america'
    },
    {
      x: 'Venezuela',
      value: 31431164,
      category: 'america'
    },
    {
      x: 'Nepal',
      value: 28825709,
      category: 'asia'
    },
    {
      x: 'Angola',
      value: 28359634,
      category: 'africa'
    },
    {
      x: 'Ghana',
      value: 28308301,
      category: 'africa'
    },
    {
      x: 'Yemen',
      value: 28120000,
      category: 'asia'
    },
    {
      x: 'Afghanistan',
      value: 27657145,
      category: 'asia'
    },
    {
      x: 'Mozambique',
      value: 27128530,
      category: 'africa'
    },
    {
      x: 'Australia',
      value: 24460900,
      category: 'australia'
    },
    {
      x: 'North Korea',
      value: 24213510,
      category: 'asia'
    },
    {
      x: 'Taiwan',
      value: 23545680,
      category: 'asia'
    },
    {
      x: 'Cameroon',
      value: 23248044,
      category: 'africa'
    },
    {
      x: 'Ivory Coast',
      value: 22671331,
      category: 'africa'
    },
    {
      x: 'Madagascar',
      value: 22434363,
      category: 'africa'
    },
    {
      x: 'Niger',
      value: 21564000,
      category: 'africa'
    },
    {
      x: 'Sri Lanka',
      value: 21203000,
      category: 'asia'
    },
    {
      x: 'Romania',
      value: 19760000,
      category: 'europe'
    },
    {
      x: 'Burkina Faso',
      value: 19632147,
      category: 'africa'
    },
    {
      x: 'Syria',
      value: 18907000,
      category: 'asia'
    },
    {
      x: 'Mali',
      value: 18875000,
      category: 'africa'
    },
    {
      x: 'Malawi',
      value: 18299000,
      category: 'africa'
    },
    {
      x: 'Chile',
      value: 18191900,
      category: 'america'
    },
    {
      x: 'Kazakhstan',
      value: 17975800,
      category: 'asia'
    },
    {
      x: 'Netherlands',
      value: 17121900,
      category: 'europe'
    },
    {
      x: 'Ecuador',
      value: 16737700,
      category: 'america'
    },
    {
      x: 'Guatemala',
      value: 16176133,
      category: 'america'
    },
    {
      x: 'Zambia',
      value: 15933883,
      category: 'africa'
    },
    {
      x: 'Cambodia',
      value: 15626444,
      category: 'asia'
    },
    {
      x: 'Senegal',
      value: 15256346,
      category: 'africa'
    },
    {
      x: 'Chad',
      value: 14965000,
      category: 'africa'
    },
    {
      x: 'Zimbabwe',
      value: 14542235,
      category: 'africa'
    },
    {
      x: 'Guinea',
      value: 13291000,
      category: 'africa'
    },
    {
      x: 'South Sudan',
      value: 12131000,
      category: 'africa'
    },
    {
      x: 'Rwanda',
      value: 11553188,
      category: 'africa'
    },
    {
      x: 'Belgium',
      value: 11356191,
      category: 'europe'
    }
  ];
  private ngZone = inject(NgZone);

  initDashBoard(): void {
    const gauge = new Gauge('dashBoard', {
      percent: 0.75,
      autoFit: true,
      height: 180,
      range: {
        color: '#30BF78'
      },
      indicator: {
        pointer: {
          style: {
            stroke: '#D0D0D0'
          }
        },
        pin: {
          style: {
            stroke: '#D0D0D0'
          }
        }
      },
      axis: {
        label: {
          formatter(v) {
            return Number(v) * 100;
          }
        },
        subTickLine: {
          count: 3
        }
      },
      statistic: {
        content: {
          formatter: () => `87 %`
        }
      }
    });
    gauge.render();
  }

  initArea(): void {
    const tinyArea = new TinyArea('miniArea', {
      height: 120,
      autoFit: true,
      data: this.miniAreaData,
      smooth: true,
      areaStyle: {
        fill: '#d6e3fd'
      },
      annotations: [
        // 平均值
        {
          type: 'line',
          start: ['min', 'mean'],
          end: ['max', 'mean'],
          text: {
            content: '400亿元',
            offsetY: -2,
            style: {
              textAlign: 'left',
              fontSize: 10,
              // fill: 'rgba(44, 53, 66, 0.45)',
              textBaseline: 'bottom'
            }
          },
          style: {
            //   stroke: 'rgba(0, 0, 0, 0.25)',
          }
        },
        // 目标值
        {
          type: 'line',
          start: ['min', 800],
          end: ['max', 800],
          text: {
            content: '1400亿元',
            offsetY: -2,
            style: {
              textAlign: 'left',
              fontSize: 10,
              // fill: 'rgba(44, 53, 66, 0.45)',
              textBaseline: 'bottom'
            }
          },
          style: {
            // stroke: 'rgba(0, 0, 0, 0.55)',
          }
        }
      ]
    });
    tinyArea.render();
  }

  initLiquidPlot(): void {
    const liquidPlot = new Liquid('liquidPlot', {
      percent: 0.25,
      outline: {
        border: 4,
        distance: 8
      },
      wave: {
        length: 128
      }
    });
    liquidPlot.render();
  }

  wordCloud(): void {
    const wordCloud = new WordCloud('wordCloud', {
      data: this.wordCloudData,
      wordField: 'x',
      weightField: 'value',
      // color: '#122c6a',
      wordStyle: {
        fontFamily: 'Verdana',
        fontSize: [24, 80]
      },
      // 设置交互类型
      interactions: [{ type: 'element-active' }],
      state: {
        active: {
          // 这里可以设置 active 时的样式
          style: {
            lineWidth: 3
          }
        }
      }
    });
    inNextTick()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        wordCloud.render();
      });
  }

  initRingProgress(i: number): void {
    const ringProgress = new RingProgress(`ringProgress${i}`, {
      height: 90,
      width: 90,
      autoFit: false,
      percent: 0.7,
      color: ['#5B8FF9', '#E8EDF3']
    });

    ringProgress.render();
  }

  ngAfterViewInit(): void {
    inNextTick()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.ngZone.runOutsideAngular(() => {
          this.initDashBoard();
          this.initArea();
          this.initLiquidPlot();
          for (let i = 1; i <= 3; i++) {
            this.initRingProgress(i);
          }

          this.wordCloud();
          // 地图
          // api地址
          // https://lbs.amap.com/demo/javascript-api/example/map-lifecycle/map-show
          // 自己去申请一个key，别用我这个Key，多谢
          // 申请地址 https://console.amap.com/dev/key/app
          AMapLoader.load({
            key: '1c1b77fae2e59c25eb26ced9a0801103', //首次load必填
            version: '1.4.15',
            AMapUI: {
              version: '1.1',
              plugins: ['overlay/SimpleMarker']
            }
          })
            .then(AMap => {
              const map = new AMap.Map('map', {
                resizeEnable: true,
                zoom: 2,
                center: [116.397428, 39.90923]
              });
              const styleName = 'amap://styles/darkblue';
              map.setMapStyle(styleName);
            })
            .catch(e => {
              console.error(e);
            });
        });
      });
  }
}
