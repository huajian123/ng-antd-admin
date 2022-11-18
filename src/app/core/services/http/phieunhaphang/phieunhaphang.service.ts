import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import * as Const from 'src/app/common/const';
import { Observable } from 'rxjs';
import { Phieunhaphang } from '@app/core/model/phieunhaphang.model';
@Injectable({
  providedIn: 'root'
})
export class PhieunhaphangService {

  constructor(
    private http: BaseHttpService
  ) { }

  getlists(params:any){
    return this.http.post(Const.PhieunhaphangAnt100GetAll, params, {needSuccessInfo: false});
  }

  getDetail(id: string): Observable<Phieunhaphang>{
    return this.http.get(`${Const.PhieunhaphangAnt100Get}/${id}/`);
  }

  create(params: Phieunhaphang): Observable<any>{
    return this.http.post(Const.PhieunhaphangAnt100Create, params,{ needSuccessInfo: false});
  }

  update(params: Phieunhaphang): Observable<any>{
    return this.http.put(Const.PhieunhaphangAnt100Update, params);
  }
  
  delete(id: string): Observable<any>{
    return this.http.post(Const.PhieunhaphangAnt100Delete, { ids: id }, { needSuccessInfo: true })
  }

  delates(){}
}
