import { Injectable } from '@angular/core';

import { Chuyen } from '@core/model/chuyen.model';
import { Observable } from 'rxjs';
import * as Const from 'src/app/common/const';
import { BaseHttpService } from '../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ChuyenService {
  
  constructor(
    private http: BaseHttpService
  ) { }

  getChuyens(params:any){
    return this.http.post(Const.ChuyenAnt100GetAll, params, {needSuccessInfo: false});
  }
  getChuyen(id: string): Observable<Chuyen>{
    return this.http.get(`${Const.ChuyenAnt100Get}/${id}/`);
  }
  createChuyen(params: Chuyen): Observable<void>{
    return this.http.post(Const.ChuyenAnt100Create, params,{ needSuccessInfo: false});
  }
  updateChuyen(params: Chuyen): Observable<void>{
    return this.http.put(Const.ChuyenAnt100Update, params);
  }
  
  deleteChuyen(id: string): Observable<void>{
    return this.http.post(Const.ChuyenAnt100Delete, { ids: id }, { needSuccessInfo: true })
  }
  delateChuyens(){}
}
