import { Injectable } from '@angular/core';
import { BaseHttpService } from '@services/base-http.service';
import * as Const from 'src/app/common/const';
import { Xe } from '@core/model/xe.model'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class XeService {

  constructor(
    private http: BaseHttpService
  ) {}

  getXes(params:any){
    return this.http.post(Const.XeAnt100GetAll, params, {needSuccessInfo: false});
  }
  getXe(id: string): Observable<Xe>{
    return this.http.get(`${Const.XeAnt100Get}/${id}/`);
  }
  createXe(params: Xe): Observable<void>{
    return this.http.post(Const.XeAnt100Create, params,{ needSuccessInfo: false});
  }
  updateXe(params: Xe): Observable<void>{
    return this.http.put(Const.XeAnt100Update, params);
  }
  deleteXe(){}
  delateXes(){}
}
