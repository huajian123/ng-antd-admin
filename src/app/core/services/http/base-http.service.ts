import {HttpClient, HttpParams} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Observable} from 'rxjs';
import * as qs from 'qs';
import {environment} from '../../../../environments/environment';
import {filter, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

export interface MyHttpConfig {
  needIntercept?: boolean;
  needSuccessInfo?: boolean;
  showLoading?: boolean;
}

export interface ActionResult<T> {
  code: number;
  msg: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  uri: string;

  protected constructor(public http: HttpClient, public message: NzMessageService) {
    this.uri = environment.production ? '/' : '/site';
  }

  protected get<T>(path: string, param?: any, config?: MyHttpConfig): Observable<any> {
    config = config || {};
    const params = new HttpParams({fromString: qs.stringify(param)});
    return this.http.get<ActionResult<T>>(this.uri + path, {params}).pipe(
      filter((item) => {
        return this.handleFilter(item, !!(config?.needSuccessInfo));
      }),
      map(item => item.data)
    );
  }

  post<T>(path: string, param?: any, config?: MyHttpConfig): Observable<any> {
    config = config || {needSuccessInfo: false};
    return this.http.post<ActionResult<T>>(this.uri + path, param).pipe(
      filter((item) => {
        return this.handleFilter(item, !!(config?.needSuccessInfo));
      }),
      map(item => item.data)
    );
  }

  handleFilter(item: ActionResult<any>, needSuccessInfo: boolean): boolean {
    if (item.code !== 0) {
       this.message.error(item.msg);
    } else if (needSuccessInfo) {
       this.message.success('操作成功');
    }
    return item.code === 0;
  }
}
