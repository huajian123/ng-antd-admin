import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ChangePasswordComponent } from '@widget/biz-widget/change-password/change-password.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalOptions } from 'ng-zorro-antd/modal';

import { ModalWrapService } from '../../base-modal';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  private modalWrapService = inject(ModalWrapService);

  protected getContentComponent(): NzSafeAny {
    return ChangePasswordComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<any> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params);
  }
}
