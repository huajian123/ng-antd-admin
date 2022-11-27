import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base-http.service';
import * as Const from '@app/common/const'
@Injectable({
  providedIn: 'root'
})
export class KhachhangService {

  constructor(
    private http: BaseHttpService,
    private router: Router
  ) { }

  getlists(params:any): Observable<any>{
    return this.http.post(Const.KhachhangAnt100GetAll, params, {needSuccessInfo: false});
  }

  searchParams(params:any): Observable<any>{
    return this.http.post(Const.KhachhangAnt100SearchParams, params, {needSuccessInfo: false});
  }

  update(params: any): Observable<any>{
    return this.http.put(Const.KhachhangAnt100Update, params);
  }

  getDetail(id: string): Observable<any>{
    return this.http.get(`${Const.KhachhangAnt100GetDetail}/${id}/`);
  }

}
