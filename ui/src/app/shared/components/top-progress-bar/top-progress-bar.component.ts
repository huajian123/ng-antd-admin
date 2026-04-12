import { ChangeDetectionStrategy, Component, inject, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-top-progress-bar',
  templateUrl: './top-progress-bar.component.html',
  styleUrl: './top-progress-bar.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class TopProgressBarComponent {
  isFetching = signal(false);

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(evt => {
      // 表示在惰性加载某个路由配置前触发的事件。
      if (!this.isFetching() && evt instanceof RouteConfigLoadStart) {
        this.isFetching.set(true);
      }
      if (!this.isFetching() && evt instanceof NavigationStart) {
        this.isFetching.set(true);
      }
      if (evt instanceof NavigationError || evt instanceof NavigationCancel) {
        this.isFetching.set(false);
        if (evt instanceof NavigationError) {
          console.error('路由跳转失败');
        }
        return;
      }
      if (!(evt instanceof NavigationEnd || evt instanceof RouteConfigLoadEnd)) {
        return;
      }
      if (this.isFetching()) {
        timer(600).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          this.isFetching.set(false);
        });
      }
    });
  }
}
