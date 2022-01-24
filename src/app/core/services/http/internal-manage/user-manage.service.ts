import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {BaseHttpService} from "@services/base-http.service";
import {PageInfo, People, SearchCommonVO} from "@core/services/types";

@Injectable({
  providedIn: 'root'
})
export class UserManageService {

  constructor(public http: BaseHttpService) {
  }

  public getPeoples(param: SearchCommonVO<NzSafeAny>): Observable<PageInfo<People>> {
    return this.http.post('/user/list', param);
  }

  public getUserDetail(id: number): Observable<NzSafeAny> {
    return this.http.get(`/user/${id}`);
  }

  public addUsers(param: People): Observable<NzSafeAny> {
    return this.http.post('/user', param, {needSuccessInfo: true});
  }

  public editUsers(param: People): Observable<NzSafeAny> {
    return this.http.put('/user', param, {needSuccessInfo: true});
  }

}
