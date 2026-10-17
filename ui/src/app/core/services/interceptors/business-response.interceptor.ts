import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';

import { ActionResult } from '@core/services/http/http-types';

import { NzMessageService } from 'ng-zorro-antd/message';

import { NEED_SUCCESS_INFO, NEED_UNWRAP } from './http-context-tokens';

function isActionResult(body: unknown): body is ActionResult<unknown> {
  return typeof body === 'object' && body !== null && 'code' in body && 'data' in body && 'msg' in body && typeof (body as ActionResult<unknown>).code === 'number';
}

// 只处理业务响应（需要 NEED_UNWRAP 标记的请求才会解包，防止第三方库的请求也经过此拦截器）
export const businessResponseInterceptor: HttpInterceptorFn = (req, next) => {
  const needUnwrap = req.context.get(NEED_UNWRAP);
  if (!needUnwrap) {
    return next(req);
  }

  const message = inject(NzMessageService);
  const needSuccessInfo = req.context.get(NEED_SUCCESS_INFO);

  return next(req).pipe(
    // 过滤 type === 0 的事件（CORS 预检等）
    filter(e => e.type !== 0),
    mergeMap(event => {
      if (!(event instanceof HttpResponse) || req.responseType !== 'json') {
        return [event];
      }

      const body = event.body;
      if (!isActionResult(body)) {
        return [event];
      }

      if (![200, 201].includes(body.code)) {
        message.error(body.msg);
        return throwError(() => ({ code: body.code, msg: body.msg, data: null }) satisfies ActionResult<null>);
      }

      if (needSuccessInfo) {
        message.success('操作成功');
      }

      return [event.clone({ body: body.data })];
    })
  );
};
