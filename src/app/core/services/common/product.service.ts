import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  urlApi = 'https://fakestoreapi.com/';
  constructor(private http: HttpClient) {}

  async GetCallWs(
    serviceName: string,
    fncSuccess?: (data: any) => void,
    fncError?: () => void
  ): Promise<Observable<HttpResponse<any>>> {
    let promise = this.http.get<any>(this.urlApi + serviceName, {
      observe: 'response',
    });
    promise.subscribe({
      next: (res: any) => {
        if (fncSuccess != null) {
          fncSuccess(res);
        }
      },
      error: (err: any) => {
        if (fncError != null) {
          fncError();
        }
      },
      complete: () => {},
    });
    return promise;
  }
}
