import { Component,ChangeDetectionStrategy, Injector, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from 'src/app/pages/system/base/base.component';
import { WebserviceService } from 'src/app/core/services/common/webservice.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DatePipe } from '@angular/common';
import { UrlDisplayId } from '@app/common/UrlDisplay';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent extends BaseComponent {
  DisplayScreenID: UrlDisplayId = UrlDisplayId.Demo;

  amountMode = 1000;
  numberMode = 1000;

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    private store: Store
  ){
    super(webService,router,cdf,datePipe);
  }

  changeAmount($event: any) {this.amountMode = $event; }
  changeNumber($event: any) {this.numberMode = $event; }

  fnInit(){
    console.log("nam pham")
    this.cdf.markForCheck();
  }
  destroy() {}


}
