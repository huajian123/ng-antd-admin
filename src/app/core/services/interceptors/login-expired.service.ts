import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LoginModalService} from '@widget/biz-widget/login/login-modal.service';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {filter, finalize, share, switchMap} from 'rxjs/operators';
import {ModalBtnStatus} from '@widget/base-modal';
import {Router} from '@angular/router';
import {WindowService} from '../common/window.service';
import {AuthService} from '@store/auth.service';
import {AuthKey, TokenPre} from "@config/constant";
import {LoginOutService} from "@core/services/common/login-out.service";

@Injectable()
export class LoginExpiredService implements HttpInterceptor {
  private refresher: Observable<NzSafeAny> | null = null;

  constructor(private loginModalService: LoginModalService, private router: Router,
              private loginOutService: LoginOutService,
              private windowServe: WindowService, private authService: AuthService, private http: HttpClient) {
  }

  intercept(req: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<NzSafeAny>> {
    const newReq = req.clone();
    return next.handle(newReq).pipe(filter(e => e.type !== 0), this.loginExpiredFn(newReq, next));
  }

  private sendRequest(request: HttpRequest<NzSafeAny>, next: HttpHandler) {
    return this.refresher!.pipe(switchMap(() => {
      const auth = this.windowServe.getStorage(AuthKey);
      let httpConfig = {};
      if (!!auth) {
        httpConfig = {headers: request.headers.set(AuthKey, auth)};
      }
      this.refresher = null;
      const copyReq = request.clone(httpConfig);
      return next.handle(copyReq).pipe(finalize(() => this.refresher = null));
    }), finalize(() => this.refresher = null))
  }

  // 登录过期拦截
  private loginExpiredFn(req: HttpRequest<string>, next: HttpHandler): NzSafeAny {
    return switchMap((event: HttpResponse<NzSafeAny>): NzSafeAny => {
      if (event.type !== HttpEventType.Response || event.body.code !== 3013) {
        return of(event);
      }
      if (this.refresher) {
        return this.sendRequest(req, next);
      }

      this.refresher = new Observable((observer) => {
        this.loginModalService.show({nzTitle: '登录信息过期，重新登录'}).subscribe(({modalValue, status}) => {
          if (status === ModalBtnStatus.Cancel) {
            this.loginOutService.loginOut();
            this.refresher = null;
            this.router.navigateByUrl('/login/login-form');
            return;
          }
          const token = modalValue;
          this.windowServe.setStorage(AuthKey, TokenPre + token);
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
