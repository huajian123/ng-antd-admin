import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseHttpService } from '@services/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  http = inject(BaseHttpService);

  public sessionTimeOut(): Observable<void> {
    return this.http.get(`/sessionTimeOut/`);
  }
}
