import { AfterViewInit, ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

import { PreloaderService } from '@core/services/common/preloader.service';
import { LockScreenComponent } from '@shared/components/lock-screen/lock-screen.component';
import { LockScreenStoreService } from '@store/common-store/lock-screen-store.service';
import { SpinService } from '@store/common-store/spin.service';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzFloatButtonTopComponent } from 'ng-zorro-antd/float-button';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-root',
  template: `
    @if (lockedState()!.locked) {
      <app-lock-screen></app-lock-screen>
    }
    <nz-float-button-top></nz-float-button-top>
    <div class="full-height">
      <router-outlet></router-outlet>
    </div>
    @if (loading()) {
      <div style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:1001;background:rgba(24,144,255,0.1);">
        <div style="position:absolute;top: 50%;left:50%;margin:-16px 0 0 -16px;">
          <nz-spin nzSize="large"></nz-spin>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LockScreenComponent, RouterOutlet, NzSpinModule, NzFloatButtonTopComponent]
})
export class App implements OnInit, AfterViewInit {
  private preloader = inject(PreloaderService);
  private lockScreenStoreService = inject(LockScreenStoreService);
  private spinService = inject(SpinService);
  private router = inject(Router);

  loading = computed(() => this.spinService.$globalSpinStore());
  lockedState = computed(() => {
    return this.lockScreenStoreService.lockScreenSignalStore();
  });
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: NzSafeAny) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.spinService.$globalSpinStore.set(false);
      });
  }

  ngAfterViewInit(): void {
    this.preloader.removePreLoader();
  }
}
