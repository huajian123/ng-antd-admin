import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SpinService} from '@core/services/store/spin-store/spin.service';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs/operators';
import {fadeRouteAnimation} from "./animations/fade.animation";
import {PreloaderService} from "@core/services/common/preloader.service";
import {LockScreenStoreService} from "@store/lock-screen-store/lock-screen-store.service";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {ModalWrapService} from "@widget/base-modal";
import {fnStopMouseEvent} from "@utils/tools";
import {DrawerWrapService} from "@app/drawer/base-drawer";

@Component({
  selector: 'app-root',
  template: `
    <app-lock-screen *ngIf="(lockedState$|async)!.locked"></app-lock-screen>
    <nz-back-top></nz-back-top>
    <div class="full-height" [@fadeRouteAnimation]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
    <div *ngIf="loading$|async"
         style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:1001;background:rgba(24,144,255,0.1);">
      <div style="position:absolute;top: 50%;left:50%;margin:-16px 0 0 -16px;">
        <nz-spin nzSize="large"></nz-spin>
      </div>
    </div>

    <ng-template #modalBtnTpl>
      <div class="center">
        <span class="hover-blue full-height flex-auto text-right d-i-b" (click)="fullScreenIconClick($event)">
            <i class="m-r-8" nz-icon [nzType]="!modalFullScreenFlag?'fullscreen':'fullscreen-exit'"
               nzTheme="outline"></i>
        </span>
        <span (click)="modalFullScreenFlag=false" class="hover-red full-height flex-auto d-i-b">
            <i nz-icon nzType="close" nzTheme="outline"></i>
        </span>
      </div>
    </ng-template>

    <ng-template #drawerFootDefaultTpl>
      <div class="end-start-center">
        <button nzType="default" class="m-r-8" (click)="drawerWrapService.cancel()" nz-button>取消</button>
        <button nzType="primary" (click)="drawerWrapService.sure()" nz-button >确定</button>
      </div>

    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeRouteAnimation
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  loading$ = this.spinService.getCurrentGlobalSpinStore();
  lockedState$ = this.lockScreenStoreService.getLockScreenStore();
  @ViewChild("modalBtnTpl") modalBtnTpl!: TemplateRef<any>;
  @ViewChild("drawerFootDefaultTpl") drawerFootDefaultTpl!: TemplateRef<any>;
  modalFullScreenFlag = false;

  constructor(public drawerWrapService: DrawerWrapService, private modalWrapService: ModalWrapService, private lockScreenStoreService: LockScreenStoreService, private preloader: PreloaderService, private spinService: SpinService, public router: Router) {
  }

  // 所有对话框扩展最大化按钮，将templateRef传入Modal基础service的妥协方法
  fullScreenIconClick($event: MouseEvent): void {
    this.modalFullScreenFlag = !this.modalFullScreenFlag;
    fnStopMouseEvent($event);
    this.modalWrapService.fullScreenIconClick();
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
    this.modalWrapService.setTemplate(this.modalBtnTpl);
    this.drawerWrapService.setTemplate(this.drawerFootDefaultTpl);
  }
}

