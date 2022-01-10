import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Observable} from 'rxjs';
import * as qs from 'qs';
import {environment} from '@env/environment';
import {filter, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {localUrl} from '@env/environment.prod';

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
    this.uri = environment.production ? localUrl : '/site';
  }

  get<T>(path: string, param?: any, config?: MyHttpConfig): Observable<any> {
    config = config || {};
    const params = new HttpParams({fromString: qs.stringify(param)});
    return this.http.get<ActionResult<T>>(this.uri + path, {params}).pipe(
      filter((item) => {
        return this.handleFilter(item, !!(config?.needSuccessInfo));
      }),
      map((item) => {
        if (item.code !== 0) {
          throw new Error(item.msg);
        }
        return item;
      }),
      map(item => item.data)
    );
  }

  delete<T>(path: string, param?: any, config?: MyHttpConfig): Observable<any> {
    config = config || {};
    const params = new HttpParams({fromString: qs.stringify(param)});
    return this.http.delete<ActionResult<T>>(this.uri + path, {params}).pipe(
      filter((item) => {
        return this.handleFilter(item, !!(config?.needSuccessInfo));
      }),
      map((item) => {
        if (item.code !== 0) {
          throw new Error(item.msg);
        }
        return item;
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
      map((item) => {
        if (item.code !== 0) {
          throw new Error(item.msg);
        }
        return item;
      }),
      map(item => item.data)
    );
  }

  put<T>(path: string, param?: any, config?: MyHttpConfig): Observable<any> {
    config = config || {needSuccessInfo: false};
    return this.http.put<ActionResult<T>>(this.uri + path, param).pipe(
      filter((item) => {
        return this.handleFilter(item, !!(config?.needSuccessInfo));
      }),
      map((item) => {
        if (item.code !== 0) {
          throw new Error(item.msg);
        }
        return item;
      }),
      map(item => item.data)
    );
  }

  downZip(path: string, param?: any): Observable<any> {
    return this.http.post(this.uri + path, param, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  handleFilter(item: ActionResult<any>, needSuccessInfo: boolean): boolean {
    if (item.code !== 0) {
      this.message.error(item.msg);
    } else if (needSuccessInfo) {
      this.message.success('操作成功');
    }
    return true;
    // return item.code === 0;
  }
}
