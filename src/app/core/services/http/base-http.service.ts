/* eslint-disable prettier/prettier */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { localUrl } from '@env/environment.prod';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as qs from 'qs';

export interface MyHttpConfig {
  needIntercept?: boolean; // 是否需要被拦截
  needSuccessInfo?: boolean; // 是否需要"操作成功"提示
  showLoading?: boolean; // 是否需要loading
  otherUrl?: boolean; // 是否是第三方接口
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
    this.uri = "http://localhost:3000/user/";//environment.production ? localUrl : '/site/api';
  }

  get<T>(path: string, param?: NzSafeAny, config?: MyHttpConfig): Observable<NzSafeAny> {
    config = config || { needSuccessInfo: false };
    this.uri = "http://localhost:3000/user/";
    let reqPath = this.uri + path;
    if (config.otherUrl) {
      reqPath = path;
    }
    const params = new HttpParams({ fromString: qs.stringify(param) });
    return this.http.get<ActionResult<T>>(reqPath, { params }).pipe(
      filter(item => {
        return this.handleFilter(item, !!config?.needSuccessInfo);
      }),
      map(item => {
        if (item.code !== 0) {
          throw new Error(item.msg);
        }
        return item;
      }),
      map(item => item.data)
    );
  }

  delete<T>(path: string, param?: NzSafeAny, config?: MyHttpConfig): Observable<NzSafeAny> {
    config = config || { needSuccessInfo: false };
    
    let reqPath = this.uri + path;
    if (config.otherUrl) {
      reqPath = path;
    }
    const params = new HttpParams({ fromString: qs.stringify(param) });
    return this.http.delete<ActionResult<T>>(reqPath, { params }).pipe(
      filter(item => {
        return this.handleFilter(item, !!config?.needSuccessInfo);
      }),
      map(item => {
        if (item.code !== 0) {
          throw new Error(item.msg);
        }
        return item;
      }),
      map(item => item.data)
    );
  }

  post<T>(path: string, param?: NzSafeAny, config?: MyHttpConfig): Observable<NzSafeAny> {
    config = config || { needSuccessInfo: false };
    this.uri = "http://localhost:3000/user";
    let reqPath = this.uri + path;
    if (config.otherUrl) {
      reqPath = path;
    }
    return this.http.post<ActionResult<T>>(reqPath, param).pipe(  //
      filter(item => {
        return this.handleFilter(item, !!config?.needSuccessInfo);
      }),
      map(item => {
        if (item.code !== 0) {
          throw new Error(item.msg);
        }
        return item;
      }),
      map(item => item.data)
    );
  }

  put<T>(path: string, param?: NzSafeAny, config?: MyHttpConfig): Observable<NzSafeAny> {
    config = config || { needSuccessInfo: false };
    let reqPath = this.uri + path;
    if (config.otherUrl) {
      reqPath = path;
    }
    return this.http.put<ActionResult<T>>(reqPath, param).pipe(
      filter(item => {
        return this.handleFilter(item, !!config?.needSuccessInfo);
      }),
      map(item => {
        if (item.code !== 0) {
          throw new Error(item.msg);
        }
        return item;
      }),
      map(item => item.data)
    );
  }

  downZip(path: string, param?: NzSafeAny, config?: MyHttpConfig): Observable<NzSafeAny> {
    config = config || { needSuccessInfo: false };
    let reqPath = this.uri + path;
    if (config.otherUrl) {
      reqPath = path;
    }
    return this.http.post(reqPath, param, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  handleFilter(item: ActionResult<NzSafeAny>, needSuccessInfo: boolean): boolean {
    if (item.code !== 0) {
      this.message.error(item.msg);
    } else if (needSuccessInfo) {
      this.message.success('Thực hiện thành công !');
    }
    return true;
    // return item.code === 0;
  }
}
