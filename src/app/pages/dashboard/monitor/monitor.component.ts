import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { BaseComponent } from '../../system/base/base.component';
@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonitorComponent extends BaseComponent{

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    desc: ''
  };


 constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
  ){
    super(webService,router,cdf,datePipe);
  }

  @ViewChild('pageHeaderContent', { static: false }) pageHeaderContent!: TemplateRef<NzSafeAny>;

  fnInit(){
    
    this.cdf.markForCheck();

    this.pageHeaderInfo = {
      title: this.formItemNm[3],
      breadcrumb: [this.formItemNm[1], this.formItemNm[2], this.formItemNm[3]],
      desc: this.pageHeaderContent
    };
  }
  destroy() {}

}
