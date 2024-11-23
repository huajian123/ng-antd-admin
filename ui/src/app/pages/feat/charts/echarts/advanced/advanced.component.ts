import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentPortal, ComponentType, Portal, PortalModule } from '@angular/cdk/portal';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ConnectChartsComponent } from '@app/pages/feat/charts/echarts/advanced/connect-charts/connect-charts.component';
import { DraggableChartsComponent } from '@app/pages/feat/charts/echarts/advanced/draggable-charts/draggable-charts.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTabPosition, NzTabsModule } from 'ng-zorro-antd/tabs';

type targetComp = ConnectChartsComponent | DraggableChartsComponent;

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzCardModule, NzTabsModule, PortalModule]
})
export class AdvancedComponent implements OnInit {
  componentPortal?: ComponentPortal<targetComp>;
  selectedPortal!: Portal<NzSafeAny>;
  tabArray: Array<{ label: string; value: ComponentType<targetComp> }> = [
    { label: 'Connect Charts', value: ConnectChartsComponent },
    { label: 'Draggable Chart', value: DraggableChartsComponent }
  ];
  destroyRef = inject(DestroyRef);
  tabPosition: NzTabPosition = 'left';

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
