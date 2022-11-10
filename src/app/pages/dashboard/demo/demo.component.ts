import { Component,ChangeDetectionStrategy, Injector, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from 'src/app/pages/system/base/base.component';
import { WebserviceService } from 'src/app/core/services/common/webservice.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {  getXes } from '../../../core/store/xe/xe.action';


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
    private store: Store
  ){
    super(webService,router,cdf);
  }

  fnInit(){
    
    this.cdf.markForCheck();
  }
  destroy() {}


}
