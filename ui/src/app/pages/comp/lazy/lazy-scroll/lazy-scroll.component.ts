import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { AfterViewInit, Component, ChangeDetectionStrategy, DestroyRef, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, take } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

import { LazyServiceService } from '@app/pages/comp/lazy/lazy-service.service';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { AdDirective } from '@shared/directives/ad.directive';

const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });

@Component({
  selector: 'app-lazy-scroll',
  templateUrl: './lazy-scroll.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LazyServiceService],
  imports: [PageHeaderComponent, AdDirective]
})
export class LazyScrollComponent implements AfterViewInit {
  private lazyServiceService = inject(LazyServiceService);
  private destroyRef = inject(DestroyRef);
  readonly adHost = viewChild.required(AdDirective);
  readonly pageHeaderInfo: Partial<PageHeaderType> = {
    title: '滚动懒加载组件示例',
    breadcrumb: ['首页', '组件', '滚动懒加载'],
    desc: '滚动页面，加载组件'
  };

  ngAfterViewInit(): void {
    this.lazyServiceService.adHost = this.adHost();
    fromEvent(window, 'scroll', passiveEventListenerOptions as AddEventListenerOptions)
      .pipe(
        debounceTime(50),
        filter(() => window.scrollY >= 200),
        take(1),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.lazyServiceService.create();
      });
  }
}
