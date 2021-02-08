import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError, NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-top-progress-bar',
  templateUrl: './top-progress-bar.component.html',
  styleUrls: ['./top-progress-bar.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopProgressBarComponent {
  isFetching = false;

  constructor(private  router: Router, private cdr: ChangeDetectorRef) {
    // scroll to top in change page
    router.events.subscribe(evt => {
      // 表示在惰性加载某个路由配置前触发的事件。
      console.log(!this.isFetching && evt instanceof RouteConfigLoadStart);
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
        this.cdr.markForCheck();
      }
      if (!this.isFetching && evt instanceof NavigationStart) {
        this.isFetching = true;
        this.cdr.markForCheck();
      }
      if (evt instanceof NavigationError || evt instanceof NavigationCancel) {
        this.isFetching = false;
        if (evt instanceof NavigationError) {
          // _message.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
        }
        this.cdr.markForCheck();
        return;
      }
      if (!(evt instanceof NavigationEnd || evt instanceof RouteConfigLoadEnd)) {
        return;
      }
      if (this.isFetching) {
        setTimeout(() => {
          this.isFetching = false;
          this.cdr.markForCheck();
        }, 300);
      }
    });
  }
}
