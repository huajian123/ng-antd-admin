import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SpinService} from '@core/services/store/spin/spin.service';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs/operators';
import {fadeRouteAnimation} from "./animations/fade.animation";
import {PreloaderService} from "@core/services/common/preloader.service";
import {LockScreenStoreService} from "@store/lock-screen-store/lock-screen-store.service";
import {NzSafeAny} from "ng-zorro-antd/core/types";

@Component({
  selector: 'app-root',
  template: `
    <app-lock-screen *ngIf="(lockedState$|async)!.locked"></app-lock-screen>
    <nz-back-top></nz-back-top>
    <div style="height: 100%" [@fadeRouteAnimation]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
    <div *ngIf="loading$|async"
         style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:1001;background:rgba(24,144,255,0.1);">
      <div style="position:absolute;top: 50%;left:50%;margin:-16px 0 0 -16px;">
        <nz-spin nzSize="large"></nz-spin>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeRouteAnimation
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  loading$ = this.spinService.getCurrentGlobalSpinStore();
  lockedState$ = this.lockScreenStoreService.getLockScreenStore();

  constructor(private lockScreenStoreService: LockScreenStoreService, private preloader: PreloaderService, private spinService: SpinService, public router: Router) {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['key'];
  }

  ngOnInit(): void {
    (this.router.events.pipe(filter((event: NzSafeAny) => event instanceof NavigationEnd))).subscribe((event: NzSafeAny) => {
      this.spinService.setCurrentGlobalSpinStore(false);
    });
  }

  ngAfterViewInit(): void {
    this.preloader.removePreLoader();
  }
}

