import {Injectable} from '@angular/core';
import {BaseHttpService} from '../base-http.service';
import {PageInfo, People, Role, SearchCommonVO} from '../../types';
import {Observable} from 'rxjs';
import {NzSafeAny} from 'ng-zorro-antd/core/types';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {

  constructor(public http: BaseHttpService) {
  }


  public getPeoples(param: SearchCommonVO<any>): Observable<PageInfo<People>> {
    return this.http.post('/list-user', param);
  }

  public getUserDetail(id: number): Observable<NzSafeAny>  {
    return this.http.get(`/user/${id}`);
  }

  public addUsers(param: People): Observable<NzSafeAny> {
    return this.http.post('/user', param);
  }

  public editUsers(param: People): Observable<NzSafeAny> {
    return this.http.put('/user', param);
  }

}
