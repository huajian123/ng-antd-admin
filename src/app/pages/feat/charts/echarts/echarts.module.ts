import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';

import { AdvancedComponent } from './advanced/advanced.component';
import { ConnectChartsComponent } from './advanced/connect-charts/connect-charts.component';
import { DraggableChartsComponent } from './advanced/draggable-charts/draggable-charts.component';
import { EchartsRoutingModule } from './echarts-routing.module';
import { EchartsComponent } from './echarts.component';
import { FromLeftToRightComponent } from './series/from-left-to-right/from-left-to-right.component';
import { RadialTreeComponent } from './series/radial-tree/radial-tree.component';
import { SeriesComponent } from './series/series.component';
import { SimpleGraphComponent } from './series/simple-graph/simple-graph.component';
import { EventsChartsComponent } from './started/events-charts/events-charts.component';
import { InitOptsChartsComponent } from './started/init-opts-charts/init-opts-charts.component';
import { InstanceOptsChartsComponent } from './started/instance-opts-charts/instance-opts-charts.component';
import { LoadingChartsComponent } from './started/loading-charts/loading-charts.component';
import { MergeChartsComponent } from './started/merge-charts/merge-charts.component';
import { SimpleChartComponent } from './started/simple-chart/simple-chart.component';
import { StartedComponent } from './started/started.component';
import { ThemeChartsComponent } from './started/theme-charts/theme-charts.component';

@NgModule({
  declarations: [
    EchartsComponent,
    StartedComponent,
    AdvancedComponent,
    SeriesComponent,
    SimpleChartComponent,
    EventsChartsComponent,
    ThemeChartsComponent,
    LoadingChartsComponent,
    MergeChartsComponent,
    InitOptsChartsComponent,
    InstanceOptsChartsComponent,
    ConnectChartsComponent,
    DraggableChartsComponent,
    SimpleGraphComponent,
    FromLeftToRightComponent,
    RadialTreeComponent
  ],
  imports: [
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    EchartsRoutingModule,
    PortalModule
  ]
})
export class EchartsModule {}
