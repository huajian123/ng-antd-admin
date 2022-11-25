import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Chiphichuyen } from '@app/core/model/chiphichuyen.model';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base-http.service';
import * as Const from '@app/common/const'

@Injectable({
  providedIn: 'root'
})
export class ChiphichuyenService {

  constructor(
    private http: BaseHttpService,
    private router: Router
  ) { }

  getlists(params:any){
    return this.http.post(Const.ChiphichuyenAnt100GetAll, params, {needSuccessInfo: false});
  }

  getDetail(id: string): Observable<Chiphichuyen>{
    return this.http.get(`${Const.ChiphichuyenAnt100Get}/${id}/`);
  }

  create(params: Chiphichuyen): Observable<any>{
    return this.http.post(Const.ChiphichuyenAnt100Create, params,{ needSuccessInfo: false});
  }

  update(params: Chiphichuyen): Observable<any>{
    return this.http.put(Const.ChiphichuyenAnt100Update, params);
  }

  updateList(params:any) : Observable<any> {
    return this.http.post(Const.ChiphichuyenAnt100UpdateList, params, { needSuccessInfo: false});
  }
  
  delete(id: string): Observable<any>{
    return this.http.post(Const.ChiphichuyenAnt100Delete, { ids: id }, { needSuccessInfo: true })
  }

  delates(){}
}
