import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base-http.service';
import * as Const from 'src/app/common/const';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: BaseHttpService
  ) { }

  // get list thông kê doanh thu, chi phi, lợi nhuận từng tháng
  listtaichinh(params: any) : Observable<any> {
    return this.http.post(Const.CommonAnt100Listtaichinh, params, { needSuccessInfo: false});
  }
  
}
