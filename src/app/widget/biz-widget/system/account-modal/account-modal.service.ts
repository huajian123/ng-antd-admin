import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalWrapService } from '@widget/base-modal';
import { AccountModalComponent } from '@widget/biz-widget/system/account-modal/account-modal.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalOptions } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class AccountModalService {
  constructor(private modalWrapService: ModalWrapService) {}
  protected getContentComponent(): NzSafeAny {
    return AccountModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<NzSafeAny> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params);
  }
}
