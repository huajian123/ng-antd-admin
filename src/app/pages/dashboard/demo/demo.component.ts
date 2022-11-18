import { Component,ChangeDetectionStrategy, Injector, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from 'src/app/pages/system/base/base.component';
import { WebserviceService } from 'src/app/core/services/common/webservice.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent extends BaseComponent {

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    private store: Store
  ){
    super(webService,router,cdf,datePipe);
  }

  fnInit(){
    console.log("nam pham")
    this.cdf.markForCheck();
  }
  destroy() {}


}
