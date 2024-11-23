import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentPortal, ComponentType, Portal, PortalModule } from '@angular/cdk/portal';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { EventsChartsComponent } from '@app/pages/feat/charts/echarts/started/events-charts/events-charts.component';
import { InitOptsChartsComponent } from '@app/pages/feat/charts/echarts/started/init-opts-charts/init-opts-charts.component';
import { InstanceOptsChartsComponent } from '@app/pages/feat/charts/echarts/started/instance-opts-charts/instance-opts-charts.component';
import { LoadingChartsComponent } from '@app/pages/feat/charts/echarts/started/loading-charts/loading-charts.component';
import { MergeChartsComponent } from '@app/pages/feat/charts/echarts/started/merge-charts/merge-charts.component';
import { SimpleChartComponent } from '@app/pages/feat/charts/echarts/started/simple-chart/simple-chart.component';
import { ThemeChartsComponent } from '@app/pages/feat/charts/echarts/started/theme-charts/theme-charts.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTabsModule, NzTabPosition } from 'ng-zorro-antd/tabs';

type targetComp = EventsChartsComponent | InitOptsChartsComponent | InstanceOptsChartsComponent | LoadingChartsComponent | MergeChartsComponent | SimpleChartComponent | ThemeChartsComponent;

@Component({
  selector: 'app-started',
  templateUrl: './started.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzCardModule, NzTabsModule, PortalModule]
})
export class StartedComponent implements OnInit {
  tabPosition: NzTabPosition = 'left';
  componentPortal?: ComponentPortal<targetComp>;
  selectedPortal!: Portal<NzSafeAny>;
  tabArray: Array<{ label: string; value: ComponentType<targetComp> }> = [
    { label: 'Simple Chart', value: SimpleChartComponent },
    { label: 'Events', value: EventsChartsComponent },
    { label: '[theme]', value: ThemeChartsComponent },
    { label: '[loading]', value: LoadingChartsComponent },
    { label: '[merge]', value: MergeChartsComponent },
    { label: '[initOpts]', value: InitOptsChartsComponent },
    { label: 'ECharts Instance', value: InstanceOptsChartsComponent }
  ];
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  private breakpointObserver = inject(BreakpointObserver);

  to(tabIndex: number): void {
    this.componentPortal = new ComponentPortal(this.tabArray[tabIndex].value);
    this.selectedPortal = this.componentPortal;
  }

  ngOnInit(): void {
    this.to(0);

    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.tabPosition = result.matches ? 'top' : 'left';
        this.cdr.markForCheck();
      });
  }
}
