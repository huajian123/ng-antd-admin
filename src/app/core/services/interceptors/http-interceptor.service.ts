import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {WindowService} from '../window.service';
import {AuthKey} from '../../../configs/constant';
import {catchError} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd/message';

interface CustomHttpConfig {
  headers?: HttpHeaders;
}

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private windowServe: WindowService, public message: NzMessageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.windowServe.getStorage(AuthKey);
    let httpConfig: CustomHttpConfig = {};
    if (!!auth) {
      httpConfig = {headers: req.headers.set(AuthKey, auth)};
    }
    const copyReq = req.clone(httpConfig);
    return next.handle(copyReq).pipe(catchError(error => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (typeof error.error?.code === 'number') { // 后台拒绝请求
      this.windowServe.alert(error.error.message);
    } else {
      this.message.error('请求失败');
    }
    return throwError(error);
  }
}
