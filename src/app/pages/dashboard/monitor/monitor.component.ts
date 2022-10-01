import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, Injector, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BaseComponent } from '../../system/base/base.component';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonitorComponent extends BaseComponent{
  DisplayUrl: any;
  constructor(
    protected override  injector: Injector,
    protected override router: Router,
  ) {
    super(injector,router);
   }

  title: any;

  fnDestroy() {
    throw new Error('Method not implemented.');
  }
  fnInit() {
    this.title = "nam pham"
  }

}
