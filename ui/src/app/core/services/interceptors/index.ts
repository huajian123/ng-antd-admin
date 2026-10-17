import { HttpInterceptorFn } from '@angular/common/http';

import { authInterceptor } from './auth.interceptor';
import { businessResponseInterceptor } from './business-response.interceptor';
import { errorHandlerInterceptor } from './error-handler.interceptor';
import { loadingInterceptor } from './loading.interceptor';

/**
 * 拦截器执行顺序（不可随意调整）
 *
 * 请求方向 →
 *   1. authInterceptor           — 最先注入 Token，后续拦截器才能携带认证信息
 *   2. loadingInterceptor        — 请求发出前显示 Loading，响应后关闭
 *   3. businessResponseInterceptor — 解包 ActionResult（仅 NEED_UNWRAP 标记的请求，防止第三方库的请求也经过此拦截器），处理业务错误
 *   4. errorHandlerInterceptor   — 兜底捕获 HTTP 协议层错误
 *
 * ← 响应方向
 *   4 → 3 → 2 → 1（与请求方向相反，依次处理响应）
 */
export const httpInterceptors: HttpInterceptorFn[] = [authInterceptor, loadingInterceptor, businessResponseInterceptor, errorHandlerInterceptor];
