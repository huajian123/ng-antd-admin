import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd/message';

import { SHOW_LOADING, LOADING_TEXT } from './http-context-tokens';

/**
 * Loading处理逻辑
 * 即使接口瞬间返回，Loading 也会坚持展示最少 500ms
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const showLoading = req.context.get(SHOW_LOADING);
  if (!showLoading) {
    return next(req);
  }

  const message = inject(NzMessageService);
  const loadingText = req.context.get(LOADING_TEXT);
  const startTime = Date.now();
  // 设置 nzDuration: 0 为手动关闭，否则会被默认的 3000ms 自动消除逻辑干扰
  const msgRef = message.loading(loadingText, { nzDuration: 0 });

  return next(req).pipe(
    finalize(() => {
      // 如果请求太快（比如 50ms），则延迟 450ms 后再移除 Loading
      // 此时数据已经返回给页面了，但 Loading 还在
      // 如果请求本身就很慢（超过 500ms），remaining 为 0，立即移除
      const remaining = Math.max(0, 500 - (Date.now() - startTime));
      setTimeout(() => message.remove(msgRef.messageId), remaining);
    })
  );
};
