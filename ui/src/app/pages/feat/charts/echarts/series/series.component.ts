import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentPortal, ComponentType, Portal, PortalModule } from '@angular/cdk/portal';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FromLeftToRightComponent } from '@app/pages/feat/charts/echarts/series/from-left-to-right/from-left-to-right.component';
import { RadialTreeComponent } from '@app/pages/feat/charts/echarts/series/radial-tree/radial-tree.component';
import { SimpleGraphComponent } from '@app/pages/feat/charts/echarts/series/simple-graph/simple-graph.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTabPosition, NzTabsModule } from 'ng-zorro-antd/tabs';

type targetComp = SimpleGraphComponent | FromLeftToRightComponent | RadialTreeComponent;

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzCardModule, NzTabsModule, PortalModule]
})
export class SeriesComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  componentPortal?: ComponentPortal<targetComp>;
  selectedPortal!: Portal<NzSafeAny>;
  tabArray: Array<{ label: string; value: ComponentType<targetComp> }> = [
    { label: 'Simple Graph', value: SimpleGraphComponent },
    { label: 'From Left To Right', value: FromLeftToRightComponent },
    { label: 'Radial Tree', value: RadialTreeComponent }
  ];
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
