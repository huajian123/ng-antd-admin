import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SpinService} from './core/services/store/spin/spin.service';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs/operators';
import {fadeRouteAnimation} from "./animations/fade.animation";
import {PreloaderService} from "./core/services/common/preloader.service";

@Component({
  selector: 'app-root',
  template: `
    <nz-back-top></nz-back-top>
    <div style="height: 100%" [@fadeRouteAnimation]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
    <div *ngIf="loading$|async"
         style="position:fixed;top:0px;left:0px;width:100%;height:100%;z-index:1001;background:rgba(24,144,255,0.1);">
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

  constructor(private preloader: PreloaderService,private spinService: SpinService, public router: Router) {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.key;
  }

  ngOnInit(): void {
    (this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))).subscribe((event: any) => {
      this.spinService.setCurrentGlobalSpinStore(false);
    });
  }

  ngAfterViewInit(): void {
    this.preloader.removePreLoader();
  }
}

