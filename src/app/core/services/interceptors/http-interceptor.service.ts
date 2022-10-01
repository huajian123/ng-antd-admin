
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  constructor(private windowServe: WindowService, public message: NzMessageService) {}

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
      errMsg = 'Đã xảy ra lỗi mạng không xác định, vui lòng kiểm tra mạng của bạn.';
    }
    if (status >= 300 && status < 400) {
      errMsg = `Yêu cầu đã được chuyển hướng bởi máy chủ với mã trạng thái${status}`;
    }
    if (status >= 400 && status < 500) {
      errMsg = `Máy khách bị lỗi, có thể dữ liệu gửi sai, mã trạng thái${status}`;
    }
    if (status >= 500) {
      errMsg = `Đã xảy ra lỗi máy chủ với mã trạng thái${status}`;
    }
    return throwError({
      code: status,
      message: errMsg
    });
  }
}
