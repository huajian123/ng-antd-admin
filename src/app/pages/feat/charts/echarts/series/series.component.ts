import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ComponentPortal, Portal} from "@angular/cdk/portal";
import {ComponentType} from "@angular/cdk/portal/portal";
import {SimpleGraphComponent} from "@app/pages/feat/charts/echarts/series/simple-graph/simple-graph.component";
import {FromLeftToRightComponent} from "@app/pages/feat/charts/echarts/series/from-left-to-right/from-left-to-right.component";
import {RadialTreeComponent} from "@app/pages/feat/charts/echarts/series/radial-tree/radial-tree.component";

type targetComp =
  SimpleGraphComponent
  |FromLeftToRightComponent|RadialTreeComponent;

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesComponent implements OnInit {
  componentPortal?: ComponentPortal<targetComp>;
  selectedPortal!: Portal<any>;
  tabArray: { label: string, value: ComponentType<targetComp> }[] = [
    {label: 'Simple Graph', value: SimpleGraphComponent},
    {label: 'From Left To Right', value: FromLeftToRightComponent},
    {label: 'Radial Tree', value: RadialTreeComponent},
  ];

  constructor() { }
  to(tabIndex: number): void {
    this.componentPortal = new ComponentPortal(this.tabArray[tabIndex].value);
    this.selectedPortal = this.componentPortal;
  }

  ngOnInit(): void {
    this.to(0);
  }

}
