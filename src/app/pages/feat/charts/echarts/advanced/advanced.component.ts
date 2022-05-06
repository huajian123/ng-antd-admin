import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ConnectChartsComponent} from "@app/pages/feat/charts/echarts/advanced/connect-charts/connect-charts.component";
import {
  DraggableChartsComponent
} from "@app/pages/feat/charts/echarts/advanced/draggable-charts/draggable-charts.component";
import {ComponentPortal, Portal} from "@angular/cdk/portal";
import {ComponentType} from "@angular/cdk/portal/portal";

type targetComp =
  ConnectChartsComponent
  | DraggableChartsComponent;

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedComponent implements OnInit {
  componentPortal?: ComponentPortal<targetComp>;
  selectedPortal!: Portal<any>;
  tabArray: { label: string, value: ComponentType<targetComp> }[] = [
    {label: 'Connect Charts', value: ConnectChartsComponent},
    {label: 'Draggable Chart', value: DraggableChartsComponent},
  ];

  constructor() {
  }

  to(tabIndex: number): void {
    this.componentPortal = new ComponentPortal(this.tabArray[tabIndex].value);
    this.selectedPortal = this.componentPortal;
  }

  ngOnInit(): void {
    this.to(0);
  }

}
