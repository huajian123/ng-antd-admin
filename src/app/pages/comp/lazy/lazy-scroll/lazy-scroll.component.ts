import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, AfterViewInit, NgZone } from '@angular/core';
import { fromEvent, take } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

import { LazyServiceService } from '@app/pages/comp/lazy/lazy-service.service';
import { DestroyService } from '@core/services/common/destory.service';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { AdDirective } from '@shared/directives/ad.directive';

import { AdDirective as AdDirective_1 } from '../../../../shared/directives/ad.directive';

const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });

@Component({
  selector: 'app-lazy-scroll',
  templateUrl: './lazy-scroll.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LazyServiceService, DestroyService],
  standalone: true,
  imports: [PageHeaderComponent, AdDirective_1]
})
export class LazyScrollComponent implements OnInit, AfterViewInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '滚动懒加载组件示例',
    breadcrumb: ['首页', '组件', '滚动懒加载'],
    desc: '滚动页面，加载组件'
  };
  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;

  constructor(private lazyServiceService: LazyServiceService, private zone: NgZone, private cdr: ChangeDetectorRef, private destroyService$: DestroyService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.lazyServiceService.adHost = this.adHost;
    this.zone.runOutsideAngular(() => {
      fromEvent(window, 'scroll', <AddEventListenerOptions>passiveEventListenerOptions)
        .pipe(
          debounceTime(50),
          filter(() => {
            return window.scrollY >= 200;
          }),
          take(1),
          takeUntil(this.destroyService$)
        )
        .subscribe(() => {
          this.lazyServiceService.create().then(() => {
            this.cdr.detectChanges();
          });
        });
    });
  }
}
