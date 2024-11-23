import { inject, Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalResponse, ModalWrapService } from '@widget/base-modal';
import { ModalOptions } from 'ng-zorro-antd/modal';

import { LoginModalComponent } from './login-modal.component';
@Injectable({
  providedIn: 'root'
})
export class LoginModalService {
  private modalWrapService = inject(ModalWrapService);

  protected getContentComponent(): Type<LoginModalComponent> {
    return LoginModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<ModalResponse> {
    return this.modalWrapService.show<LoginModalComponent, object>(this.getContentComponent(), modalOptions, params);
  }
}
