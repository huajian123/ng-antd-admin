import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

import { TokenKey } from '@config/constant';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';

import { WindowService } from '../common/window.service';

interface CustomHttpConfig {
  headers?: HttpHeaders;
}

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  windowServe = inject(WindowService);
  message = inject(NzMessageService);

  intercept(req: HttpRequest<NzSafeAny>, next: HttpHandler): Observable<HttpEvent<NzSafeAny>> {
    const token = this.windowServe.getSessionStorage(TokenKey);
    let httpConfig: CustomHttpConfig = {};
    if (!!token) {
      httpConfig = { headers: req.headers.set(TokenKey, token) };
    }
    const copyReq = req.clone(httpConfig);
    return next.handle(copyReq).pipe(
      filter(e => e.type !== 0),
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const status = error.status;
    let errMsg = '';
    if (status === 0) {
      errMsg = '网络出现未知的错误，请检查您的网络。';
    }
    if (status >= 300 && status < 400) {
      errMsg = `请求被服务器重定向，状态码为${status}`;
    }
    if (status >= 400 && status < 500) {
      errMsg = `客户端出错，可能是发送的数据有误，状态码为${status}`;
    }
    if (status >= 500) {
      errMsg = `服务器发生错误，状态码为${status}`;
    }

    return throwError(() => {
      return {
        code: status,
        message: errMsg
      };
    });
  }
}
