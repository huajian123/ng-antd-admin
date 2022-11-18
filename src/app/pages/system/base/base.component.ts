

import { Component,OnDestroy, OnInit, Injector, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IObjectString } from 'src/app/common/IObject';
import { WebserviceService,ObjectDataSC ,Product} from 'src/app/core/services/common/webservice.service';
import { $timeout } from 'src/app/common/Time';
import * as Const from 'src/app/common/const';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UrlDisplayId } from '@app/common/UrlDisplay';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    providers: [DatePipe]
  })
export abstract class BaseComponent implements OnInit, OnDestroy {

    formItemNm: IObjectString = {};
    list:any = [];
    title = 'nam pham';
    constructor(
        protected webService: WebserviceService,
        protected router:Router,
        protected  cdf :  ChangeDetectorRef,
        protected datePipe: DatePipe
    ) { }
    ngOnDestroy(): void {
        this.destroy();
    }
    ngOnInit() {
       this.setFormItemNm();
    }

    setFormItemNm() {
        let url = this.router.url;
        this.webService.PostCallWs(Const.Ant100PostUrlParams,{url: url}, (response) => {
            this.list = response;
            this.list.forEach((row: { stt: string; title1: string }) => {
              this.formItemNm[row.stt] = row.title1;
            });
            this.fnInit();
        });
    }

    getDate() {
        let date = this.datePipe.transform(new Date(), 'dd/MM/yyyy') + "";
        return date;
    }

    formatDate(d: any) {
        if(d == null || d == '') {
            return '';
        }
        let date = this.datePipe.transform(d, 'dd/MM/yyyy') + "";
        return date;
    }

    abstract fnInit(): any;
    abstract destroy(): any;
    abstract DisplayScreenID: UrlDisplayId;
}
