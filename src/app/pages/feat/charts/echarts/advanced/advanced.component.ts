import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentPortal, ComponentType, Portal } from '@angular/cdk/portal';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { ConnectChartsComponent } from '@app/pages/feat/charts/echarts/advanced/connect-charts/connect-charts.component';
import { DraggableChartsComponent } from '@app/pages/feat/charts/echarts/advanced/draggable-charts/draggable-charts.component';
import { NzTabPosition } from 'ng-zorro-antd/tabs/interfaces';

type targetComp = ConnectChartsComponent | DraggableChartsComponent;

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedComponent implements OnInit {
  componentPortal?: ComponentPortal<targetComp>;
  selectedPortal!: Portal<any>;
  tabArray: Array<{ label: string; value: ComponentType<targetComp> }> = [
    { label: 'Connect Charts', value: ConnectChartsComponent },
    { label: 'Draggable Chart', value: DraggableChartsComponent }
  ];

  tabPosition: NzTabPosition = 'left';

  constructor(private cdr: ChangeDetectorRef, private breakpointObserver: BreakpointObserver) {}

  to(tabIndex: number): void {
    this.componentPortal = new ComponentPortal(this.tabArray[tabIndex].value);
    this.selectedPortal = this.componentPortal;
  }

  ngOnInit(): void {
    this.to(0);
    this.breakpointObserver.observe(['(max-width: 767px)']).subscribe(result => {
      this.tabPosition = result.matches ? 'top' : 'left';
      this.cdr.markForCheck();
    });
  }
}
