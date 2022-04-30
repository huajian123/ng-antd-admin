import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LoginModalService} from '@widget/biz-widget/login/login-modal.service';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {filter, finalize, share, switchMap} from 'rxjs/operators';
import {ModalBtnStatus} from '@widget/base-modal';
import {Router} from '@angular/router';
import {WindowService} from '../common/window.service';
import {TokenKey, loginTimeOutCode} from "@config/constant";
import {LoginInOutService} from "@core/services/common/login-in-out.service";

@Injectable()
export class LoginExpiredService implements HttpInterceptor {
  private refresher: Observable<NzSafeAny> | null = null;

  constructor(private loginModalService: LoginModalService, private router: Router,
              private loginInOutService: LoginInOutService,
              private windowServe: WindowService, private http: HttpClient) {
  }

  intercept(req: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<NzSafeAny>> {
    const newReq = req.clone();
    return next.handle(newReq).pipe(filter(e => e.type !== 0), this.loginExpiredFn(newReq, next));
  }

  private sendRequest(request: HttpRequest<NzSafeAny>, next: HttpHandler) {
    return this.refresher!.pipe(switchMap(() => {
      const token = this.windowServe.getStorage(TokenKey);
      let httpConfig = {};
      if (!!token) {
        httpConfig = {headers: request.headers.set(TokenKey, token)};
      }
      this.refresher = null;
      const copyReq = request.clone(httpConfig);
      return next.handle(copyReq).pipe(finalize(() => this.refresher = null));
    }), finalize(() => this.refresher = null))
  }

  // 登录过期拦截
  private loginExpiredFn(req: HttpRequest<string>, next: HttpHandler): NzSafeAny {
    return switchMap((event: HttpResponse<NzSafeAny>): NzSafeAny => {
      if (event.type !== HttpEventType.Response || event.body.code !== loginTimeOutCode) {
        return of(event);
      }
      if (this.refresher) {
        return this.sendRequest(req, next);
      }

      this.refresher = new Observable((observer) => {
        this.loginModalService.show({nzTitle: '登录信息过期，重新登录'}).subscribe(({modalValue, status}) => {
          if (status === ModalBtnStatus.Cancel) {
            this.loginInOutService.loginOut();
            this.refresher = null;
            this.router.navigateByUrl('/login/login-form');
            return;
          }
          const token = modalValue;
          this.loginInOutService.loginIn(token);
          this.http.request(req).subscribe((data: NzSafeAny) => {
            this.refresher = null;
            observer.next(data);
          });
        });
      }).pipe(share(), finalize(() => this.refresher = null));
      return this.refresher;
    });
  }
}
