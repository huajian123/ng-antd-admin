import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpInterceptorService} from './http-interceptor.service';

export default [
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
];
