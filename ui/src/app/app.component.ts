import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

import { PreloaderService } from '@core/services/common/preloader.service';
import { LockScreenComponent } from '@shared/components/lock-screen/lock-screen.component';
import { LockScreenStoreService } from '@store/common-store/lock-screen-store.service';
import { SpinService } from '@store/common-store/spin.service';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { fadeRouteAnimation } from './animations/fade.animation';

@Component({
  selector: 'app-root',
  template: `
    @if ((lockedState$ | async)!.locked) {
      <app-lock-screen></app-lock-screen>
    }
    <nz-back-top></nz-back-top>
    <div class="full-height" [@fadeRouteAnimation]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
    @if (loading$ | async) {
      <div style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:1001;background:rgba(24,144,255,0.1);">
        <div style="position:absolute;top: 50%;left:50%;margin:-16px 0 0 -16px;">
          <nz-spin nzSize="large"></nz-spin>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeRouteAnimation],
  standalone: true,
  imports: [LockScreenComponent, NzBackTopModule, RouterOutlet, NzSpinModule, AsyncPipe]
})
export class AppComponent implements OnInit, AfterViewInit {
  private preloader = inject(PreloaderService);
  private lockScreenStoreService = inject(LockScreenStoreService);
  private spinService = inject(SpinService);
  private router = inject(Router);

  loading$ = this.spinService.getCurrentGlobalSpinStore();
  lockedState$ = this.lockScreenStoreService.getLockScreenStore();
  destroyRef = inject(DestroyRef);

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.['key'];
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: NzSafeAny) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.spinService.setCurrentGlobalSpinStore(false);
      });
  }

  ngAfterViewInit(): void {
    this.preloader.removePreLoader();
  }
}
