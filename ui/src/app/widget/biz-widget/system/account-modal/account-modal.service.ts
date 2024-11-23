import { inject, Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '@services/system/account.service';
import { ModalResponse, ModalWrapService } from '@widget/base-modal';
import { AccountModalComponent } from '@widget/biz-widget/system/account-modal/account-modal.component';
import { ModalOptions } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class AccountModalService {
  private modalWrapService = inject(ModalWrapService);

  protected getContentComponent(): Type<AccountModalComponent> {
    return AccountModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, modalData?: User): Observable<ModalResponse> {
    return this.modalWrapService.show<AccountModalComponent, User>(this.getContentComponent(), modalOptions, modalData);
  }
}
