
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PageInfo, SearchCommonVO } from '@core/services/types';
import { BaseHttpService } from '@services/base-http.service';
import * as Const from "src/app/common/const"

export interface DataScObj {
  idmenu: string,
  title1: string;
  title2: string;
  lang:string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DatascService {
  constructor(public http: BaseHttpService) {}

  public getDataSc(param: SearchCommonVO<DataScObj>): Observable<PageInfo<DataScObj>> {
    return this.http.post(Const.Ant100findAllDatasc, param);
  }

  public addDatasc(param: any): Observable<void> {
    return this.http.post(Const.Ant100AddListDatasc, param);
  }

  public delDatasc(ids: number[]): Observable<void> {
    return this.http.post('/user/del/', { ids });
  }

  public editDatasc(param: DataScObj): Observable<void> {
    return this.http.put(Const.Ant100EditDetailUser, param);
  }
}