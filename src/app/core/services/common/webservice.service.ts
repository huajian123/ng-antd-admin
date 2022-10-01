

import { BaseHttpService } from '@services/base-http.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  constructor(
    public http: BaseHttpService,
  ) { 
    
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  async GetCallWs(serviceName: string,
     fncSuccess?: ((data: any) => void),
     fncError?: (() => void)): Promise<Observable<HttpResponse<any>>> {
    let promise =  this.http.get<any>(serviceName, { observe: 'response' });
    promise.subscribe({
      next: (res: any) => {
        if(fncSuccess != null){
           fncSuccess(res);
        }
        return true;
      },
      error: (err: any) => {
         if(fncError != null){
           fncError();
         }
         return false;
      },
      complete: ()=> {}
    })
    return promise;
  }

  async PostCallWs(serviceName: string, data: any,
    fncSuccess?: ((data: any) => void),
     fncError?: (() => void)): Promise<Observable<HttpResponse<any>>> {
    let promisr = this.http.post<any>(serviceName, data, { needSuccessInfo: false });
    promisr.subscribe({
      next: (res: any) => {
        if(fncSuccess != null){
           fncSuccess(res);
        }
        return true;
      },
      error: (err: any) => {
         if(fncError != null){
           fncError();
         }
         return false;
      },
      complete: ()=> {}
    })
    return promisr;
  }

  async PutCallWs(serviceName: string, data: any,
    fncSuccess?: ((data: any) => void),
     fncError?: (() => void)): Promise<Observable<HttpResponse<any>>> {
    let promisr = this.http.put<any>(serviceName, data,  { needSuccessInfo: true });
    promisr.subscribe({
      next: (res: any) => {
        if(fncSuccess != null){
           fncSuccess(res);
        }
        return true;
      },
      error: (err: any) => {
         if(fncError != null){
           fncError();
         }
         return false;
      },
      complete: ()=> {}
    })
    return promisr;
  }

  async DeleteCallWs(serviceName: string, data: any,
    fncSuccess?: ((data: any) => void),
     fncError?: (() => void)): Promise<Observable<HttpResponse<any>>> {
    let promisr = this.http.delete<any>(serviceName, data,  { needSuccessInfo: true });
    promisr.subscribe({
      next: (res: any) => {
        if(fncSuccess != null){
           fncSuccess(res);
        }
        return true;
      },
      error: (err: any) => {
         if(fncError != null){
           fncError();
         }
         return false;
      },
      complete: ()=> {}
    })
    return promisr;
  }
}
