import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { fnFormatePath, fnGetPathWithoutParam } from '@app/utils/tools';

import { Chuyen } from '@core/model/chuyen.model';
import { Observable } from 'rxjs';
import * as Const from 'src/app/common/const';
import { SimpleReuseStrategy } from '../../common/reuse-strategy';
import { BaseHttpService } from '../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ChuyenService {
  
  constructor(
    private http: BaseHttpService,
    private router: Router
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
  updateTrangthai(params: any): Observable<Number>{
    return this.http.post(Const.ChuyenAnt100UpdateTrangthai, params, { needSuccessInfo: false});
  }
  
  deleteChuyen(id: string): Observable<void>{
    return this.http.post(Const.ChuyenAnt100Delete, { ids: id }, { needSuccessInfo: true })
  }

  delateChuyens(){}

  refresh(url:string): void {
    const sourceUrl = url;
    // 只有当前页签会刷新，如果涉及到tab页内的详情的页面不会刷新
    const currentRoute = fnGetPathWithoutParam(sourceUrl);
    const queryParams = this.router.parseUrl(sourceUrl).queryParams;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      SimpleReuseStrategy.deleteRouteSnapshot(this.getPathKey(sourceUrl));
      this.router.navigate([currentRoute], { queryParams });
    });
  }
  
  getPathKey(path: string): string {
    const tempPath = fnFormatePath(path);
    const pathParam = this.router.parseUrl(path).queryParams;
    let pathParamString = '';
    if (Object.keys(pathParam).length > 0) {
      pathParamString = JSON.stringify(this.router.parseUrl(path).queryParams);
    }
    return tempPath + pathParamString;
  }
}
