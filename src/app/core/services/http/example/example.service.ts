import { Injectable } from '@angular/core';
import {BaseHttpService} from "@services/base-http.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(public http: BaseHttpService) {
  }

  public sessionTimeOut(): Observable<void> {
    return this.http.get(`/sessionTimeOut/`);
  }
}
