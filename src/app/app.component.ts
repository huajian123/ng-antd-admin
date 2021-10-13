import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SpinService} from './core/services/store/spin/spin.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
@Component({
  selector: 'app-root',
  template: `
    <nz-back-top></nz-back-top>
    <router-outlet></router-outlet>
    <div *ngIf="loading$|async"
         style="position:fixed;top:0px;left:0px;width:100%;height:100%;z-index:1001;background:rgba(24,144,255,0.1);">
      <div style="position:absolute;top: 50%;left:50%;margin:-16px 0 0 -16px;">
        <nz-spin nzSize="large"></nz-spin>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  loading$ = this.spinService.getCurrentGlobalSpinStore();

  constructor(private spinService: SpinService, public router: Router) {
  }

  ngOnInit(): void {
    (this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))).subscribe((event: any) => {
      this.spinService.setCurrentGlobalSpinStore(false);
    });
  }
}

