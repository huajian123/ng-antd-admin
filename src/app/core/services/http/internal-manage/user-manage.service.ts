import { Injectable } from '@angular/core';
import {BaseHttpService} from '../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {

  constructor(public http: BaseHttpService) {
  }


}
