import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LoginModalService} from '../../../widget/biz-widget/login/login-modal.service';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import { switchMap} from 'rxjs/operators';
import {ModalBtnStatus} from '../../../widget/base-modal';
import {Router} from '@angular/router';
import {AuthKey, TokenPre} from '../../../configs/constant';
import {WindowService} from '../common/window.service';
import {AuthService} from '../store/auth.service';

@Injectable()
export class LoginExpiredService implements HttpInterceptor {

  constructor(private loginModalService: LoginModalService, private  router: Router,
              private windowServe: WindowService, private authService: AuthService, private http: HttpClient) {
  }

  intercept(req: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone();
    return next.handle(newReq).pipe(this.loginExpiredFn(newReq));
  }

  // 登录过期拦截
  private loginExpiredFn(req: HttpRequest<string>): any {
    return switchMap((event: HttpResponse<NzSafeAny>): any => {
      if (event.type !== HttpEventType.Response || event.body.code !== 3013) {
        return of(event);
      }
      const observable = new Observable((observer) => {
        this.loginModalService.show({nzTitle: '登录信息过期，重新登录'}).subscribe(({modalValue, status}) => {
          if (status === ModalBtnStatus.Cancel) {
            this.router.navigateByUrl('/login/login-form');
            return;
          }
          const {token} = modalValue;
          this.windowServe.setStorage(AuthKey, TokenPre + token);
          this.http.request(req).subscribe((data: any) => {
            observer.next(data);
          });
        });
      });
      return observable;
    });
  }

}
