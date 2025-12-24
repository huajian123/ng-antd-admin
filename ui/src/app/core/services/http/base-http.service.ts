import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { localUrl } from '@env/environment.prod';
import * as qs from 'qs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';

export interface HttpCustomConfig {
  needSuccessInfo?: boolean; // 是否需要"操作成功"提示
  showLoading?: boolean; // 是否需要loading
  otherUrl?: boolean; // 是否是第三方接口
  loadingText?: string; // 可选：自定义Loading文案
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
  http = inject(HttpClient);
  message = inject(NzMessageService);

  protected constructor() {
    this.uri = environment.production ? localUrl : '/site/api';
  }

  get<T>(path: string, param?: NzSafeAny, config?: HttpCustomConfig): Observable<T> {
    config = config || { needSuccessInfo: false };
    const reqPath = this.getUrl(path, config);
    const params = new HttpParams({ fromString: qs.stringify(param) });

    // 获取关闭loading的回调函数
    const closeLoading = this.handleLoading(config);

    return this.http.get<ActionResult<T>>(reqPath, { params }).pipe(
      finalize(closeLoading), // 无论成功失败，接口结束时立即调用关闭逻辑
      this.resultHandle<T>(config)
    );
  }

  delete<T>(path: string, param?: NzSafeAny, config?: HttpCustomConfig): Observable<T> {
    config = config || { needSuccessInfo: false };
    const reqPath = this.getUrl(path, config);
    const params = new HttpParams({ fromString: qs.stringify(param) });

    const closeLoading = this.handleLoading(config);

    return this.http.delete<ActionResult<T>>(reqPath, { params }).pipe(
      finalize(closeLoading), // 无论成功失败，接口结束时立即调用关闭逻辑
      this.resultHandle<T>(config)
    );
  }

  post<T>(path: string, param?: NzSafeAny, config?: HttpCustomConfig): Observable<T> {
    config = config || { needSuccessInfo: false };
    const reqPath = this.getUrl(path, config);

    const closeLoading = this.handleLoading(config);

    return this.http.post<ActionResult<T>>(reqPath, param).pipe(
      finalize(closeLoading), // 无论成功失败，接口结束时立即调用关闭逻辑
      this.resultHandle<T>(config)
    );
  }

  put<T>(path: string, param?: NzSafeAny, config?: HttpCustomConfig): Observable<T> {
    config = config || { needSuccessInfo: false };
    const reqPath = this.getUrl(path, config);

    const closeLoading = this.handleLoading(config);

    return this.http.put<ActionResult<T>>(reqPath, param).pipe(
      finalize(closeLoading), // 无论成功失败，接口结束时立即调用关闭逻辑
      this.resultHandle<T>(config)
    );
  }

  downLoadWithBlob(path: string, param?: NzSafeAny, config?: HttpCustomConfig): Observable<NzSafeAny> {
    config = config || { needSuccessInfo: false };
    const reqPath = this.getUrl(path, config);

    const closeLoading = this.handleLoading(config);

    return this.http
      .post(reqPath, param, {
        responseType: 'blob',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      })
      .pipe(finalize(closeLoading));
  }

  getUrl(path: string, config: HttpCustomConfig): string {
    let reqPath = this.uri + path;
    if (config.otherUrl) {
      reqPath = path;
    }
    return reqPath;
  }

  /**
   * Loading处理逻辑
   * 即使接口瞬间返回，Loading 也会坚持展示最少 500ms
   */
  private handleLoading(config: HttpCustomConfig): () => void {
    if (config.showLoading) {
      const startTime = Date.now();
      // 注意：设置 nzDuration: 0 为手动关闭，否则会被默认的 3000ms 自动消除逻辑干扰
      const msgRef = this.message.loading(config.loadingText || '加载中...', { nzDuration: 0 });

      return () => {
        const elapsed = Date.now() - startTime;
        const minDuration = 500; // 最小展示 500ms
        const remaining = minDuration - elapsed;

        if (remaining > 0) {
          // 如果请求太快（比如 50ms），则延迟 450ms 后再移除 Loading
          // 此时数据已经返回给页面了，但 Loading 还在
          setTimeout(() => {
            this.message.remove(msgRef.messageId);
          }, remaining);
        } else {
          // 如果请求本身就很慢（超过 500ms），立即移除
          this.message.remove(msgRef.messageId);
        }
      };
    }
    return () => {};
  }

  resultHandle<T>(config: HttpCustomConfig): (observable: Observable<ActionResult<T>>) => Observable<T> {
    return (observable: Observable<ActionResult<T>>) => {
      return observable.pipe(
        filter(item => {
          return this.handleFilter(item, !!config.needSuccessInfo);
        }),
        map(item => {
          if (![200, 201].includes(item.code)) {
            throw new Error(item.msg);
          }
          return item.data;
        })
      );
    };
  }

  handleFilter<T>(item: ActionResult<T>, needSuccessInfo: boolean): boolean {
    if (![200, 201].includes(item.code)) {
      this.message.error(item.msg);
    } else if (needSuccessInfo) {
      this.message.success('操作成功');
    }
    return true;
  }
}
