import { inject, Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

import { ChangePasswordComponent } from '@widget/biz-widget/change-password/change-password.component';
import { ModalOptions } from 'ng-zorro-antd/modal';

import { ModalResponse, ModalWrapService } from '../../base-modal';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  private modalWrapService = inject(ModalWrapService);

  protected getContentComponent(): Type<ChangePasswordComponent> {
    return ChangePasswordComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<ModalResponse> {
    return this.modalWrapService.show<ChangePasswordComponent, object>(this.getContentComponent(), modalOptions, params);
  }
}
