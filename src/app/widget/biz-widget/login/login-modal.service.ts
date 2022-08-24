import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalWrapService } from '@widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalOptions } from 'ng-zorro-antd/modal';

import { LoginModalComponent } from './login-modal.component';
@Injectable({
  providedIn: 'root'
})
export class LoginModalService {
  constructor(private modalWrapService: ModalWrapService) {}

  protected getContentComponent(): NzSafeAny {
    return LoginModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<NzSafeAny> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params);
  }
}
