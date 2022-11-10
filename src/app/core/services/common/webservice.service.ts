

import { BaseHttpService } from '@services/base-http.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating: Object | any;
}
export interface  ObjectDataSC{
  stt : string;
  title1 : string;
  title2 : string;
}   
@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  urlApi = 'https://fakestoreapi.com/';
  constructor(
    public http: BaseHttpService,
    private httpt: HttpClient
  ) { 
    
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  async GetCallCommonWs(serviceName: string,
    fncSuccess?: ((data: any) => void),
    fncError?: (() => void)): Promise<Observable<HttpResponse<any>>> {
   let promise =  this.httpt.get<any>(this.urlApi + serviceName, { observe: 'response' });
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

  async PostCallCommonWs(serviceName: string, data: any,
    fncSuccess?: ((data: ObjectDataSC) => void),
     fncError?: (() => void)): Promise<Observable<HttpResponse<any>>> {
    let promisr = this.http.post<ObjectDataSC>(serviceName, data,  { needSuccessInfo: false });
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
