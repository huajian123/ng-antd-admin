import { HttpClient, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, finalize, share, switchMap } from 'rxjs/operators';

import { TokenKey, loginTimeOutCode, tokenErrorCode } from '@config/constant';
import { LoginInOutService } from '@core/services/common/login-in-out.service';
import { ModalBtnStatus } from '@widget/base-modal';
import { LoginModalService } from '@widget/biz-widget/login/login-modal.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';

import { WindowService } from '../common/window.service';

@Injectable()
export class LoginExpiredService implements HttpInterceptor {
  private refresher: Observable<NzSafeAny> | null = null;
  destroyRef = inject(DestroyRef);
  loginModalService = inject(LoginModalService);
  router = inject(Router);
  loginInOutService = inject(LoginInOutService);
  message = inject(NzMessageService);
  windowServe = inject(WindowService);
  http = inject(HttpClient);

  intercept(req: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<NzSafeAny>> {
    const newReq = req.clone();
    return next.handle(newReq).pipe(
      filter(e => e.type !== 0),
      this.loginExpiredFn(newReq, next)
    );
  }

  private sendRequest(request: HttpRequest<NzSafeAny>, next: HttpHandler): Observable<NzSafeAny> | null {
    return this.refresher!.pipe(
      switchMap(() => {
        const token = this.windowServe.getSessionStorage(TokenKey);
        let httpConfig = {};
        if (!!token) {
          httpConfig = { headers: request.headers.set(TokenKey, token) };
        }
        this.refresher = null;
        const copyReq = request.clone(httpConfig);
        return next.handle(copyReq).pipe(finalize(() => (this.refresher = null)));
      }),
      finalize(() => (this.refresher = null))
    );
  }

  private loginOut(): void {
    this.loginInOutService.loginOut();
    this.refresher = null;
    this.router.navigateByUrl('/login/login-form');
  }

  // 登录超时拦截
  private loginExpiredFn(req: HttpRequest<string>, next: HttpHandler): NzSafeAny {
    return switchMap((event: HttpResponse<NzSafeAny>): NzSafeAny => {
      if (event.type !== HttpEventType.Response || event.body.code !== loginTimeOutCode) {
        return of(event);
      }
      if (event.body.code === tokenErrorCode) {
        this.loginOut();
        return;
      }

      if (this.refresher) {
        return this.sendRequest(req, next);
      }

      this.refresher = new Observable(observer => {
        // setTimeout为了解决刷新页面的时候，由于zorro样式未加载，登录对话框会闪屏
        setTimeout(() => {
          this.loginModalService
            .show({ nzTitle: '登录信息过期，重新登录' })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(({ modalValue: token, status }) => {
              if (status === ModalBtnStatus.Cancel) {
                // 这么做是为了登录状态下token过期，刷新页面，登录窗口点击取消，需要在startUp中的获取menu的接口完成掉,
                // 不然进不去angular应用，路由不跳转
                observer.next(
                  new HttpResponse({
                    body: {
                      code: 3013,
                      msg: '取消后请重新登录',
                      data: null
                    }
                  })
                );
                this.loginOut();
                return;
              }
              this.loginInOutService.loginIn(token).then();
              this.http
                .request(req)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                  next: (data: NzSafeAny) => {
                    this.refresher = null;
                    observer.next(data);
                  },
                  error: () => {
                    // 如果先用admin登录系统，token超时弹登录框，此时登录的却是normal账号，对目标页面没有权限，则返回登录页
                    // 这里靠后端判断新的token没有权限，请求报错403
                    this.message.error('您没有权限登录该模块');
                    this.loginOut();
                  }
                });
            });
        }, 100);
      }).pipe(
        share(),
        finalize(() => (this.refresher = null))
      );
      return this.refresher;
    });
  }
}
