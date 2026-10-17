import { HttpClient, HttpHeaders, HttpParams, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injector, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { buildHttpContext } from '@core/services/interceptors/http-context-tokens';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { apiUrl } from './api-url';

export interface HttpCustomConfig {
  needSuccessInfo?: boolean; // 是否需要"操作成功"提示
  showLoading?: boolean; // 是否需要loading
  otherUrl?: boolean; // 是否是第三方接口
  loadingText?: string; // 可选：自定义Loading文案
}

export type HttpQueryParams = Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;

@Service()
export class BaseHttpService {
  http = inject(HttpClient);
  private injector = inject(Injector);

  getResource<T>(path: string, param?: HttpQueryParams, config?: HttpCustomConfig): HttpResourceRef<T> {
    const context = buildHttpContext(config);
    return httpResource<T>(
      () => ({
        url: this.getUrl(path, config),
        params: this.createHttpParams(param),
        context
      }),
      { injector: this.injector }
    ) as HttpResourceRef<T>;
  }

  postResource<T>(path: string, param: () => NzSafeAny, config?: HttpCustomConfig): HttpResourceRef<T> {
    const context = buildHttpContext(config);
    return httpResource<T>(
      () => ({
        url: this.getUrl(path, config),
        method: 'POST',
        body: param(),
        context
      }),
      { injector: this.injector }
    ) as HttpResourceRef<T>;
  }

  get<T>(path: string, param?: HttpQueryParams, config?: HttpCustomConfig): Observable<T> {
    const context = buildHttpContext(config);
    return this.http.get<T>(this.getUrl(path, config), { params: this.createHttpParams(param), context });
  }

  delete<T>(path: string, param?: HttpQueryParams, config?: HttpCustomConfig): Observable<T> {
    const context = buildHttpContext(config);
    return this.http.delete<T>(this.getUrl(path, config), { params: this.createHttpParams(param), context });
  }

  post<T>(path: string, param?: NzSafeAny, config?: HttpCustomConfig): Observable<T> {
    const context = buildHttpContext(config);
    return this.http.post<T>(this.getUrl(path, config), param, { context });
  }

  put<T>(path: string, param?: NzSafeAny, config?: HttpCustomConfig): Observable<T> {
    const context = buildHttpContext(config);
    return this.http.put<T>(this.getUrl(path, config), param, { context });
  }

  downLoadWithBlob(path: string, param?: NzSafeAny, config?: HttpCustomConfig): Observable<NzSafeAny> {
    // 手动设置 Content-Type，避免浏览器默认行为干扰
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const context = buildHttpContext(config);
    return this.http.post(this.getUrl(path, config), param, { responseType: 'blob', headers, context });
  }

  private getUrl(path: string, config?: HttpCustomConfig): string {
    if (config?.otherUrl) {
      return path;
    }
    return apiUrl(path);
  }

  private createHttpParams(param?: HttpQueryParams): HttpParams {
    return param ? new HttpParams({ fromObject: param }) : new HttpParams();
  }
}
