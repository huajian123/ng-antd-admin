import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base-http.service';
import * as Const from '@app/common/const'
@Injectable({
  providedIn: 'root'
})
export class NhatkykhService {

  constructor(
    private http: BaseHttpService,
    private router: Router
  ) { }

  getlists(params:any): Observable<any>{
    return this.http.post(Const.NhatkykhAnt100GetAll, params, {needSuccessInfo: false});
  }

  // req tất toán
  tatToan(params:any): Observable<any> {
    return this.http.post(Const.NhatkykhAnt100PostTattoan, params, {needSuccessInfo: false});
  }

  thanhtoanmotphan(params:any): Observable<any> {
    return this.http.post(Const.NhatkykhAnt100PostThanhtoanmotphan, params, {needSuccessInfo: false});
  }

  thanhtoan(params:any): Observable<any> {
    return this.http.post(Const.NhatkykhAnt100PostThanhtoan, params, {needSuccessInfo: false});
  }
}
