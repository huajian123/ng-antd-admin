import {Injectable} from '@angular/core';
import {BaseHttpService} from '../base-http.service';
import {Dept, Menu, PageInfo, SearchCommonVO, User, UserPsd} from '../../types';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(public http: BaseHttpService) {
  }

  public getAccount(param: SearchCommonVO<User>): Observable<PageInfo<User>> {
    return this.http.post('/user/list/',param);
  }

  public getAccountDetail(id: number): Observable<User> {
    return this.http.get(`/user/${id}/`);
  }

  public addAccount(param: User): Observable<void> {
    return this.http.post('/user/', param);
  }

  public delAccount(ids: number[]): Observable<void> {
    return this.http.post('/user/del/', {ids});
  }

  public editAccount(param: User): Observable<void> {
    return this.http.put('/user/', param);
  }

  public editAccountPsd(param: UserPsd): Observable<void> {
    return this.http.put('/user/psd', param);
  }

}
