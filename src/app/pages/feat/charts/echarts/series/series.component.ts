import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentPortal, ComponentType, Portal } from '@angular/cdk/portal';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { FromLeftToRightComponent } from '@app/pages/feat/charts/echarts/series/from-left-to-right/from-left-to-right.component';
import { RadialTreeComponent } from '@app/pages/feat/charts/echarts/series/radial-tree/radial-tree.component';
import { SimpleGraphComponent } from '@app/pages/feat/charts/echarts/series/simple-graph/simple-graph.component';
import { NzTabPosition } from 'ng-zorro-antd/tabs/interfaces';

type targetComp = SimpleGraphComponent | FromLeftToRightComponent | RadialTreeComponent;

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesComponent implements OnInit {
  componentPortal?: ComponentPortal<targetComp>;
  selectedPortal!: Portal<any>;
  tabArray: Array<{ label: string; value: ComponentType<targetComp> }> = [
    { label: 'Simple Graph', value: SimpleGraphComponent },
    { label: 'From Left To Right', value: FromLeftToRightComponent },
    { label: 'Radial Tree', value: RadialTreeComponent }
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
